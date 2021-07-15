export const useAllParlevels = (dishData, soldData) =>
  dishData &&
  soldData &&
  dishData.map((dish) => {
    const translateToDays = (arrayToFilter) => {
      const daysData = arrayToFilter.map((item) => {
        const { sold } = item;

        return {
          // Replace if data grows too big // Limit 10k
          day: new Date(item.date).toLocaleDateString(navigator.language, {
            weekday: "long",
          }),
          sold,
        };
      });
      return daysData;
    };

    const filterSoldItemsPerDay = (myDay) => {
      const allDays = soldData && translateToDays(soldData);

      if (allDays && allDays.length > 0) {
        const day = allDays.filter((day) => day.day === myDay);
        return day;
      }
    };

    // get array of sold amounts per current dish and per day
    const matchDayToDish = (stringDay) => {
      const soldOnDay = filterSoldItemsPerDay(stringDay);

      const dishData = soldOnDay && soldOnDay.map((day) => day.sold).flat();

      const matchToDish =
        dishData &&
        dish &&
        dishData
          .map((record) => {
            if (record.dishId !== dish._id) {
              return null;
            }
            return record.sold;
          })
          .filter((i) => i !== null);

      return matchToDish;
    };

    const calculateParlevels = () => {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const parlevels = days.map((day) => {
        const soldOnDay = matchDayToDish(day);
        const totalAmount = soldOnDay && soldOnDay.reduce(reducer, 0);
        const parlevel =
          soldOnDay && soldOnDay.length > 0
            ? Math.round(totalAmount / soldOnDay.length)
            : 0;

        return {
          day,
          parlevel,
        };
      });

      return parlevels;
    };
    return {
      id: dish._id,
      name: dish.name,
      section: dish.section,
      parlevels: calculateParlevels(),
    };
  });
