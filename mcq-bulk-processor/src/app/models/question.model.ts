// ---- Step 1: /convert ----
// Request: raw text (string)
// Response: ParsedQuestion[]
export interface ParsedQuestion {
  number: number;
  text: string;
  options: { [key: string]: string }; // e.g. { "A": "Option 1", "B": "..." }
  answer: string;                     // e.g. "B"
}

// ---- Step 2: /parse ----
// Request: ParseRequest
export interface ParseRequest {
  difficulty: string;
  module: string;
  questions: ParsedQuestion[];
}

// Response: ParsedFlatQuestion[]
export interface ParsedFlatQuestion {
  text: string;
  difficulty: string;
  module: string;
  option1_text: string;
  option1_is_correct: boolean;
  option2_text: string;
  option2_is_correct: boolean;
  option3_text: string;
  option3_is_correct: boolean;
  option4_text: string;
  option4_is_correct: boolean;
}

// ---- App-level state helpers ----
export interface AppState {
  step: 1 | 2 | 3;
  rawText: string;
  classLevel: string;
  difficulty: string;
  subject: string;
  convertedQuestions: ParsedQuestion[];
  flatQuestions: ParsedFlatQuestion[];
}
