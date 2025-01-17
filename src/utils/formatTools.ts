const locale = 'en-US';
// const locale = 'am-ET';
const defaultOptions: Intl.DateTimeFormatOptions = {
  calendar: 'ethiopic',
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
};

const defaultCurrencyOptions: Intl.NumberFormatOptions = {
  currencySign: 'standard',
  notation: 'standard',
  style: 'currency',
  currencyDisplay: 'symbol',
  signDisplay: 'never',
  currency: 'ETB'
};

export const decimalFormat = (options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    ...options
  }).format;

export const currencyFormat = (options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, {
    ...defaultCurrencyOptions,
    ...options
  }).format;
export const dateTimeFormat = (date: number, options = defaultOptions) => {
  const parts = new Intl.DateTimeFormat(locale, options)
    .formatToParts(date)
    .reduce((acc: Record<string, any>, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  return `${parts.hour}:${parts.minute}`;
};

const monthFormat = new Intl.DateTimeFormat(locale, {
  calendar: 'ethiopic',
  month: 'long'
}).format;
export const yearToDateMonths = () => {
  const currentMonth: number = parseInt(
    Intl.DateTimeFormat(locale, {
      calendar: 'ethiopic',
      month: 'numeric'
    }).format(Date.now())
  );

  // Shift by 3 months to match
  return [...Array(currentMonth - 1).keys()].map((m) =>
    monthFormat(new Date(Date.now()).setMonth(m - 3, m - 10))
  );
};
export const monthsInYear = () => {
  // Shift by 3 months to match

  return [...Array(12).keys()].map((m) => {
    // OFfset by 3 months and 10 Days (Sep, 10)
    return monthFormat(new Date(Date.now()).setMonth(m - 3, m - 10));
  });
};
