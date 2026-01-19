import { Trait, NextLife, nextLives } from './gameData';

/**
 * Calculate trait scores from user answers
 * @param answerTraits - Array of trait arrays from each answer
 * @returns Object with trait counts
 */
export function calculateTraitScores(answerTraits: Trait[][]): Record<Trait, number> {
  const scores: Record<string, number> = {};

  // Flatten all traits and count occurrences
  answerTraits.flat().forEach(trait => {
    scores[trait] = (scores[trait] || 0) + 1;
  });

  return scores as Record<Trait, number>;
}

/**
 * Find the dominant traits (top 3)
 * @param scores - Trait scores object
 * @returns Array of top traits
 */
export function getDominantTraits(scores: Record<Trait, number>): Trait[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => trait as Trait);
}

/**
 * Calculate match score between user traits and a result's required traits
 * @param userTraits - User's dominant traits
 * @param resultTraits - Required traits for a result
 * @returns Match score (higher is better)
 */
function calculateMatchScore(userTraits: Trait[], resultTraits: Trait[]): number {
  let score = 0;

  resultTraits.forEach(requiredTrait => {
    const index = userTraits.indexOf(requiredTrait);
    if (index !== -1) {
      // Earlier traits (more dominant) get higher weight
      score += (3 - index) * 2;
    }
  });

  return score;
}

/**
 * Determine the user's "next life" based on their answers
 * @param answerTraits - Array of trait arrays from each answer
 * @returns The determined NextLife result
 */
export function determineNextLife(answerTraits: Trait[][]): NextLife {
  // 10% chance of getting a secret result
  const secretChance = Math.random();
  if (secretChance < 0.1) {
    const secretLives = nextLives.filter(life => life.isSecret);
    const randomSecret = secretLives[Math.floor(Math.random() * secretLives.length)];
    return randomSecret;
  }

  // Calculate trait scores
  const scores = calculateTraitScores(answerTraits);
  const dominantTraits = getDominantTraits(scores);

  // Find best matching result (excluding secret ones)
  const regularLives = nextLives.filter(life => !life.isSecret);

  let bestMatch = regularLives[0];
  let bestScore = -1;

  regularLives.forEach(life => {
    const matchScore = calculateMatchScore(dominantTraits, life.requiredTraits);
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = life;
    }
  });

  return bestMatch;
}

/**
 * Get a formatted list of user's top traits for display
 * @param answerTraits - Array of trait arrays from each answer
 * @returns Formatted string of dominant traits
 */
export function getTraitSummary(answerTraits: Trait[][]): string {
  const scores = calculateTraitScores(answerTraits);
  const dominantTraits = getDominantTraits(scores);

  return dominantTraits
    .map(trait => trait.charAt(0).toUpperCase() + trait.slice(1))
    .join(', ');
}
