export const monthsForLocale = (localeName = "am-ET", monthFormat = "long") => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat })
    .format;
  const currentMonth = new Date(Date.now());
   return [...Array(currentMonth.getMonth() + 1).keys()].map((m) =>
    format(new Date(Date.UTC(2000, m, 1, 0, 0, 0)))
  );
};

