<div
  class="relative flex justify-center items-end sm:place-items-center h-inherit"
>
  <h3
    class="text-2xl sm:text-3xl md:text-4xl md:font-extralight text-center select-none mb-2 w-full motion-opacity-out-100 opacity-0 duration-500 motion-delay-500 {styleForValue(
      value
    )}"
  >
    {value}%
  </h3>
  <canvas bind:this={canvas} class="bottom-0 md:top-0 absolute"></canvas>
</div>

<script lang="ts">
  import type { Chart, ChartConfiguration, ScriptableContext } from 'chart.js';
  import { onDestroy } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { chartColors, createLinearGradientTwo } from 'utils/chartTools';
  import { theme } from '@/store/theme';
  import { styleForValue } from 'utils/formatTools';

  const labels = ['Profit', 'Loss'];

  let { value } = $props<{
    value: number;
  }>();

  let chart: Chart<'doughnut'>;
  let canvas: HTMLCanvasElement | undefined;

  let mobile = new MediaQuery('max-width: 639px');

  const unsubscribe = theme.subscribe(() => {
    if (!chart) {
      // This case happens on initial chart load
      return;
    }
    chart.update();
  });

  const createOptions = (m: MediaQuery) => {
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

  const createConfig = (
    data: number[],
    colors: string[]
  ): ChartConfiguration<'doughnut'> | undefined => {
    if (data === undefined || colors === undefined) {
      return;
    }
    return {
      type: 'doughnut',
      options: {
        normalized: true,
        radius: '0%',
        clip: 50,
        cutout: 100
      },
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
              duration: 500,
              easing: 'easeInSine'
            },
            hoverOffset: 0
          }
        ]
      }
    };
  };

  export async function show() {
    const { Chart } = await import('chart.js/auto');

    const absolute = Math.abs(value);
    const data = [absolute, absolute > 100 ? 0 : 100 - absolute];
    const colors = [value > 0 ? chartColors.gain : chartColors.loss, '#fff0'];

    const config = createConfig(data, colors);
    if (!config || !canvas) {
      return;
    }
    chart?.destroy();

    chart = new Chart<'doughnut'>(canvas, config);
    chart.options = createOptions(mobile);
    chart.update();
  }

  $effect(() => {
    mobile.current;

    if (!chart) {
      // This case happens on initial chart load
      return;
    }
    chart.options = createOptions(mobile);

    chart.update();
  });
  onDestroy(unsubscribe);
</script>
