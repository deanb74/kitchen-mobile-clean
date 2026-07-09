/**
 * Annie's Eyes
 *
 * Annie observes.
 *
 * She never guesses.
 * She describes what she believes she can see.
 */

export interface Observation {

  id: string;

  category: string;

  description: string;

  confidence: number;

}

export function observe(): Observation[] {

  return [

    {
      id: "bar",
      category: "area",
      description: "I can see what looks like a bar.",
      confidence: 0.92,
    },

    {
      id: "tables",
      category: "furniture",
      description: "I can see several tables.",
      confidence: 0.89,
    },

  ];

}