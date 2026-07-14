const MS_PER_DAY = 24 * 60 * 60 * 1000;

const todayDateOnly = () => new Date().toISOString().slice(0, 10);

const calculateInclusiveDays = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  return Math.floor((to - from) / MS_PER_DAY) + 1;
};

const calculateWorkingHours = (date, checkIn, checkOut) => {
  const start = new Date(`${date}T${checkIn}`);
  const end = new Date(`${date}T${checkOut}`);
  const hours = (end - start) / (60 * 60 * 1000);
  return Number(hours.toFixed(2));
};

module.exports = {
  todayDateOnly,
  calculateInclusiveDays,
  calculateWorkingHours
};
