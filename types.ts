export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum AppStep {
  Intake = 0,
  Symptoms = 1,
  Processing = 2,
  Report = 3,
  Error = 4
}

export interface UserData {
  name: string;
  age: string;
  gender: Gender;
  language: string;
}

export const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Telugu",
  "Tamil",
  "Tulu",
  "Malayalam",
  "Gujarati",
  "Marwadi",
  "Bihari"
];

export const SYMPTOMS_LIST = [
  "Frequent Urination",
  "Excessive Thirst",
  "Extreme Hunger",
  "Unexplained Weight Loss",
  "Fatigue / Tiredness",
  "Blurred Vision",
  "Slow Healing Sores",
  "Frequent Infections",
  "Numbness in Hands/Feet",
  "Dry Skin",
  "Dizziness",
  "Anxiety"
];

export interface HealthReport {
  riskLevel: "Low" | "Moderate" | "High";
  summary: string;
  recommendations: string[];
  disclaimer: string;
}

export interface ProcessingStatus {
  stage: "intake" | "triage" | "screening" | "finalizing";
  message: string;
}
