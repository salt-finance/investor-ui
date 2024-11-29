const locale = "am-ET";
const defaultOptions = {
  calendar: "ethiopic",
  year: "numeric",
  month: "2-digit",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};
export const dateTimeFormat = (date, options = defaultOptions) => {
  const parts = new Intl.DateTimeFormat(locale, options)
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  return `${parts.hour}:${parts.minute}`;
};

const monthFormat = new Intl.DateTimeFormat(locale, {
  calendar: "ethiopic",
  month: "long",
}).format;
export const monthsForLocale = () => {
  const currentMonth = new Date(Date.now());
  return [...Array(currentMonth.getMonth() + 1).keys()].map((m) =>
    monthFormat(new Date(Date.now()).setMonth(m))
  );
};


