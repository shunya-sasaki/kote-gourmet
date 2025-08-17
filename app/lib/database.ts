// This file contains the database of ingredients with their nutritional values.
// Each ingredient is represented by its name in Japanese, and the values are per 100g
// Reference: [文部科学省 食品成分データベース](https://fooddb.mext.go.jp)

interface IngredientDataBase {
  [key: string]: {
    energy: number; // kcal per 100g
    protein: number; // g per 100g
    fat: number; // g per 100g
    carb: number; // g per 100g
  };
}

export const ingredientsDatabase: IngredientDataBase = {
  モッツアレラチーズ: {
    energy: 269,
    protein: 18.4,
    fat: 19.9,
    carb: 4.2,
  },
  とりささみ肉: {
    energy: 98,
    protein: 23.9,
    fat: 0.8,
    carb: 0.1,
  },
  とりむね肉: {
    energy: 113,
    protein: 24.4,
    fat: 1.9,
    carb: 0,
  },
  とりもも肉: {
    energy: 128,
    protein: 22.0,
    fat: 4.8,
    carb: 0,
  },
  ぶたもも肉: {
    energy: 171,
    protein: 20.5,
    fat: 10.2,
    carb: 0.2,
  },
  ブロッコリー: {
    energy: 37,
    protein: 5.4,
    fat: 0.6,
    carb: 6.6,
  },
  にんじん: {
    energy: 32,
    protein: 0.7,
    fat: 0.2,
    carb: 8.8,
  },
  かぼちゃ: {
    energy: 41,
    protein: 1.6,
    fat: 0.1,
    carb: 10.9,
  },
  じゃがいも: {
    energy: 59,
    protein: 1.8,
    fat: 0.1,
    carb: 17.3,
  },
  さつまいも: {
    energy: 126,
    protein: 1.2,
    fat: 0.2,
    carb: 31.9,
  },
};
