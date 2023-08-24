export default function calculateDate(time) {
  time = Math.floor(time / 1000);
  const now = Math.floor(Date.now() / 1000);
  let result = now - time;
  let date;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  
  if (result < minute) {
    if (result === 1) {
      date = "second";
    } else if (result < 5 || (result > 40 && result < 50) || (result > 50 && result < 60)) {
      date = `${result} seconds`;
    } else {
      date = `${result} seconds`;
    }
  } else if (result < hour) {
    result = Math.floor(result / minute);
    if (result === 1) {
      date = "minut";
    } else if (result < 5) {
      date = `${result} minutes`;
    } else {
      date = `${result} minutes`;
    }
  } else if (result < day) {
    result = Math.floor(result / hour);
    if (result === 1) {
      date = "hour";
    } else if (result < 5) {
      date = `${result} hours`;
    } else {
      date = `${result} hours`;
    }
  } else if (result < month) {
    result = Math.floor(result / day);
    if (result === 1) {
      date = "day";
    } else {
      date = `${result} days`;
    }
  } else {
    result = Math.floor(result / month);
    if (result === 1) {
      date = "month";
    } else if (result < 5) {
      date = `${result} months`;
    } else {
      date = `${result} months`;
    }
  }
  date = `${date} ago`;
  return date;
}

