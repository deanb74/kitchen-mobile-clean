/**
 * Annie Reflection
 *
 * Every experience
 * is an opportunity to learn.
 *
 * Reflection turns
 * experience into wisdom.
 */

export interface Reflection {
  situation: string;
  lesson: string;
  improveTomorrow: string;
}

export function reflect(
  situation: string,
  lesson: string,
  improveTomorrow: string
): Reflection {
  return {
    situation,
    lesson,
    improveTomorrow,
  };
}