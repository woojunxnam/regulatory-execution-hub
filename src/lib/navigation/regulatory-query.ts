import { regulatoryPathways, type RegulatoryPathway } from "@/data/home/regulatory-pathways";

export interface RegulatoryPathwayMatch {
  pathway: RegulatoryPathway;
  score: number;
}

const lowSignalTokens = new Set(["fda", "ema", "eu", "us"]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[._/\\-]+/g, " ")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length > 1),
  );
}

function scoreKeyword(query: string, queryTokens: Set<string>, keyword: string) {
  const normalizedKeyword = normalize(keyword);
  if (!normalizedKeyword) return 0;

  const keywordTokens = tokenize(normalizedKeyword);
  const lowSignalKeyword =
    keywordTokens.size === 1 && lowSignalTokens.has([...keywordTokens][0] ?? "");
  const phraseScore = query.includes(normalizedKeyword)
    ? lowSignalKeyword
      ? 3
      : 24 + keywordTokens.size * 9
    : 0;
  const tokenOverlap = [...keywordTokens].filter((token) => queryTokens.has(token)).length;
  const overlapScore = lowSignalKeyword
    ? tokenOverlap * 2
    : tokenOverlap === keywordTokens.size
      ? tokenOverlap * 7
      : tokenOverlap * 2;

  return phraseScore + overlapScore;
}

export function findRegulatoryPathways(query: string, limit = 3): RegulatoryPathwayMatch[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const queryTokens = tokenize(normalizedQuery);
  const matches = regulatoryPathways
    .map((pathway) => {
      const keywordScore = Math.max(
        ...pathway.keywords.map((keyword) => scoreKeyword(normalizedQuery, queryTokens, keyword)),
      );
      const titleScore = scoreKeyword(normalizedQuery, queryTokens, pathway.title);
      const categoryScore = scoreKeyword(normalizedQuery, queryTokens, pathway.category);

      return {
        pathway,
        score: keywordScore + titleScore + categoryScore,
      };
    })
    .filter((match) => match.score > 0)
    .sort(
      (left, right) => right.score - left.score || right.pathway.priority - left.pathway.priority,
    );

  if (matches.length > 0) {
    const strongestScore = matches[0]?.score ?? 0;
    const relevanceFloor = Math.max(8, Math.ceil(strongestScore * 0.3));

    return matches.filter((match) => match.score >= relevanceFloor).slice(0, limit);
  }

  return regulatoryPathways
    .filter((pathway) => ["ctd-builder", "source-matrix", "methodology"].includes(pathway.id))
    .sort((left, right) => right.priority - left.priority)
    .slice(0, limit)
    .map((pathway) => ({ pathway, score: 0 }));
}
