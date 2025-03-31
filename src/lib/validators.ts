
import { CategoryType } from "@/components/CategorySelector";

// Validation function for business idea
export function validateBusinessIdea(idea: string): { valid: boolean; message?: string } {
  if (!idea || idea.trim().length === 0) {
    return { valid: false, message: "Var vänlig beskriv din affärsidé" };
  }
  
  if (idea.trim().length < 20) {
    return { valid: false, message: "Din beskrivning är för kort. Var vänlig ge mer information" };
  }
  
  if (idea.trim().length > 2000) {
    return { valid: false, message: "Din beskrivning är för lång. Var vänlig att korta ner den" };
  }
  
  return { valid: true };
}

// Validation function for category
export function validateCategory(category: CategoryType | null): { valid: boolean; message?: string } {
  if (!category) {
    return { valid: false, message: "Var vänlig välj en bransch" };
  }
  
  return { valid: true };
}

// Validation for ambition level
export function validateAmbition(level: number): { valid: boolean; message?: string } {
  if (level < 1 || level > 5) {
    return { valid: false, message: "Ambitionsnivå måste vara mellan 1 och 5" };
  }
  
  return { valid: true };
}

// Comprehensive validation for entire form
export function validateForm(idea: string, category: CategoryType | null, ambition: number): { valid: boolean; message?: string } {
  const ideaValidation = validateBusinessIdea(idea);
  if (!ideaValidation.valid) {
    return ideaValidation;
  }
  
  const categoryValidation = validateCategory(category);
  if (!categoryValidation.valid) {
    return categoryValidation;
  }
  
  const ambitionValidation = validateAmbition(ambition);
  if (!ambitionValidation.valid) {
    return ambitionValidation;
  }
  
  return { valid: true };
}
