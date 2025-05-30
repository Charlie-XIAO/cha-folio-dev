import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";

const { title = "News", description } = config.pages?.news ?? {};

export default async function Page() {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-fd-primary mb-2">{title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">{description}</p>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
