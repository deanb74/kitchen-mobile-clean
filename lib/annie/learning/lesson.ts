/**
 * Every new capability begins as a lesson.
 *
 * Annie is never simply given knowledge.
 *
 * She learns it.
 */

export interface AnnieLesson {
  title: string;
  taughtBy: string;
  learntOn: Date;
  confidence: number;
  notes: string;
}