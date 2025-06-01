import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-bibtex";
import template from "../data/ieee-cha-folio.csl";
import bib from "../data/publications.bib";
import config from "@/cha-folio.config";
import { matchesAnyPattern } from "./utils";

const { matchedNames } = config.pages?.publications ?? {};

export interface Publication {
  citationKey: string;
  title: string;
  authors: { name: string; highlighted: boolean }[];
  dateInfo: { year: number; repr: string };
  details: string;
  bib: string;
  abstract?: string;
  bibtexShow?: boolean;
  badge?: string;
  url?: string;
  pdf?: string;
  code?: string;
  video?: string;
  selected?: boolean;
}

function extractAuthors(entry: any): Publication["authors"] {
  const authors: { name: string; highlighted: boolean }[] = [];
  if (entry.data[0].author !== undefined) {
    for (const author of entry.data[0].author) {
      if (author.given && author.family) {
        const fullName = `${author.given} ${author.family}`;
        authors.push({
          name: fullName,
          highlighted:
            (matchesAnyPattern(author.given, matchedNames?.given) &&
              matchesAnyPattern(author.family, matchedNames?.family)) ||
            matchesAnyPattern(fullName, matchedNames?.full),
        });
      } else if (author.given) {
        authors.push({
          name: author.given,
          highlighted: matchesAnyPattern(author.given, matchedNames?.full),
        });
      } else if (author.family) {
        authors.push({
          name: author.family,
          highlighted: matchesAnyPattern(author.family, matchedNames?.full),
        });
      }
    }
  }
  return authors;
}

function extractDateInfo(entry: any): Publication["dateInfo"] {
  const dateParts = entry.data[0].issued?.["date-parts"];
  if (dateParts === undefined || dateParts.length === 0) {
    throw new Error("Invalid or missing date in publication entry");
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
    month === undefined ? 0 : month - 1,
    day === undefined ? 1 : day,
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
}

function extractBoolean(value?: string | boolean): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
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
    throw new Error(
      `Invalid boolean value: ${value}; expected "true" or "false"`,
    );
  }
  throw new Error(
    `Invalid type for boolean value: ${typeof value}; expected string or boolean`,
  );
}

function extractString(
  value?: string,
  trim: boolean = false,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "string") {
    throw new TypeError(
      `Invalid type for string value: ${typeof value}; expected string`,
    );
  }
  return trim ? value.trim() : value;
}

function parseBibEntry(entry: any): Publication {
  const entryCite = new Cite(entry);

  const citationKey = entryCite.data[0]["citation-key"];
  const title = entryCite.data[0].title || "Untitled";
  const authors = extractAuthors(entryCite);
  const dateInfo = extractDateInfo(entryCite);
  const details = entryCite
    .format("bibliography", {
      format: "html",
      template: "ieee-cha-folio",
    })
    .trim();
  const bib = entryCite.format("bibtex", { format: "text" }).trim();

  const abstract = extractString(entryCite.data[0].abstract, true);
  const bibtexShow = extractBoolean(entry.properties?.["cha_bibtex_show"]);
  const badge = extractString(entry.properties?.["cha_badge"], true);
  const url = extractString(entry.properties?.["cha_url"]);
  const pdf = extractString(entry.properties?.["cha_pdf"]);
  const code = extractString(entry.properties?.["cha_code"]);
  const video = extractString(entry.properties?.["cha_video"]);
  const selected = extractBoolean(entry.properties?.["cha_selected"]);

  return {
    citationKey,
    title,
    authors,
    dateInfo,
    details,
    bib,
    abstract,
    badge,
    bibtexShow,
    url,
    pdf,
    code,
    video,
    selected,
  };
}

plugins.config.get("@csl").templates.add("ieee-cha-folio", template);

const cite = new Cite(bib, { target: "@biblatex/entries+list" });
const publications: Publication[] = cite.data.map(parseBibEntry);

export interface GetPublicationsParams {
  selectedOnly?: boolean;
  year?: number;
}

export function getPublications({
  selectedOnly = false,
  year,
}: GetPublicationsParams = {}): Publication[] {
  let finalPublications = publications;
  if (selectedOnly) {
    finalPublications = finalPublications.filter((pub) => pub.selected);
  }
  if (year !== undefined) {
    finalPublications = finalPublications.filter(
      (pub) => pub.dateInfo.year === year,
    );
  }
  return finalPublications;
}

export function getPublicationsMeta() {
  const years: Record<number, number> = {};
  for (const pub of publications) {
    years[pub.dateInfo.year] = (years[pub.dateInfo.year] || 0) + 1;
  }
  return { years };
}
