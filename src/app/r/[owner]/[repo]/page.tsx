import { AnalysisView } from "@/components/AnalysisView";

interface PageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default async function RepositoryPage({ params }: PageProps) {
  const { owner, repo } = await params;
  return <AnalysisView owner={owner} repo={repo} />;
}
