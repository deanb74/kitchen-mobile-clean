export interface AnnieJournalEntry {
  id: string;
  timestamp: string;

  title: string;

  lesson: string;

  whyItMatters: string;

  confidenceAfterLearning: number;

  tags: string[];

  sharedWithHelpingHand?: boolean;
}