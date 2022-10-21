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

function getMonth(month = dayjs().month()) {

  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  //console.log(`${year} ${month} ${firstDayOfTheMonth}`);

  let currentMonthCount = 0 - firstDayOfTheMonth;
  let numberOfRow = 5;

  //console.log(month + "--------------- firstday: " + firstDayOfTheMonth);
  // set how many rows there wil be
  if (month % 2 === 0 && month <= 6) {
    // checks 31 days months (1-3-5-7)
    //console.log("31 dias");
    if (firstDayOfTheMonth === 0 || firstDayOfTheMonth === 6) {
      //if first day is saturday or sunday then there will be 6 rows
      //console.log("6 rows");
      numberOfRow = 6;
    } else {
      //console.log("5 rows");
      numberOfRow = 5;
    }
  } else if (month % 2 === 1 && month > 6) {
    // checks 31 days months (8-10-12)
    //console.log("31 dias")
    if (firstDayOfTheMonth === 0 || firstDayOfTheMonth === 6) {
      //if first day is saturday or sunday then there will be 6 rows
      //console.log("6 rows");
      numberOfRow = 6;
    } else {
      //console.log("5 rows");
      numberOfRow = 5;
    }
  } else {
    // checks less than 31 days months (2-4-5-6-9-11)
    //console.log("30 días ó febrero");
    if (month === 1) {
      // if it's fabruary
      //console.log(checkLeapYear(year));
      if (checkLeapYear(year)) {
        // if it's a leap year then set 5 rows
        //console.log("5rows");
        numberOfRow = 5;
      } else {
        // if it's not leap year
        if (firstDayOfTheMonth !== 1) {
          // if it's not monday then set 5 rows
          //console.log("5rows");
          numberOfRow = 5;
        } else {
          // if it's monday set 4 rows
          //console.log("4rows");
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

const utils = {
  getMonth,
};

export default utils;
