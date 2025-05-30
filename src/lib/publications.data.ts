import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-bibtex";
import { promises as fs } from "fs";
import path from "path";

export interface Publication {
  citationKey: string;
  title: string;
  authors: string[];
  date?: { year: number; repr: string };
  details: string;
  bib: string;
  abstract?: string;
  bibtexShow?: boolean;
  url?: string;
  pdf?: string;
  code?: string;
  video?: string;
  selected?: boolean;
}

const getAuthors = (entry: any): Publication["authors"] => {
  const authors: string[] = [];
  if (entry.data[0].author !== undefined) {
    for (const author of entry.data[0].author) {
      if (author.given && author.family) {
        authors.push(`${author.given} ${author.family}`);
      } else if (author.given) {
        authors.push(author.given);
      } else if (author.family) {
        authors.push(author.family);
      }
    }
  }
  return authors;
};

const getDate = (entry: any): Publication["date"] => {
  const dateParts = entry.data[0].issued?.["date-parts"];
  if (dateParts === undefined || dateParts.length === 0) {
    return;
  }
  const [parts] = dateParts;
  const [year, month, day] = parts;

  if (
    typeof year !== "number" ||
    (month !== undefined && typeof month !== "number") ||
    (day !== undefined && typeof day !== "number")
  ) {
    throw new Error("Invalid date format in publication entry");
  }

  const date = new Date(
    year,
    month !== undefined ? month - 1 : 0,
    day !== undefined ? day : 1,
  );
  const options: Intl.DateTimeFormatOptions = { year: "numeric" };
  if (month !== undefined) {
    options.month = "2-digit";
    if (day !== undefined) {
      options.day = "2-digit";
    }
  }
  const repr = date.toLocaleDateString("en-US", options);

  return { year, repr };
};

const stringToBoolean = (value?: string | boolean): boolean | undefined => {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const cleanedValue = value.trim().toLowerCase();
    if (cleanedValue === "true") {
      return true;
    }
    if (cleanedValue === "false") {
      return false;
    }
  }
};

export interface GetPublicationsParams {
  selectedOnly?: boolean;
}

export const getPublications = async ({
  selectedOnly = false,
}: GetPublicationsParams = {}): Promise<Publication[]> => {
  console.debug("Loading publications...");

  const templateFile = path.join(
    process.cwd(),
    "content/_data/ieee-cha-folio.csl",
  );
  const template = await fs.readFile(templateFile, "utf-8");
  const config = plugins.config.get("@csl");
  config.templates.add("ieee-cha-folio", template);

  const file = path.join(process.cwd(), "content/_data/publications.bib");
  const content = await fs.readFile(file, "utf-8");
  const cite = await Cite.async(content, { target: "@biblatex/entries+list" });

  const publications: (Publication | undefined)[] = await Promise.all(
    cite.data.map(async (entry: any) => {
      const selected = stringToBoolean(entry.properties?.["cha_selected"]);
      if (selectedOnly && !(selected ?? false)) {
        return;
      }

      const entryCite = await Cite.async(entry);

      const citationKey = entryCite.data[0]["citation-key"];
      const title = entryCite.data[0].title || "Untitled";
      const authors = getAuthors(entryCite);
      const date = getDate(entryCite);
      const details = entryCite
        .format("bibliography", {
          format: "html",
          template: "ieee-cha-folio",
        })
        .trim();
      const bib = entryCite.format("bibtex", { format: "text" }).trim();

      const abstract = entryCite.data[0].abstract
        ? entryCite.data[0].abstract.trim()
        : undefined;
      const bibtexShow = stringToBoolean(entry.properties?.["cha_bibtex_show"]);
      const url = entry.properties?.["cha_url"];
      const pdf = entry.properties?.["cha_pdf"];
      const code = entry.properties?.["cha_code"];
      const video = entry.properties?.["cha_video"];

      return {
        citationKey,
        title,
        authors,
        date,
        details,
        bib,
        abstract,
        bibtexShow,
        url,
        pdf,
        code,
        video,
        selected,
      };
    }),
  );

  return publications.filter((pub) => pub !== undefined);
};
