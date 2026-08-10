import {
  BookOpen,
  Type as TypeIcon,
  MessagesSquare,
  Utensils,
  ShoppingBasket,
  HelpCircle,
  Hash,
  type LucideIcon,
} from "lucide-react";

export type LessonStatus = "completed" | "active" | "locked";
export type UnitStatus = "active" | "locked";

export interface QuizQuestion {
  prompt: string;
  devanagari: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  devanagari: string;
  status: LessonStatus;
  icon: LucideIcon;
  questions: QuizQuestion[];
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  status: UnitStatus;
  lessons: Lesson[];
}

export const UNITS: Unit[] = [
  {
    id: 1,
    title: "Unit 1: Foundations",
    subtitle: "Letters, sounds & first words",
    status: "active",
    lessons: [
      {
        id: "greetings",
        title: "Basic Greetings",
        devanagari: "नमस्ते",
        status: "completed",
        icon: MessagesSquare,
        questions: [
          {
            prompt: "What does this greeting mean?",
            devanagari: "नमस्ते",
            options: ["Goodbye", "Hello", "Thank you", "Sorry"],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "a-sound",
        title: "The 'a' Sound",
        devanagari: "अ",
        status: "completed",
        icon: TypeIcon,
        questions: [
          {
            prompt: "Which letter makes the short 'a' sound?",
            devanagari: "अ",
            options: ["अ", "इ", "उ", "ए"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: "verbs",
        title: "Common Verbs",
        devanagari: "क्रिया",
        status: "active",
        icon: BookOpen,
        questions: [
          {
            prompt: "What does this verb mean?",
            devanagari: "खाना",
            options: ["To go", "To eat", "To sleep", "To read"],
            correctIndex: 1,
          },
          {
            prompt: "What does this verb mean?",
            devanagari: "पीना",
            options: ["To drink", "To run", "To write", "To sit"],
            correctIndex: 0,
          },
          {
            prompt: "What does this verb mean?",
            devanagari: "जाना",
            options: ["To eat", "To come", "To go", "To sleep"],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "numbers-1-10",
        title: "Numbers 1–10",
        devanagari: "गिनती",
        status: "locked",
        icon: Hash,
        questions: [],
      },
      {
        id: "family",
        title: "Family Words",
        devanagari: "परिवार",
        status: "locked",
        icon: MessagesSquare,
        questions: [],
      },
      {
        id: "k-sound",
        title: "The 'k' Sound",
        devanagari: "क",
        status: "locked",
        icon: TypeIcon,
        questions: [],
      },
      {
        id: "colors",
        title: "Colors",
        devanagari: "रंग",
        status: "locked",
        icon: BookOpen,
        questions: [],
      },
    ],
  },
  {
    id: 2,
    title: "Unit 2: Everyday Life",
    subtitle: "Unlocks after you finish Unit 1",
    status: "locked",
    lessons: [
      {
        id: "numbers-beyond-10",
        title: "Numbers Beyond 10",
        devanagari: "और गिनती",
        status: "locked",
        icon: Hash,
        questions: [],
      },
      {
        id: "food",
        title: "Food & Drink",
        devanagari: "खाना-पीना",
        status: "locked",
        icon: Utensils,
        questions: [],
      },
      {
        id: "market",
        title: "At the Market",
        devanagari: "बाज़ार में",
        status: "locked",
        icon: ShoppingBasket,
        questions: [],
      },
      {
        id: "questions",
        title: "Question Words",
        devanagari: "प्रश्न",
        status: "locked",
        icon: HelpCircle,
        questions: [],
      },
      {
        id: "i-sound",
        title: "The 'i' Sound",
        devanagari: "इ",
        status: "locked",
        icon: TypeIcon,
        questions: [],
      },
    ],
  },
];

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getAllLessonIds(): string[] {
  return UNITS.flatMap((unit) => unit.lessons.map((l) => l.id));
}
