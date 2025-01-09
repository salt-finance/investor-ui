import { Color as kColor } from "@kurkle/color";
import {
  Chart,
  type ChartArea,
  type ChartOptions,
  type Color,
  type LegendItem,
  type TooltipItem,
  type TooltipLabelStyle,
  type TooltipModel,
} from "chart.js";

export type AnyObject = Record<string, any>;

// Colors defined should have 100% saturation and 50% lightness as they will be rotated hue wise.
export const chartColors = {
  orange: "rgb(255, 159, 64)",
  yellow: "#FFC914",
  blue: "hsl(224, 100%, 50%)",
  purple: "hsl(260, 100%, 50%)",
  grey: "rgb(201, 203, 207)",

  loss: "#EF4444",
  gain: "#10B981",
};

export const getHover = (color: string) => {
  return new kColor(color).lighten(0.3).saturate(1).rgbString();
};

/*
 Rotate hue by index.
 i = 0 => no rotation
 i = 1 => 360degrees/n
 i = n => 360degrees/n * n

 */

export const createShades = (
  length: number,
  chartColorBase: string,
): string[] => {
  let colors: string[] = [];
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
        direction / ratioMultiplier,
    );

    const darkenRatio = Math.round((1 / ratioMultiplier) * multiplier * 0.5);
    const color = new kColor(chartColorBase)
      .rotate(360 * Math.sin(index + 1) * index)
      .darken(darkenRatio)
      .saturate(1);

    colors.push(color.hslString());
  }
  return colors;
};

export const createRadialGradient = (
  context: any,
  color: string,
): Color | undefined => {
  const chart: Chart = context?.chart;

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
    (chartArea.bottom - chartArea.top) / 2,
  );
  const ctx = chart.ctx;
  const c = new kColor(color);
  const gradient: CanvasGradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    r,
  );

  gradient.addColorStop(0.4, c.clone().lighten(0.5).rgbString());
  gradient.addColorStop(0.7, c.clone().rgbString());
  gradient.addColorStop(0.9, c.clone().alpha(0).rgbString());

  return gradient;
};

export const createLinearGradient = (
  ctx: AnyObject,
  chartArea: ChartArea,
  c1: string,
  reverse?: boolean,
): CanvasGradient => {
  reverse ??= false;
  let gradient: CanvasGradient;

  const c = new kColor(c1);

  // Create the gradient because this is either the first render
  // or the size of the chart has changed

  gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(reverse ? 1 : 0, c.alpha(0.4).rgbString());
  gradient.addColorStop(reverse ? 0 : 1, c.alpha(0).rgbString());

  return gradient;
};

export const createLinearGradientTwo = (
  ctx: CanvasRenderingContext2D,
  chartArea: ChartArea,
  color: string,
  element?: AnyObject,
  barChart: boolean = true,
): CanvasGradient => {
  let gradient: CanvasGradient;

  const base = new kColor(color);
  const lighter = base.clone().lighten(0.25);
  const darker = base.clone().darken(0.25);

  const elementBase = element?.base;
  // let negative;
  if (barChart) {
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  } else {
    gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      chartArea.right,
      0,
    );
  }

  // let gradientMap = [
  //   { color: lighter, stop: 0.4 },
  //   // { color: base, stop: 0.4 },
  //   { color: darker, stop: 0.6 }
  // ];

  let gradientMap = [
    { color: lighter, stop: 0 },
    { color: base, stop: 0.4 },
    { color: base, stop: 1 },
  ];
  // Positive chart
  if (chartArea.bottom - elementBase <= 1.0) {
    gradientMap = [
      {
        color: base,
        stop: 0,
      },
      {
        color: base,
        stop: 0.9,
      },
      {
        color: lighter,
        stop: 1,
      },
    ];
  }
  // Negative Chart
  if (elementBase - chartArea.top <= 1.0) {
    gradientMap = [
      {
        color: base,
        stop: 1,
      },
      {
        color: base,
        stop: 0.2,
      },
      {
        color: darker,
        stop: 0,
      },
    ];
  }

  // Mixed chart
  if (
    chartArea.bottom - elementBase > 1.0 &&
    elementBase - chartArea.top > 1.0
  ) {
    // Positive in mixed chart.
    gradientMap = [
      {
        color: base,
        stop: 0,
      },
      {
        color: base,
        stop: 0.3,
      },
      {
        color: lighter,
        stop: 0.5,
      },
    ];

    if (element?.$context.raw < 0) {
      // Negative in mix chart
      gradientMap = [
        {
          color: darker,
          stop: 0.5,
        },
        {
          color: base,
          stop: 0.7,
        },
        {
          color: base,
          stop: 1,
        },
      ];
    }
  }

  gradientMap.forEach((stop) => {
    gradient.addColorStop(stop.stop, stop.color.rgbString());
  });
  return gradient;
};

export const createRandomData = (
  length: number,
  max: number = 0.3,
  min: number = 0.05,
  negativeFactor: number = 0.5,
): number[] => {
  return Array(length)
    .keys()
    .map(() => {
      const digits = 4;
      const rand = parseFloat(
        Math.random().toLocaleString([], {
          style: "decimal",
          roundingMode: "ceil",
          maximumFractionDigits: digits,
        }),
      );

      const clamp = Math.min(Math.max(rand, min), max);

      const range = max - min;

      let multiplier;

      if (rand === max || rand === min) {
        // number exactly on range;
        multiplier = rand.toFixed(digits);
      } else if (clamp === max) {
        // number is too large;
        multiplier =
          rand - clamp > range
            ? ((rand % range) + min).toFixed(digits)
            : (min + rand - clamp).toFixed(digits);
      } else if (clamp === min) {
        // number is too small;
        multiplier =
          rand > range
            ? ((rand % range) + min).toFixed(digits)
            : (clamp + rand).toFixed(digits);
      } else {
        // number within range
        multiplier = clamp.toFixed(digits);
      }

      multiplier = parseFloat(multiplier);

      // Set negative factor
      if (rand < negativeFactor) {
        multiplier = multiplier * -1;
      }

      return multiplier;
    })
    .toArray();
};

export const defaultConfigs = (isDark: boolean = false): ChartOptions => {
  const black = new kColor("black");
  const white = new kColor("white");

  const blackText = black.clone().alpha(0.5).rgbString();
  const whiteText = white.clone().alpha(0.7).rgbString();

  const blackLine = black.clone().alpha(0.2).rgbString();
  const whiteLine = white.clone().alpha(0.2).rgbString();

  return {
    animation: { duration: 500, easing: "easeInSine" },

    interaction: {
      mode: "index",
      intersect: false,
    },
    layout: {
      padding: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          generateLabels: function (context) {
            return context.data.datasets.map(
              (dataset: AnyObject): LegendItem => {
                return {
                  text: dataset.label!,
                  fillStyle: dataset.borderColor ?? "white",
                  fontColor: isDark ? whiteText : blackText,
                  lineWidth: 0,
                  borderRadius: dataset.borderRadius ?? 0,
                };
              },
            );
          },
          font: {
            weight: "bold",
          },
        },

        align: "end",
      },
      tooltip: {
        boxPadding: 15,
        boxHeight: 20,
        boxWidth: 20,
        titleSpacing: 40,

        borderWidth: 2,
        borderColor: "#fffa",
        padding: 20,
        backgroundColor: "#000d",
        titleMarginBottom: 10,

        titleFont: {
          size: 16,
          weight: "normal",
        },
        bodyFont: {
          size: 14,
          weight: "bold",
        },
        // usePointStyle: true,

        caretSize: 5,
        cornerRadius: 10,
        bodySpacing: 10,

        callbacks: {
          labelColor: function (
            this: TooltipModel<any>,
            context: TooltipItem<any>,
          ): TooltipLabelStyle {
            let color =
              context.dataset.borderColor !== undefined &&
              typeof context.dataset.borderColor === "function"
                ? context.dataset.borderColor(context, {})
                : (context.dataset.borderColor ?? "white");

            return {
              borderColor: color,
              borderRadius: 10,
              borderWidth: 5,
              backgroundColor: color,
            };
          },

          labelTextColor: function (context) {
            if (context?.parsed?.y !== null && context.parsed.y < 0) {
              return "red";
            }
            return "white";
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        animate: false,
        grid: {
          color: isDark ? whiteLine : blackLine,
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark ? whiteText : blackText,
          maxRotation: 0,

          font: {
            // weight: "bold",
            size: 14,
          },
        },
      },
      y: {
        animate: false,
        border: {
          display: false,
        },
        grid: {
          color: isDark ? whiteLine : blackLine,
        },
        ticks: {
          color: isDark ? whiteText : blackText,
          maxRotation: 0,
          font: {
            weight: "bold",
            size: 14,
          },
        },
      },
    },
  };
};
