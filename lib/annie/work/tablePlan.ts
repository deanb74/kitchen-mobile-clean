/**
 * Annie's First Piece of Work
 *
 * Annie has observed the venue.
 * She has asked questions.
 * She has confirmed her understanding.
 *
 * Now she creates something useful.
 */

export interface VenueArea {
  name: string;
  tables: number;
  covers: number;
}

export interface TablePlan {
  createdAt: Date;
  areas: VenueArea[];
  totalCovers: number;
}

export function createInitialTablePlan(): TablePlan {
  return {
    createdAt: new Date(),

    areas: [
      {
        name: "Conservatory",
        tables: 10,
        covers: 40,
      },
    ],

    totalCovers: 40,
  };
}