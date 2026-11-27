import Image from "next/image";
import DocsShell from "@/components/DocsShell";
import { getNav } from "@/lib/content";
import { site } from "@/lib/site";
import icon from "../icon.svg";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell
      nav={getNav()}
      siteName={site.name}
      logo={<Image src={icon} alt="" width={28} height={28} priority />}
    >
      {children}
    </DocsShell>
  );
}
