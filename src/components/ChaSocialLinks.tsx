/**
 * References:
 * https://github.com/alshedivat/al-folio/blob/693c3beacb9c284573145884f8306441f75e30aa/_includes/social.liquid#L3
 */

import { cn } from "fumadocs-ui/utils/cn";
import { HTMLAttributes, ReactNode } from "react";
import config from "@/cha-folio.config";
import Link from "fumadocs-core/link";
import {
  SiAcm,
  SiDblp,
  SiGooglescholar,
  SiIeee,
  SiInspire,
  SiLeetcode,
  SiOrcid,
  SiOsf,
  SiPublons,
  SiResearchgate,
  SiScopus,
  SiSemanticscholar,
  SiWikidata,
  SiXiaohongshu,
  SiZhihu,
  SiZotero,
} from "react-icons/si";
import {
  FaBilibili,
  FaBloggerB,
  FaBluesky,
  FaBriefcase,
  FaDiscord,
  FaFacebook,
  FaFlickr,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaKaggle,
  FaKeybase,
  FaLastfm,
  FaLinkedin,
  FaMastodon,
  FaMedium,
  FaPinterest,
  FaQuora,
  FaSpotify,
  FaStackOverflow,
  FaStrava,
  FaTelegram,
  FaUnsplash,
  FaWeibo,
  FaWeixin,
  FaWhatsapp,
  FaWikipediaW,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LuMail, LuRss } from "react-icons/lu";
import { ChaImage } from "./ChaImage";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/Popover";
import { ChaImageDef } from "@/types";

export interface ChaSocialLinksProps extends HTMLAttributes<HTMLDivElement> {}

export function ChaSocialLinks({ className, ...props }: ChaSocialLinksProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-3 gap-y-2 items-center justify-center text-3xl",
        className,
      )}
      {...props}
    >
      {config.socialLinks?.map((link) => {
        let icon: ReactNode;
        let title: string | undefined = undefined;
        let href: string | undefined = undefined;
        let image: ChaImageDef | undefined = undefined;

        switch (link.type) {
          case "acm":
            icon = <SiAcm />;
            title = "ACM DL";
            href = `https://dl.acm.org/profile/${link.id}`;
            break;
          case "bilibili":
            icon = <FaBilibili />;
            title = "Bilibili";
            href = `https://space.bilibili.com/${link.id}`;
            break;
          case "blogger":
            icon = <FaBloggerB />;
            title = "Blogger";
            href = link.url;
            break;
          case "bluesky":
            icon = <FaBluesky />;
            title = "Bluesky";
            href = link.url;
            break;
          case "dblp":
            icon = <SiDblp />;
            title = "DBLP";
            href = link.url;
            break;
          case "discord":
            icon = <FaDiscord />;
            title = "Discord";
            href = `https://discord.com/users/${link.id}`;
            break;
          case "email":
            icon = <LuMail />;
            title = "Email";
            href = `mailto:${link.email}`;
            break;
          case "facebook":
            icon = <FaFacebook />;
            title = "Facebook";
            href = `https://facebook.com/${link.id}`;
            break;
          case "flickr":
            icon = <FaFlickr />;
            title = "Flickr";
            href = `https://www.flickr.com/${link.id}`;
            break;
          case "github":
            icon = <FaGithub />;
            title = "GitHub";
            href = `https://github.com/${link.username}`;
            break;
          case "gitlab":
            icon = <FaGitlab />;
            title = "GitLab";
            href = `https://gitlab.com/${link.username}`;
            break;
          case "ieee":
            icon = <SiIeee />;
            title = "IEEE Xplore";
            href = `https://ieeexplore.ieee.org/author/${link.id}/`;
            break;
          case "inspirehep":
            icon = <SiInspire />;
            title = "Inspire HEP";
            href = `https://inspirehep.net/authors/${link.id}`;
            break;
          case "instagram":
            icon = <FaInstagram />;
            title = "Instagram";
            href = `https://instagram.com/${link.id}`;
            break;
          case "kaggle":
            icon = <FaKaggle />;
            title = "Kaggle";
            href = `https://www.kaggle.com/${link.id}`;
            break;
          case "keybase":
            icon = <FaKeybase />;
            title = "Keybase";
            href = `https://keybase.io/${link.username}`;
            break;
          case "lastfm":
            icon = <FaLastfm />;
            title = "Last FM";
            href = `https://www.last.fm/user/${link.id}`;
            break;
          case "leetcode":
            icon = <SiLeetcode />;
            title = "LeetCode";
            href = `https://leetcode.com/u/${link.id}/`;
            break;
          case "linkedin":
            icon = <FaLinkedin />;
            title = "LinkedIn";
            href = `https://www.linkedin.com/in/${link.username}`;
            break;
          case "mastodon":
            icon = <FaMastodon />;
            title = "Mastodon";
            href = `https://${link.username}`;
            break;
          case "medium":
            icon = <FaMedium />;
            title = "Medium";
            href = `https://medium.com/@${link.username}`;
            break;
          case "orcid":
            icon = <SiOrcid />;
            title = "ORCID";
            href = `https://orcid.org/${link.id}`;
            break;
          case "osf":
            icon = <SiOsf />;
            title = "Open Science Framework";
            href = `https://osf.io/${link.id}/`;
            break;
          case "pinterest":
            icon = <FaPinterest />;
            title = "Pinterest";
            href = `https://www.pinterest.com/${link.id}`;
            break;
          case "publons":
            icon = <SiPublons />;
            title = "Publons";
            href = `https://publons.com/a/${link.id}/`;
            break;
          case "quora":
            icon = <FaQuora />;
            title = "Quora";
            href = `https://www.quora.com/profile/${link.username}`;
            break;
          case "researchgate":
            icon = <SiResearchgate />;
            title = "ResearchGate";
            href = `https://www.researchgate.net/profile/${link.id}/`;
            break;
          case "rss":
            icon = <LuRss />;
            title = "RSS Feed";
            href = "/api/feed.xml";
            break;
          case "scholar":
            icon = <SiGooglescholar />;
            title = "Google Scholar";
            href = `https://scholar.google.com/citations?user=${link.id}`;
            break;
          case "scopus":
            icon = <SiScopus />;
            title = "Scopus";
            href = `https://www.scopus.com/authid/detail.uri?authorId=${link.id}`;
            break;
          case "semanticscholar":
            icon = <SiSemanticscholar />;
            title = "Semantic Scholar";
            href = `https://www.semanticscholar.org/author/${link.id}`;
            break;
          case "spotify":
            icon = <FaSpotify />;
            title = "Spotify";
            href = `https://open.spotify.com/user/${link.id}`;
            break;
          case "stackoverflow":
            icon = <FaStackOverflow />;
            title = "Stackoverflow";
            href = `https://stackoverflow.com/users/${link.id}`;
            break;
          case "strava":
            icon = <FaStrava />;
            title = "Strava";
            href = `https://www.strava.com/athletes/${link.id}`;
            break;
          case "telegram":
            icon = <FaTelegram />;
            title = "Telegram";
            href = `https://telegram.me/${link.username}`;
            break;
          case "unsplash":
            icon = <FaUnsplash />;
            title = "Unsplash";
            href = `https://unsplash.com/@${link.id}`;
            break;
          case "wechat":
            icon = <FaWeixin />;
            title = "WeChat";
            image = link.qr;
            break;
          case "weibo":
            icon = <FaWeibo />;
            title = "Weibo";
            image = link.qr;
            break;
          case "whatsapp":
            icon = <FaWhatsapp />;
            title = "WhatsApp";
            href = `https://wa.me/${link.number}`;
            break;
          case "wikidata":
            icon = <SiWikidata />;
            title = "Wikidata";
            href = `https://www.wikidata.org/wiki/${link.id}`;
            break;
          case "wikipedia":
            icon = <FaWikipediaW />;
            title = "Wikipedia";
            href = `https://wikipedia.org/wiki/User:${link.id}`;
            break;
          case "work":
            icon = <FaBriefcase />;
            title = "Work";
            href = link.url;
            break;
          case "x":
            icon = <FaXTwitter />;
            title = "X";
            href = `https://twitter.com/${link.username}`;
            break;
          case "xiaohongshu":
            icon = <SiXiaohongshu />;
            title = "Xiaohongshu";
            image = link.qr;
            break;
          case "youtube":
            icon = <FaYoutube />;
            title = "YouTube";
            href = `https://youtube.com/@${link.id}`;
            break;
          case "zhihu":
            icon = <SiZhihu />;
            title = "Zhihu";
            href = `https://www.zhihu.com/people/${link.id}`;
            break;
          case "zotero":
            icon = <SiZotero />;
            title = "Zotero";
            href = `https://www.zotero.org/${link.username}`;
            break;
          case "custom":
            icon = link.icon;
            title = link.title;
            href = link.url;
            break;
          default:
            console.error("Unknown social link:", link);
            return null;
        }

        if (href === undefined && image !== undefined) {
          return (
            <Popover key={link.type}>
              <PopoverTrigger className="cursor-pointer" title={title} asChild>
                <FaWeixin />
              </PopoverTrigger>
              <PopoverContent className="m-2 w-auto h-auto">
                <ChaImage
                  image={image}
                  width={400}
                  height={400}
                  className="object-contain max-w-80 max-h-80 w-auto h-auto"
                />
              </PopoverContent>
            </Popover>
          );
        }

        if (href !== undefined && image === undefined) {
          return (
            <Link key={link.type} href={href} title={title}>
              {icon}
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
}
