"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { IngredientsChart } from "@/app/components/IngredientsChart";
import { ingredientsDatabase } from "@/app/lib/database";
import type { Recipe, RecipeIngredients } from "@/app/types/recipe.interface";

const Home = () => {
  interface BaseData {
    weight: number;
    energyPerDay?: number;
    energyPerMeal?: number;
    minProteinPerMeal?: number;
    maxProteinPerMeal?: number;
    minFatPerMeal?: number;
    maxFatPerMeal?: number;
    minCarbPerMeal?: number;
    maxCarbPerMeal?: number;
  }

  const [weight, setWeight] = useState<number>(4);

  const initRecipe: Recipe = {
    とりささみ肉: { symbol: "🐔", amount: 0 },
    とりむね肉: { symbol: "🐔", amount: 0 },
    とりもも肉: { symbol: "🐔", amount: 0 },
    ぶたもも肉: { symbol: "🐷", amount: 0 },
    モッツアレラチーズ: { symbol: "🧀", amount: 0 },
    ブロッコリー: { symbol: "🥦", amount: 0 },
    にんじん: { symbol: "🥕", amount: 0 },
    かぼちゃ: { symbol: "🫑", amount: 0 },
    じゃがいも: { symbol: "🥔", amount: 0 },
    さつまいも: { symbol: "🍠", amount: 0 },
  };
  const [recipe, setRecipe] = useState<Recipe>(initRecipe);

  /**
   * 1日に必要なエネルギー量を計算する
   * @param dogWeight - 犬の体重 (kg)
   * @returns 1日に必要なエネルギー量 (kcal)
   */
  const calcRequiredEnergy = useCallback((dogWeight: number): number => {
    const restingEnergyRequirement = 70 * dogWeight ** 0.75;
    const coef = 1.6;
    const dailyEnergyRequirement = restingEnergyRequirement * coef;
    return dailyEnergyRequirement;
  }, []);

  const baseData = useMemo<BaseData>(() => {
    const newBaseData: BaseData = { weight: weight };
    newBaseData.energyPerDay = calcRequiredEnergy(weight);
    newBaseData.energyPerMeal = newBaseData.energyPerDay * 0.5;
    newBaseData.minProteinPerMeal = (newBaseData.energyPerMeal * 0.25) / 4;
    newBaseData.maxProteinPerMeal = (newBaseData.energyPerMeal * 0.3) / 4;
    newBaseData.minFatPerMeal = (newBaseData.energyPerMeal * 0.15) / 9;
    newBaseData.maxFatPerMeal = (newBaseData.energyPerMeal * 0.2) / 9;
    newBaseData.minCarbPerMeal = (newBaseData.energyPerMeal * 0.5) / 4;
    newBaseData.maxCarbPerMeal = (newBaseData.energyPerMeal * 0.6) / 4;
    return newBaseData;
  }, [weight, calcRequiredEnergy]);

  const summarizeRecipeElement = useCallback(
    (element: keyof (typeof ingredientsDatabase)[string]) => {
      const totalElementValue = Object.entries(recipe).reduce(
        (acc, [key, value]) => {
          const elementValue = ingredientsDatabase[key]?.[element] || 0;
          return acc + elementValue * (value.amount / 100);
        },
        0,
      );
      return totalElementValue;
    },
    [recipe],
  );

  const recipeIngredients: RecipeIngredients =
    useMemo<RecipeIngredients>(() => {
      const energy = summarizeRecipeElement("energy");
      const protein = summarizeRecipeElement("protein");
      const fat = summarizeRecipeElement("fat");
      const carb = summarizeRecipeElement("carb");
      const pfcBasedEnergy = protein * 4 + fat * 9 + carb * 4;
      const proteinRatio = ((protein * 4) / pfcBasedEnergy) * 100;
      const fatRatio = ((fat * 9) / pfcBasedEnergy) * 100;
      const carbRatio = ((carb * 4) / pfcBasedEnergy) * 100;

      return {
        energy: { label: "総エネルギー", value: energy, unit: "kcal" },
        protein: { label: "総タンパク質量", value: protein, unit: "g" },
        fat: { label: "総脂質量", value: fat, unit: "g" },
        carb: { label: "総炭水化物量", value: carb, unit: "g" },
        proteinRatio: {
          label: "タンパク質割合",
          value: proteinRatio,
          unit: "%",
        },
        fatRatio: { label: "脂質割合", value: fatRatio, unit: "%" },
        carbRatio: { label: "炭水化物割合", value: carbRatio, unit: "%" },
      };
    }, [summarizeRecipeElement]);

  useEffect(() => {
    const localWeight = Number(localStorage.getItem("weight"));
    setWeight(localWeight || 4);
    const localRecipe = JSON.parse(localStorage.getItem("recipe") || "{}");
    if (Object.keys(localRecipe).length > 0) {
      setRecipe(localRecipe);
    } else {
      setRecipe(initRecipe);
    }
  }, []);

  return (
    <div className="">
      <main className="p-4">
        <div className="text-3xl font-bold">🐶 こてグルメ 🍖</div>
        <section className="px-4 py-4">
          <div className="text-2xl font-bold py-4">📝 必要栄養素</div>
          <div className="grid grid-cols-2 gap-1 w-1/3">
            <div className="">現在の体重: </div>
            <div>
              <input
                type="number"
                step="0.1"
                min={0.0}
                max={5.0}
                value={weight}
                onChange={(e) => {
                  localStorage.setItem("weight", e.target.value);
                  setWeight(Number(e.target.value));
                }}
                className="text-right px-2 w-16"
              ></input>{" "}
              kg
            </div>
            <div className="">1日あたりの必要カロリー: </div>
            <div className="">{baseData.energyPerDay?.toFixed(1)} kcal</div>
            <div className="">1食あたりの必要カロリー: </div>
            <div className="">{baseData.energyPerMeal?.toFixed(1)} kcal</div>
            <div className="">1食あたりの必要タンパク質量: </div>
            <div className="">
              {baseData.minProteinPerMeal?.toFixed(1)}
              {" 〜 "}
              {baseData.maxProteinPerMeal?.toFixed(1)} g
            </div>
            <div className="">1食あたりの必要脂質量: </div>
            <div className="">
              {baseData.minFatPerMeal?.toFixed(1)}
              {" 〜 "}
              {baseData.maxFatPerMeal?.toFixed(1)} g
            </div>
            <div className="">1食あたりの必要炭水化物量: </div>
            <div className="">
              {baseData.minCarbPerMeal?.toFixed(1)}
              {" 〜 "}
              {baseData.maxCarbPerMeal?.toFixed(1)} g
            </div>
          </div>
        </section>
        <section className="p-4">
          <div className="text-2xl font-bold py-4">🍽️ レシピをつくる</div>
          <div className="flex">
            <div className="w-1/3">
              <div className="text-xl font-bold p-2">レシピ</div>
              {Object.entries(recipe).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-1">
                  <div key={key} className="w-96">
                    {value.symbol} {key}
                  </div>
                  <div>
                    <input
                      type="number"
                      step={1}
                      value={value.amount}
                      onChange={(e) => {
                        const newRecipe: Recipe = {
                          ...recipe,
                          [key]: {
                            ...value,
                            amount: Number(e.target.value),
                          },
                        };
                        localStorage.setItem("recipe", JSON.stringify(recipe));
                        setRecipe(newRecipe);
                      }}
                      className="text-right w-16"
                    ></input>{" "}
                    g
                  </div>
                </div>
              ))}
            </div>
            <div className="w-72">
              <div className="text-xl font-bold p-2">栄養素</div>
              {Object.entries(recipeIngredients).map(([key, element]) => (
                <div key={key} className="grid grid-cols-3 gap-1 w-66">
                  <div className="w-42">{element.label}</div>
                  <div className="text-right w-16">
                    {element.value.toFixed(0)}
                  </div>
                  <div className="w-8">{element.unit}</div>
                </div>
              ))}
            </div>
            <div className="w-1/3">
              <IngredientsChart recipeIngredients={recipeIngredients} />
            </div>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
};

export default Home;
