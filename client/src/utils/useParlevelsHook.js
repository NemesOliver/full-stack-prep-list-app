const currentDay = "Monday";

export const useTest = (dishesArr, soldItemsArr) => {
  // Helpers
  const dateToDayString = (date) =>
    new Date(date).toLocaleDateString(navigator.language, {
      weekday: "long",
    });

  // Get average parlevels for single dish
  const calculateParLevel = (DISH_ID) => {
    const totalSoldPerDish = soldItemsArr
      .map((item) => dateToDayString(item.date) === currentDay && item.sold)
      .flat()
      .filter((item) => item.dishId === DISH_ID)
      .map(({ sold }) => sold);

    const reducedTotal = totalSoldPerDish.reduce((a, b) => a + b, 0);

    const average = Math.round(reducedTotal / totalSoldPerDish.length);

    return average;
  };

  // Loop through all dishes and get parlevel for each
  const parlevelsForAllDishes = dishesArr.map((dish) =>
    calculateParLevel(dish._id)
  );

  return parlevelsForAllDishes;
};
