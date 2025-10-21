let userInput = document.querySelector("#date");
userInput.max = new Date().toISOString().split("T")[0];

let result = document.querySelector(".result");
let ageDetail = document.querySelector(".age-detail");

function calculateAge() {
  console.log(userInput.value);
  let birthDate = new Date(userInput.value);

  let d1 = birthDate.getDate();
  let m1 = birthDate.getMonth() + 1;
  let y1 = birthDate.getFullYear();

  console.log(d1, m1, y1);

  let today = new Date();

  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();
  let h = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  console.log(d2, m2, y2, h, min, sec);

  let d3, m3, y3;

  y3 = y2 - y1;

  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }

  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;
    d3 = getDaysInMonth(y1, m1) + d2 - d1;
  }

  if (m3 < 0) {
    m3 = 11;
    y3--;
  }

  if (userInput.value != "") {
    userInput.style.border = "none";
    result.style.display = "block";
    result.innerHTML = `You are <span>${y3}</span> years , <span>${m3}</span> months and <span>${d3}</span> days old.`;

    const ageInYears = y3;
    const ageInMonths = y3 * 12 + m3;
    const ageInDays = y3 * 365 + d3;
    const ageInHours = ageInDays * 24 + h;
    const ageInMinutes = ageInHours * 60 + min;
    const ageInSeconds = ageInMinutes * 60 + sec;

    ageDetail.style.display = "block";
    ageDetail.innerHTML = `Your age in Years : <span>${ageInYears}</span>.<br>Your age in Months : <span>${ageInMonths}</span>.<br>Your age in Days : <span>${ageInDays}</span>.<br>Your age in Hours : <span>${ageInHours}</span>.<br>Your age in Minutes : <span>${ageInMinutes}</span>.<br>Your age in Seconds : <span>${ageInSeconds}</span>.`;
  } else {
    userInput.style.border = "2px solid red";
    result.style.display = "none";
    ageDetail.style.display = "none";
  }
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
