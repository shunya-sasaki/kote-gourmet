import { useMemo } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

import type { RecipeIngredients } from "@/app/types/recipe.interface";

interface RadarData {
  subject: string;
  最小値: number;
  最大値: number;
  レシピ: number;
}

interface Props {
  recipeIngredients: RecipeIngredients;
}

export const IngredientsChart = (props: Props) => {
  const { recipeIngredients } = props;

  const colors = {
    blue: "#4285F4",
    red: "#DB4437",
    yellow: "#F4B400",
    green: "#0F9D58",
  };

  const radarData: RadarData[] = useMemo(() => {
    const maxProteinRatio = 35;
    const maxFatRatio = 25;
    const maxCarbRatio = 70;
    return [
      {
        subject: "タンパク質",
        最小値: 25 / maxProteinRatio,
        レシピ: recipeIngredients.proteinRatio.value / maxProteinRatio,
        最大値: 30 / maxProteinRatio,
      },
      {
        subject: "脂質",
        最小値: 15 / maxFatRatio,
        レシピ: recipeIngredients.fatRatio.value / maxFatRatio,
        最大値: 20 / maxFatRatio,
      },
      {
        subject: "炭水化物",
        最小値: 50 / maxCarbRatio,
        レシピ: recipeIngredients.carbRatio.value / maxCarbRatio,
        最大値: 60 / maxCarbRatio,
      },
    ];
  }, [recipeIngredients]);

  const isRecipeOk = () => {
    const isProteinOk =
      recipeIngredients.proteinRatio.value >= 25 &&
      recipeIngredients.proteinRatio.value <= 30;
    const isFatOk =
      recipeIngredients.fatRatio.value >= 15 &&
      recipeIngredients.fatRatio.value <= 20;
    const isCarbOk =
      recipeIngredients.carbRatio.value >= 50 &&
      recipeIngredients.carbRatio.value <= 60;
    const isOk = isProteinOk && isFatOk && isCarbOk;
    return isOk;
  };

  return (
    <div>
      <RadarChart outerRadius={90} width={400} height={250} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" max="fullMark" />
        <PolarRadiusAxis angle={90} domain={[0, 1]} display="None" />
        <Radar
          name="最小値"
          dataKey="最小値"
          stroke={colors.red}
          fill="none"
          fillOpacity={0.0}
          strokeDasharray="5 5"
          legendType="plainline"
        />
        <Radar
          name="レシピ"
          dataKey="レシピ"
          stroke={isRecipeOk() ? colors.green : colors.yellow}
          fill={isRecipeOk() ? colors.green : colors.yellow}
          fillOpacity={0.6}
        />
        <Radar
          name="最大値"
          dataKey="最大値"
          stroke={colors.red}
          fill="none"
          fillOpacity={0.0}
          strokeDasharray="5 5"
          legendType="plainline"
        />
        <Legend />
        <Tooltip />
      </RadarChart>
    </div>
  );
};
