import dayjs from "dayjs";

function checkLeapYear(year) {
  // check if this is a leap year

  //three conditions to find out the leap year
  if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
    return true;
  } else {
    return false;
  }
}

function getCalendarMonth(month = dayjs().month()) {
  const year = dayjs().year();

  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth;
  let numberOfRow = 5;

  // set how many rows there wil be
  if (month % 2 === 0 && month <= 6) {
    // checks 31 days months (1-3-5-7)
    if (firstDayOfTheMonth === 0 || firstDayOfTheMonth === 6) {
      //if first day is saturday or sunday then there will be 6 rows
      numberOfRow = 6;
    } else {
      numberOfRow = 5;
    }
  } else if (month % 2 === 1 && month > 6) {
    // checks 31 days months (8-10-12)
    if (firstDayOfTheMonth === 0 || firstDayOfTheMonth === 6) {
      //if first day is saturday or sunday then there will be 6 rows
      numberOfRow = 6;
    } else {
      numberOfRow = 5;
    }
  } else {
    // checks less than 31 days months (2-4-5-6-9-11)
    if (month === 1) {
      // if it's fabruary
      if (checkLeapYear(year)) {
        // if it's a leap year then set 5 rows
        numberOfRow = 5;
      } else {
        // if it's not leap year
        if (firstDayOfTheMonth !== 1) {
          // if it's not monday then set 5 rows
          numberOfRow = 5;
        } else {
          // if it's monday set 4 rows
          numberOfRow = 4;
        }
      }
    }
  }

  const daysMatrix = new Array(numberOfRow).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}


function getTicklerMonth(month = dayjs().month()) {
  const year = dayjs().year();
  let dayCount = 0;
  const daysTicklerMatrix = new Array(dayjs().month(month).endOf("M").$D).fill([]).map(() => {
    dayCount++
    return dayjs(new Date(year, month, dayCount));
  });
  return daysTicklerMatrix;
}



const utils = {
  getCalendarMonth,
  getTicklerMonth,
};

export default utils;
