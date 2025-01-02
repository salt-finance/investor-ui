<div class="relative h-48 lg:h-72 xl:h-80">
  <canvas class="absolute top-0" id="pie-chart"></canvas>
</div>

<script lang="ts">
  import type { ChartConfiguration, ScriptableContext } from 'chart.js';
  import { onMount } from 'svelte';
  import type { AnyObject } from 'utils/chartTools';
  import {
    chartColors,
    createLinearGradientTwo,
    createShades,
    getHover
  } from 'utils/chartTools';

  // init chart
  onMount(async () => {
    const ctx = document.getElementById('pie-chart') as HTMLCanvasElement;

    const chartColorBase = chartColors.blue;
    const labels = ['ETFs', 'Bonds', 'Mutual Funds', 'Cash', 'Other'];
    const data = [10, 40, 25, 15, 5].sort((a, b) => b - a);

    const colors = createShades(labels.length, chartColorBase);

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Portfolio',
            borderColor: '#0000',
            backgroundColor: function (context: ScriptableContext<'doughnut'>) {
              let c = colors[context.dataIndex];
              if (!c) {
                return;
              }
              if (context.active) {
                c = getHover(c);
              }

              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return createLinearGradientTwo(ctx, chartArea, c);
            },
            data: data,
            hoverOffset: 20,
            circumference: 90
          }
        ]
      },
      options: {
        animation: { duration: 1000, easing: 'easeInOutCirc' },

        maintainAspectRatio: true,
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
            callbacks: {
              label: function (context: AnyObject) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                  label += '%';
                }
                return label;
              }
            }
          }
        }
      }
    };

    let { Chart, ArcElement, PieController, Tooltip } = await import(
      'chart.js/auto'
    );

    Chart.register([PieController, ArcElement, Tooltip]);
    Chart.defaults.color = '#999';
    Chart.defaults.font.family = 'poppins';
    Chart.defaults.clip = 200;

    new Chart<'pie'>(ctx, config);
  });
</script>
