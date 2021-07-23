import { useState, useEffect } from "react";

export const useParlevelsHook = (dishesArr, soldItemsArr) => {
  const [day, setDay] = useState("Monday");

  const currentDay = new Date().toLocaleDateString(navigator.language, {
    weekday: "long",
  });

  // useEffect(() => {
  //   setDay(currentDay);
  // }, [setDay, currentDay]);

  // Helpers
  const dateToDayString = (date) =>
    new Date(date).toLocaleDateString(navigator.language, {
      weekday: "long",
    });

  const totalSumReducer = (a, b) => a + b;

  // Get average parlevels for single dish
  const calculateParLevel = (DISH_ID) => {
    const totalSoldPerDish = soldItemsArr
      .map(({ date, sold }) => dateToDayString(date) === day && sold)
      .flat()
      .filter(({ dishId }) => dishId === DISH_ID)
      .map(({ sold }) => sold);

    const totalSum = totalSoldPerDish.reduce(totalSumReducer, 0);

    const average = Math.round(totalSum / totalSoldPerDish.length);

    return average;
  };

  // Loop through all dishes and get parlevel for each
  const parlevelsForAllDishes = dishesArr.map(({ _id: id, name }) => ({
    id: id,
    name,
    parlevel: calculateParLevel(id),
  }));

  return [parlevelsForAllDishes, setDay];
};
