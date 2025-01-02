<div
  class="relative flex justify-center items-end sm:place-items-center h-40 sm:h-80"
>
  <h3
    class:text-emerald-500={major > 50}
    class:text-red-500={major > 0 && major <= 50}
    class="text-3xl md:text-4xl lg:text-5xl md:font-extralight text-center select-none pb-2 w-full"
  >
    {major}%
  </h3>
  <canvas id="doughnut-chart" class="bottom-0 md:top-0 sm:p-4 absolute"
  ></canvas>
</div>

<script lang="ts">
  import type { ChartConfiguration, ScriptableContext } from 'chart.js';
  import { onMount } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { chartColors, createLinearGradientTwo } from 'utils/chartTools';

  let major = $state(0);
  onMount(async () => {
    const ctx = document.getElementById('doughnut-chart') as HTMLCanvasElement;

    const labels = ['Profit', 'Loss'];
    const factor = 10 - Math.random() * 10;
    major = Math.floor(100 - 10 * factor);
    // major = 100;

    const data = [major, 100 - major];
    const colors = [major > 50 ? chartColors.gain : chartColors.loss, '#fff0'];
    let mobile = new MediaQuery('max-width: 639px');

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
              // duration: function (context) {
              //   return context.dataIndex === 1 ? 1000 : 1000;
              // },
              // delay: function (context) {
              //   return context.dataIndex === 1 ? 1500 : 1500;
              // },
              easing: 'easeOutCirc'
            },
            hoverOffset: 0
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        rotation: mobile.current ? -90 : 0,
        aspectRatio: mobile.current ? 2 : 1,
        circumference: mobile.current ? 180 : 360,

        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            display: false,
            align: 'start'
          },
          tooltip: {
            enabled: false
          }
        }
      }
    };

    const { Chart, ArcElement, DoughnutController } = await import(
      'chart.js/auto'
    );
    Chart.register([DoughnutController, ArcElement]);

    Chart.defaults.color = '#999';
    Chart.defaults.font.family = 'poppins';
    Chart.defaults.clip = 100;
    new Chart<'doughnut'>(ctx, config);
  });
</script>
