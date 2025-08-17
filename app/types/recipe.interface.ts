export interface RecipeIngredients {
  energy: { label: string; value: number; unit: string };
  protein: { label: string; value: number; unit: string };
  fat: { label: string; value: number; unit: string };
  carb: { label: string; value: number; unit: string };
  proteinRatio: { label: string; value: number; unit: string };
  fatRatio: { label: string; value: number; unit: string };
  carbRatio: { label: string; value: number; unit: string };
}

export interface Recipe {
  [key: string]: { symbol: string; amount: number };
}
