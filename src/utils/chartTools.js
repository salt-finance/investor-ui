import { Color } from "@kurkle/color";

// Colors defined should have 100% saturation and 50% lightness as they will be rotated hue wise.
export const chartColors = {
  red: "hsl(0,100%, 50%)",
  orange: "rgb(255, 159, 64)",
  yellow: "#84CC16",
  green: "#10B981",
  blue: "hsl(224, 100%, 50%)",
  purple: "hsl(260, 100%, 50%)",
  grey: "rgb(201, 203, 207)",
};

export const getHover = (color) => {
  return new Color(color).lighten(0.3).saturate(1).rgbString();
};

/* 
Rotate hue by index.
i = 0 => no rotation
i = 1 => 360degrees/n
i = n => 360degrees/n * n

*/

export const createShades = (length, chartColorBase) => {
  let colors = [];
  for (let index = 0; index < length; index++) {
    // Darken then lighten color by 1/ratioMultplier increments.
    // Eg: ratioMultiplier = 5 => [0, 0.2, 0.4, 0.6, 0.8, 0.76, 0.56, 0.36, 0.16, 0.04, 0] And this pattern will repeat generating shades that are 1/5 increments, and smoothly transition from dark -> light -> dark
    const ratioMultiplier = 4;
    const ratioMultiplierMod = ratioMultiplier - 1;
    const indexRatio = Math.floor(index / ratioMultiplier);
    const indexInSubGroup = index % ratioMultiplier;
    const direction = indexRatio % 2;
    const multiplier = Math.abs(
      ratioMultiplierMod * direction -
        indexInSubGroup -
        direction / ratioMultiplier
    ).toPrecision(3);

    const darkenRatio = ((1 / ratioMultiplier) * multiplier).toPrecision(3);
    const color = new Color(chartColorBase)
      .rotate((360 / length) * index)
      .darken(darkenRatio).saturate(1);

    colors.push(color.hslString());
  }
  return colors;
};

export const createRadialGradient1 = (context, c1) => {
  const chart = context?.chart;

  if (!chart) {
    // This case happens on initial chart load
    return;
  }

  const chartArea = chart.chartArea;
  if (!chartArea) {
    return;
  }
  const centerX = (chartArea.left + chartArea.right) / 2;
  const centerY = (chartArea.top + chartArea.bottom) / 2;
  const r = Math.min(
    (chartArea.right - chartArea.left) / 2,
    (chartArea.bottom - chartArea.top) / 2
  );
  const ctx = chart.ctx;
  const c = new Color(c1);
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    r
  );
  gradient.addColorStop(0, c.opaquer(1).rgbString());
  gradient.addColorStop(0.85, c.alpha(0.6).rgbString()); 
  gradient.addColorStop(1, c.alpha(0.6).rgbString());
  // gradient.addColorStop(1, c.clearer(0.5).rgbString());

  return gradient;
};

export const createLinearGradient1 = (ctx, chartArea, c1, reverse) => {
  reverse ??= false;
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  const c = new Color(c1);

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(reverse ? 1 :0, c.rgbString());
    gradient.addColorStop(reverse ? 0 : 1, c.alpha(0.2).rgbString());
  }

  return gradient;
}