import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { sourceMatrixSchema } from "@/lib/ctd/schema";

export const sourceMatrix = sourceMatrixSchema.parse(
  controlOfDrugProduct.sourceDocuments.map((source) => ({
    id: source.id,
    sourceDocument: source.title,
    sourceType: source.type,
    version: source.version,
    approvalStatus: source.approvalStatus,
    owner: source.owner,
    supportedSections: source.sectionsSupported,
    informationUsed: source.informationUsed,
    reviewStatus:
      source.approvalStatus === "approved"
        ? "closed"
        : source.approvalStatus === "draft" || source.approvalStatus === "under_review"
          ? "in_review"
          : "not_started",
    changeImpact:
      source.approvalStatus === "approved"
        ? "Reassess affected section extracts if the controlled version changes."
        : "Resolve status and version before final-authoring or reviewer-readiness decisions.",
  })),
);
