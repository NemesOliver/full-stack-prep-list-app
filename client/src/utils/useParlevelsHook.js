import { useState } from "react";

export const useParlevelsHook = (dishesArr, soldItemsArr) => {
  const [currentDay, setCurrentDay] = useState("Monday");

  // Helpers
  const dateToDayString = (date) =>
    new Date(date).toLocaleDateString(navigator.language, {
      weekday: "long",
    });

  const totalSumReducer = (a, b) => a + b;

  // Get average parlevels for single dish
  const calculateParLevel = (DISH_ID) => {
    const totalSoldPerDish = soldItemsArr
      .map(({ date, sold }) => dateToDayString(date) === currentDay && sold)
      .flat()
      .filter(({ dishId }) => dishId === DISH_ID)
      .map(({ sold }) => sold);

    const totalSum = totalSoldPerDish.reduce(totalSumReducer, 0);

    const average = Math.round(totalSum / totalSoldPerDish.length);

    return average;
  };

  // Loop through all dishes and get parlevel for each
  const parlevelsForAllDishes = dishesArr.map(({ _id: id }) => ({
    [id]: calculateParLevel(id),
  }));

  return [parlevelsForAllDishes, setCurrentDay];
};
