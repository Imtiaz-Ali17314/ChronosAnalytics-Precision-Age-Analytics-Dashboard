const userInput = document.querySelector("#date");
const analyticsPortal = document.querySelector("#analytics-portal");
const calculateBtn = document.querySelector("#calculate-btn");

// DOM Elements for Metrics
const yearsVal = document.querySelector("#years-val");
const monthsVal = document.querySelector("#months-val");
const daysVal = document.querySelector("#days-val");
const totalMonthsNum = document.querySelector("#total-months");
const totalWeeksNum = document.querySelector("#total-weeks");
const totalDaysNum = document.querySelector("#total-days");
const totalHoursNum = document.querySelector("#total-hours");
const nextBirthdayCountdown = document.querySelector("#next-birthday-countdown");
const zodiacLabel = document.querySelector("#zodiac-val");
const birthDayName = document.querySelector("#birth-day-name");
const leapYearsCount = document.querySelector("#leap-years");

// Prevent future dates
userInput.max = new Date().toISOString().split("T")[0];

function calculateAge() {
  const birthValue = userInput.value;
  if (!birthValue) {
    userInput.classList.add("error");
    return;
  }
  userInput.classList.remove("error");

  const birthDate = new Date(birthValue);
  const today = new Date();

  // Basic Calculation
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += getDaysInMonth(today.getFullYear(), today.getMonth());
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Visual Progression
  renderResults(years, months, days, birthDate, today);
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function renderResults(y, m, d, birthDate, today) {
  // Show Portal
  analyticsPortal.classList.remove("hidden");
  analyticsPortal.classList.add("reveal-entry");

  // Animate Primary Values
  animateNumber(yearsVal, 0, y, 1000);
  animateNumber(monthsVal, 0, m, 1000);
  animateNumber(daysVal, 0, d, 1000);

  // Advanced Stats
  const diffMs = Math.abs(today - birthDate);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = (y * 12) + m;
  const diffHours = diffDays * 24;

  animateNumber(totalMonthsNum, 0, diffMonths, 1200);
  animateNumber(totalWeeksNum, 0, diffWeeks, 1200);
  animateNumber(totalDaysNum, 0, diffDays, 1200);
  animateNumber(totalHoursNum, 0, diffHours, 1200);

  // Next Birthday
  const next = calculateNextBirthday(birthDate, today);
  nextBirthdayCountdown.textContent = `${next.m}m ${next.d}d left`;

  // Zodiac
  zodiacLabel.textContent = getZodiac(birthDate.getDate(), birthDate.getMonth() + 1);

  // Pro Stats
  birthDayName.textContent = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
  leapYearsCount.textContent = countLeapYears(birthDate.getFullYear(), today.getFullYear());
}

function animateNumber(element, start, end, duration) {
  let startTime = null;
  const runner = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) window.requestAnimationFrame(runner);
  };
  window.requestAnimationFrame(runner);
}

function calculateNextBirthday(birth, now) {
  let year = now.getFullYear();
  let next = new Date(year, birth.getMonth(), birth.getDate());
  if (now > next) next = new Date(year + 1, birth.getMonth(), birth.getDate());

  const diff = next - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { m: Math.floor(days / 30.44), d: Math.floor(days % 30.44) };
}

function getZodiac(day, month) {
  const zodiacs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
  const cutoff = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 31];
  return day <= cutoff[month - 1] ? zodiacs[month - 1] : zodiacs[month];
}

function countLeapYears(start, end) {
  let count = 0;
  for (let year = start; year <= end; year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) count++;
  }
  return count;
}
