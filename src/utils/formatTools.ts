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

export const dateOfBirthFormat = (value: Date | number) => {
  let parsed = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(value);
  return parsed[4].value + '-' + parsed[2].value + '-' + parsed[0].value;
};


export const parsedDate = (date: string) => {
const value = Date.parse(date);
  let parsed = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(value);
  return parsed[4].value + '-' + parsed[2].value + '-' + parsed[0].value;
};

const defaultCurrencyOptions: Intl.NumberFormatOptions = {
  currencySign: 'standard',
  notation: 'standard',
  style: 'currency',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 2,
  signDisplay: 'negative',
  currency: 'ETB'
};

export const decimalFormat = (options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    ...options
  }).format;

export const formatPercentage = (value?: number) => {
  if (value === undefined || value === null) {
    return '--';
  }
  return decimalFormat({ signDisplay: 'exceptZero' })(value * 100) + '%';
};

export const formatCurrencyWithNotation = (value?: number) => {
  if (value === undefined || value === null) {
    return '--';
  }
  return currencyFormat({
    notation: Math.abs(value) >= 1000000 ? 'compact' : 'standard'
  })(value);
};

export const currencyFormat = (options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, {
    ...defaultCurrencyOptions,
    ...options
  }).format;
export const dateTimeFormat = (date: number, options = defaultOptions) => {
  const parts = new Intl.DateTimeFormat(locale, {
    ...options,
    second: 'numeric'
  })
    .formatToParts(date)
    .reduce((acc: Record<string, any>, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
  return `${parts.hour}:${parts.minute}:${parts.second}`;
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

export const styleForValue = (value?: number) => {
  if (!value) {
    return ''
  }

  return value < 0 ? 'text-loss' : 'text-gain'
}
