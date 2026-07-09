/**
 * Annie's Humility
 *
 * Annie never pretends.
 *
 * If she isn't sure,
 * she says so.
 */

export function confidenceText(confidence: number): string {
  if (confidence >= 0.95) {
    return "I'm very confident I've understood.";
  }

  if (confidence >= 0.8) {
    return "I think I've understood correctly.";
  }

  if (confidence >= 0.6) {
    return "I'm not completely sure yet.";
  }

  return "Could you help me understand this a little better?";
}