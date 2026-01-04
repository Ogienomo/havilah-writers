"use client";

import { useMemo } from "react";

export type TriageInput = {
  scope: "short" | "chapter" | "full";
  complexity: "general" | "discipline" | "advanced";
  urgency: "standard" | "fast" | "urgent";
  special: boolean;
  wordCount: number;
};

export function calculateTriage(input: TriageInput) {
  let score = 0;

  if (input.scope === "short") score += 1;
  if (input.scope === "chapter") score += 2;
  if (input.scope === "full") score += 3;

  if (input.complexity === "general") score += 1;
  if (input.complexity === "discipline") score += 2;
  if (input.complexity === "advanced") score += 3;

  if (input.urgency === "fast") score += 1;
  if (input.urgency === "urgent") score += 2;

  if (input.special) score += 1;

  if (input.wordCount > 20000) score += 1;
  if (input.wordCount > 50000) score += 1;

  score = Math.min(score, 10);

  let label = "Low";
  let multiplier = 1.0;

  if (score >= 3 && score <= 5) {
    label = "Medium";
    multiplier = 1.25;
  } else if (score >= 6 && score <= 8) {
    label = "High";
    multiplier = 1.5;
  } else if (score >= 9) {
    label = "Critical";
    multiplier = 2.0;
  }

  return { score, label, multiplier };
}
