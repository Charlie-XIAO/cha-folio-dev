import config from "@/cha-folio.config";
import { ChaHomePage } from "@/components/ChaHomePage";
import { nodeInnerText } from "@/lib/utils";

const { title = "News", description } = config.pages?.news ?? {};

export default function Page() {
  return (
    <ChaHomePage title={title} description={description}>
      TODO
    </ChaHomePage>
  );
}

export function generateMetadata() {
  return {
    title: nodeInnerText(title),
    description: nodeInnerText(description),
  };
}
