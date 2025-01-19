<div class="relative h-inherit">
  <canvas class="absolute top-0" id="bar-chart"></canvas>
</div>

<script lang="ts">
  import type { Chart, ChartConfiguration } from 'chart.js';
  import { onDestroy, onMount } from 'svelte';
  import {
    chartColors,
    createLinearGradientTwo,
    createRandomData,
    defaultConfigs,
    type AnyObject
  } from 'utils/chartTools';
  import { monthsInYear, yearToDateMonths } from 'utils/formatTools';
  import { theme } from '@/store/theme';

  const previousYears = monthsInYear();
  const chartColorBase = chartColors.blue;

  let isDark = $state(false);

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
              value = Math.ceil(value * 100);
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          ...baseConfig?.plugins?.legend
        },
        tooltip: {
          ...baseConfig?.plugins?.tooltip,
          callbacks: {
            ...baseConfig?.plugins?.tooltip?.callbacks,
            label: function (context: any) {
              let label = '';

              if (label) {
                label += '  ';
              }
              if (context?.parsed.y !== null) {
                const value = context.parsed.y as number;
                label +=
                  (value > 0 ? '+' : '') + (value * 100).toFixed(2) + '%';
              }
              return label;
            }
          }
        }
      }
    };
  };

  let chart: Chart;

  const unsubscribe = theme.subscribe(() => {
    isDark = document.body.classList.contains('dark');
    if (!chart) {
      // This case happens on initial chart load
      return;
    }

    chart.options = options(defaultConfigs(isDark));
    chart.update();
  });

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: previousYears,
      datasets: [
        {
          label: '2017',
          borderWidth: 0,
          fill: false,
          backgroundColor: function (context: AnyObject) {
            const chart = context.chart;

            const { ctx, chartArea } = chart;
            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }

            let element = context.element;

            return createLinearGradientTwo(
              ctx,
              chartArea,
              chartColorBase,
              element
            );
          },
          animation: { ...defaultConfigs().animation },
          borderColor: chartColorBase,
          data: createRandomData(yearToDateMonths().length),
          borderRadius: 5
        },
        {
          label: '2016',
          borderWidth: 0,
          backgroundColor: function (context: AnyObject) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            let element = context.element;

            return createLinearGradientTwo(
              ctx,
              chartArea,
              chartColors.orange,
              element
            );
          },
          animation: { ...defaultConfigs().animation },

          borderColor: chartColors.orange,
          data: createRandomData(12),
          fill: false,
          borderRadius: 5
        }
      ]
    }
  };

  // library that creates chart objects in page
  // init chart
  onMount(async () => {
    let { Chart } = await import('chart.js/auto');

    chart = new Chart('bar-chart', config);

    chart.options = options(defaultConfigs(isDark));
    chart.update();
  });

  onDestroy(unsubscribe);
</script>
