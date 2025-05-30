"use client";

import { Publication } from "@/lib/publications.data";
import { ChaSafeHtml } from "./ChaSafeHTML";
import { Button, buttonVariants } from "./ui/Button";
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight, FaRegFilePdf } from "react-icons/fa6";
import { LuCodeXml, LuLink, LuLink2, LuVideo } from "react-icons/lu";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "fumadocs-ui/utils/cn";
import Link from "fumadocs-core/link";

export interface ChaPublicationItemProps
  extends Publication,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {}

export const ChaPublicationItem = ({
  citationKey,
  title,
  authors,
  date,
  details,
  bib,
  abstract,
  bibtexShow = false,
  url,
  pdf,
  code,
  video,
  className,
  ...props
}: ChaPublicationItemProps) => {
  const itemId = `publication-${encodeURIComponent(citationKey)}`;

  const abstractRef = useRef<HTMLDivElement>(null);
  const citeRef = useRef<HTMLDivElement>(null);
  const [abstractHeight, setAbstractHeight] = useState("0px");
  const [citeHeight, setCiteHeight] = useState("0px");
  const [openItem, setOpenItem] = useState<"abstract" | "cite" | null>(null);

  useEffect(() => {
    if (abstractRef.current !== null) {
      setAbstractHeight(
        openItem === "abstract"
          ? `${abstractRef.current.scrollHeight}px`
          : "0px",
      );
    }
    if (citeRef.current !== null) {
      setCiteHeight(
        openItem === "cite" ? `${citeRef.current.scrollHeight}px` : "0px",
      );
    }
  });

  const toggleAbstract = useCallback(() => {
    setOpenItem((prev) => (prev === "abstract" ? null : "abstract"));
  }, []);

  const toggleCite = useCallback(() => {
    setOpenItem((prev) => (prev === "cite" ? null : "cite"));
  }, []);

  return (
    <div
      id={itemId}
      className={cn("[&_.csl-left-margin]:hidden", className)}
      {...props}
    >
      <h2 className="flex flex-wrap items-center gap-x-2 mb-1">
        <Link href={`#${itemId}`} className="peer font-semibold">
          {title}
        </Link>
        {date && (
          <span className="text-fd-muted-foreground">({date.repr})</span>
        )}
        <LuLink
          size={14}
          className="shrink-0 text-fd-muted-foreground opacity-0 transition-opacity duration-300 peer-hover:opacity-100"
        />
      </h2>
      <p className="mb-1">
        {authors.map((author, index) => (
          <span key={author}>{index === 0 ? author : `, ${author}`}</span>
        ))}
      </p>
      <ChaSafeHtml className="text-fd-muted-foreground mb-1" html={details} />
      <div className="flex flex-wrap items-center gap-x-2">
        {abstract && (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "cursor-pointer mt-2",
              openItem === "abstract" && "border-fd-primary",
            )}
            onClick={toggleAbstract}
          >
            <MdOutlineArticle /> Abstract
          </Button>
        )}
        {bibtexShow && (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "cursor-pointer mt-2",
              openItem === "cite" && "border-fd-primary",
            )}
            onClick={toggleCite}
          >
            <FaQuoteRight /> Cite
          </Button>
        )}
        {url && (
          <Link
            href={url}
            className={cn(
              "mt-2",
              buttonVariants({ variant: "outline", size: "sm" }),
            )}
          >
            <LuLink2 /> URL
          </Link>
        )}
        {pdf && (
          <Link
            href={pdf}
            className={cn(
              "mt-2",
              buttonVariants({ variant: "outline", size: "sm" }),
            )}
          >
            <FaRegFilePdf /> PDF
          </Link>
        )}
        {code && (
          <Link
            href={code}
            className={cn(
              "mt-2",
              buttonVariants({ variant: "outline", size: "sm" }),
            )}
          >
            <LuCodeXml /> Code
          </Link>
        )}
        {video && (
          <Link
            href={video}
            className={cn(
              "mt-2",
              buttonVariants({ variant: "outline", size: "sm" }),
            )}
          >
            <LuVideo /> Video
          </Link>
        )}
      </div>
      {abstract && (
        <div
          ref={abstractRef}
          style={{ height: abstractHeight }}
          className="overflow-hidden transition-[height] duration-300 ease-in-out"
        >
          <ChaSafeHtml
            html={abstract}
            className="prose mt-2 p-4 text-sm border-1 rounded-md"
          />
        </div>
      )}
      {bibtexShow && (
        <div
          ref={citeRef}
          style={{ height: citeHeight }}
          className="overflow-hidden transition-[height] duration-300 ease-in-out"
        >
          <div className="mt-2">
            <DynamicCodeBlock lang="bibtex" code={bib} />
          </div>
        </div>
      )}
    </div>
  );
};
