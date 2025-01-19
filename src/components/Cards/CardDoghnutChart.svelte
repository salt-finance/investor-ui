<div
  class="relative flex justify-center items-end sm:place-items-center h-inherit"
>
  <h3
    class:text-emerald-500={major > 50}
    class:text-red-500={major > 0 && major <= 50}
    class="text-2xl sm:text-3xl md:text-4xl md:font-extralight text-center select-none mb-2 w-full"
  >
    {major}%
  </h3>
  <canvas id="doughnut-chart" class="bottom-0 md:top-0 absolute"></canvas>
</div>

<script lang="ts">
  import type { Chart, ChartConfiguration, ScriptableContext } from 'chart.js';
  import { onDestroy, onMount } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { chartColors, createLinearGradientTwo } from 'utils/chartTools';
  import { theme } from '@/store/theme';

  const labels = ['Profit', 'Loss'];
  const factor = 10 - Math.random() * 10;
  const major = Math.floor(100 - 10 * factor);

  const data = [major, 100 - major];
  const colors = [major > 50 ? chartColors.gain : chartColors.loss, '#fff0'];
  let mobile = new MediaQuery('max-width: 639px');

  let chart: Chart;

  const unsubscribe = theme.subscribe(() => {
    if (!chart) {
      // This case happens on initial chart load
      return;
    }
    chart.update();
  });

  const options = (m: MediaQuery) => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      rotation: m.current ? -90 : 0,
      aspectRatio: m.current ? 2 : 1,
      circumference: m.current ? 180 : 360,

      layout: {
        padding: 0
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    };
  };

  $effect(() => {
    mobile.current;

    if (!chart) {
      // This case happens on initial chart load
      return;
    }
    chart.options = options(mobile);

    chart.update();
  });
  onMount(async () => {
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: '% of Trades',
            data: data,
            borderColor: function (context: ScriptableContext<'doughnut'>) {
              if (context.dataIndex === 1) {
                return document.body.classList.contains('dark')
                  ? '#fff5'
                  : '#0005';
              }
              return '#0000';
            },
            borderAlign: 'inner',
            borderWidth: 1,

            backgroundColor: function (context: ScriptableContext<'doughnut'>) {
              let c = colors[context.dataIndex];
              if (!c) {
                return;
              }

              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return createLinearGradientTwo(
                ctx,
                chartArea,
                c,
                undefined,
                false
              );
            },
            // animation: undefined,
            animation: {
              duration: 1000,
              delay: 1500,
              easing: 'easeOutCirc'
            },
            hoverOffset: 0
          }
        ]
      }
    };

    const { Chart } = await import('chart.js/auto');

    chart = new Chart<'doughnut'>('doughnut-chart', config);
    chart.options = options(mobile);
    chart.update();
  });

  onDestroy(unsubscribe);
</script>
