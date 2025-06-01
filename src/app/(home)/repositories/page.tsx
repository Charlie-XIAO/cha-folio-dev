import { ChaImage } from "@/components/ChaImage";
import Link from "fumadocs-core/link";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";
import { ChaHomePage } from "@/components/ChaHomePage";

const {
  title = "Repositories",
  description,
  username = [],
  repositories = [],
} = config.pages?.repositories ?? {};

export default function Page() {
  const usernames = typeof username === "string" ? [username] : username;

  return (
    <ChaHomePage title={title} description={description}>
      {usernames.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">GitHub Statistics</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {usernames.map((username) => (
              <li key={username} className="w-full">
                <Link href={`https://github.com/${username}`}>
                  <ChaImage
                    image={{
                      light: `https://github-readme-stats.vercel.app/api/?username=${username}&include_all_commits=true&show_icons=true&rank_icon=github&theme=light&locale=en`,
                      dark: `https://github-readme-stats.vercel.app/api/?username=${username}&include_all_commits=true&show_icons=true&rank_icon=github&theme=dark&locale=en`,
                      alt: "GitHub Stats",
                    }}
                    width={500}
                    height={300}
                    className="w-full h-auto max-w-[500px]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {repositories.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Top Repositories</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {repositories.map((repo) => {
              const [username, repoName] = repo.split("/");
              return (
                <li key={repo} className="w-full">
                  <Link href={`https://github.com/${username}/${repoName}`}>
                    <ChaImage
                      image={{
                        light: `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repoName}&show_owner=true&description_lines_count=2&theme=light&locale=en`,
                        dark: `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repoName}&show_owner=true&description_lines_count=2&theme=dark&locale=en`,
                        alt: "GitHub Stats",
                      }}
                      width={500}
                      height={300}
                      className="w-full h-auto max-w-[500px]"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ChaHomePage>
  );
}

export function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
