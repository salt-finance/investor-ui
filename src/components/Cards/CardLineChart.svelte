<div class="relative h-inherit">
  <canvas bind:this={chartCanvas} class="absolute top-0"></canvas>
</div>

<script lang="ts">
  import type { Chart, ChartConfiguration } from 'chart.js';
  import { onDestroy } from 'svelte';

  import {
    chartColors,
    createLinearGradient,
    type AnyObject,
    defaultConfigs
  } from 'utils/chartTools';
  import { currencyFormat, dateTimeFormat } from 'utils/formatTools';
  import { theme } from '@/store/theme';
  // init chart

  let isDark = $state(false);

  let chart: Chart | undefined;

  const startDate = Date.now();
  var latestValue = 4500;

  const generateData = (length: number, startingValue = 450000) => {
    latestValue = startingValue;

    return [...Array(length).keys()].map(() => {
      let factor: number = Math.sin(100000 * Math.random() * Math.random());
      var value = latestValue;

      value = Math.floor(latestValue + factor * 5000);
      latestValue = value;

      return value;
    });
  };

  var defaultLength = 10;
  var data = generateData(defaultLength).reverse();

  var labels = [...Array(defaultLength).keys()]
    .map((i) => dateTimeFormat(startDate - defaultLength * 1000 * i))
    .reverse();
  var chartColorBase = chartColors.grey;

  let borderFill: string | undefined;
  let backgroundFill: CanvasGradient | undefined;

  const options = (baseConfig: any) => {
    return {
      ...baseConfig,

      scales: {
        ...baseConfig?.scales,

        x: {
          ...baseConfig?.scales?.x,

          grid: {
            display: false
          }
        },
        y: {
          ...baseConfig?.scales?.y,

          ticks: {
            ...baseConfig?.scales?.y?.ticks,
            // Include a dollar sign in the ticks
            callback: function (value: any) {
              value = value as number;
              value = currencyFormat({
                notation: Math.abs(value) >= 10000 ? 'compact' : 'standard'
              })(value);

              return value;
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          ...baseConfig?.plugins?.tooltip,
          callbacks: {
            ...baseConfig?.plugins?.tooltip?.callbacks,
            label: function (context: any) {
              let label = '';

              if (context.parsed.y !== null) {
                label += currencyFormat({
                  currencyDisplay: 'name'
                })(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
  };
  const unsubscribe = theme.subscribe(() => {
    updateDarkLight();
  });

  function updateDarkLight() {
    isDark = document.body.classList.contains('dark');
    if (!chart) {
      // This case happens on initial chart load
      return;
    }

    chart.options = options(defaultConfigs(isDark));
    chart.update();
  }

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Account 1',

          fill: true,
          pointStyle: false,
          // cubicInterpolationMode: "monotone",
          tension: 0.1,
          data: data,
          // animation: false,
          animation: defaultConfigs().animation,
          backgroundColor: function (context: AnyObject) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            if (backgroundFill === undefined) {
              backgroundFill = createLinearGradient(
                ctx,
                chartArea,
                chartColorBase
              );
            }
            return backgroundFill;
          },
          borderColor: function () {
            if (borderFill == null) {
              borderFill = chartColorBase;
            }
            return borderFill;
          }
        }
      ]
    }
  };

  const setData = (date: Date) => {
    var values = generateData(2, latestValue);

    var value = values[1];

    var label = dateTimeFormat(date.getTime());
    labels.push(label);
    data.push(value);

    borderFill = undefined;
    backgroundFill = undefined;
    chartColorBase =
      data[data.length - 1] >= data[data.length - 2]
        ? chartColors.gain
        : chartColors.loss;
    chart?.update();
  };

  let a: NodeJS.Timeout | undefined;

  let chartCanvas: HTMLCanvasElement;

  export async function show() {
    let { Chart, Filler, LineController, LineElement, PointElement } =
      await import('chart.js/auto');

    Chart.register([LineController, PointElement, Filler, LineElement]);

    chart = new Chart(chartCanvas, config);

    chart.options = options(defaultConfigs(isDark));
    chart.update();
    updateDarkLight();
    a = setInterval(() => setData(new Date(Date.now())), 5000);
  }

  export async function destroy() {
    unsubscribe();
    if (a !== undefined) {
      clearInterval(a);
      a = undefined;
    }

    console.log('cahrt destroy');

    chart?.destroy();
    chart = undefined;
  }

  onDestroy(() => {
    destroy();
  });
</script>
