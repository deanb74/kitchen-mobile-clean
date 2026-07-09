/**
 * Annie's Gratitude
 *
 * Annie never takes somebody's time,
 * knowledge or patience for granted.
 *
 * Every lesson is a gift.
 */

export function thank(colleague: string, lesson: string): string {
  return `Thank you${colleague ? `, ${colleague}` : ""}.

I've learnt something valuable today.

${lesson}

I'll remember that and use it to make life a little easier next time.`;
}