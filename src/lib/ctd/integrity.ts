import { createHash } from "node:crypto";

export interface CitationFingerprintInput {
  id: string;
  officialUrl: string;
  sourceStatus: string;
  lastVerifiedDate: string;
  sectionOrPage: string;
}

export function calculateSourceSetHash(citations: CitationFingerprintInput[]) {
  const canonicalSourceSet = citations
    .map(({ id, lastVerifiedDate, officialUrl, sectionOrPage, sourceStatus }) => ({
      id,
      lastVerifiedDate,
      officialUrl,
      sectionOrPage,
      sourceStatus,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));

  return createHash("sha256").update(JSON.stringify(canonicalSourceSet)).digest("hex");
}
