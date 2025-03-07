<div class="relative h-48 lg:h-72 xl:h-80">
  <canvas class="absolute bottom-0" id="pie-chart"></canvas>
</div>

<script lang="ts">
  import type { ChartConfiguration, ScriptableContext } from 'chart.js';
  import { onMount } from 'svelte';
  import { type AnyObject, defaultConfigs } from 'utils/chartTools';
  import {
    chartColors,
    createLinearGradientTwo,
    createShades,
    getHover
  } from 'utils/chartTools';

  // init chart
  onMount(async () => {
    const ctx = document.getElementById('pie-chart') as HTMLCanvasElement;
    const baseConfig = defaultConfigs(true);

    const chartColorBase = chartColors.blue;
    const labels = ['ETFs', 'Bonds', 'Mutual Funds', 'Cash', 'Other'];
    const data = [10, 40, 25, 15, 5].sort((a, b) => b - a);

    const colors = createShades(labels.length, chartColorBase);

    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Portfolio',
            borderWidth: 0,
            borderColor: function (context: ScriptableContext<'doughnut'>) {
              return colors[context.dataIndex];
            },
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
        ...baseConfig,
        interaction: {
          mode: 'index',
          intersect: true
        },
        layout: {
          autoPadding: false,
          padding: {
            top: 20,
            right: 0
          }
        },
        maintainAspectRatio: true,
        scales: {},
        plugins: {
          ...baseConfig?.plugins,
          legend: {
            display: false
          },
          tooltip: {
            ...baseConfig?.plugins?.tooltip,

            bodyFont: {
              size: 14,
              weight: 'bold'
            },
            callbacks: {
              ...baseConfig?.plugins?.tooltip?.callbacks,
              label: function (context: AnyObject) {
                let label = '';

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

    let { Chart } = await import('chart.js/auto');

    Chart.defaults.color = '#999';
    Chart.defaults.font.family = 'poppins';

    new Chart<'pie'>(ctx, config as ChartConfiguration<'pie'>);
  });
</script>
