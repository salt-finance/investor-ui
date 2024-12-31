<div class="relative h-48 lg:h-72 xl:h-80 flex place-items-center">
  <h3
    class:text-emerald-500={major > 50}
    class:text-red-500={major > 0 && major < 50}
    class="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight text-center w-full select-none"
  >
    {major}%
  </h3>
  <canvas id="doughnut-chart" class="absolute top-0"></canvas>
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import { chartColors, createRadialGradient } from 'utils/chartTools';
  import type { ChartConfiguration, ScriptableContext } from 'chart.js';

  let major = $state(0);
  onMount(async () => {
    const ctx = document.getElementById('doughnut-chart') as HTMLCanvasElement;

    const labels = ['Profit', 'Loss'];
    const factor = 10 - Math.random() * 10;
    major = Math.floor(100 - 10 * factor);

    const data = [major, 100 - major];
    const colors = [major > 50 ? chartColors.green : chartColors.red, '#fff3'];
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: '% of Trades',
            data: data,
            borderColor: '#fff0',
            backgroundColor: function (ctx: ScriptableContext<'doughnut'>) {
              if (ctx.dataIndex === 1) {
                return colors[ctx.dataIndex];
              }
              let c = colors[ctx.dataIndex];
              if (!c) {
                return;
              }

              return createRadialGradient(ctx, c);
            },

            animation: { duration: 1000, delay: 1500, easing: 'easeInOutCirc' },
            hoverOffset: 0
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }
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
