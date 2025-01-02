<div class="relative h-72 lg:h-72 xl:h-80">
  <canvas class="absolute top-0" id="bar-chart"></canvas>
</div>

<script lang="ts">
  import type { ChartConfiguration, LegendItem } from 'chart.js';
  import { onMount } from 'svelte';
  import {
    chartColors,
    createLinearGradientTwo,
    createRandomData,
    type AnyObject
  } from 'utils/chartTools';
  import { monthsInYear, yearToDateMonths } from 'utils/formatTools';

  // library that creates chart objects in page
  // init chart
  onMount(async () => {
    const previousYears = monthsInYear();
    const chartColorBase = chartColors.blue;

    let config: ChartConfiguration = {
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
            animation: { duration: 1000, delay: 1500, easing: 'easeInOutCirc' },
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
            animation: { duration: 1000, delay: 1000, easing: 'easeInOutCirc' },

            borderColor: chartColors.orange,
            data: createRandomData(12),
            fill: false,
            borderRadius: 5
          }
        ]
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }
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
                      fontColor: 'white',
                      fillStyle: dataset.borderColor ?? 'white',
                      lineWidth: 0,
                      borderRadius: dataset.borderRadius ?? 0
                    };
                  }
                );
              }
            },

            align: 'end'
          },
          tooltip: {
            boxPadding: 10,
            boxHeight: 20,
            boxWidth: 20,
            padding: 20,
            backgroundColor: '#000f',
            titleMarginBottom: 10,
            multiKeyBackground: '#fff0',
            titleFont: {
              size: 18
            },
            bodyFont: {
              size: 16
            },
            bodySpacing: 0,

            callbacks: {
              labelTextColor: function (context) {
                if (context?.parsed?.y !== null && context.parsed.y < 0) {
                  return 'red';
                }
                return 'white';
              },
              label: function (context) {
                let label = context?.dataset?.label || '';

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
        },
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            animate: true,
            border: {
              display: false
            },
            grid: {
              color: '#9992'
            },

            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value) {
                value = value as number;
                value = Math.ceil(value * 100);
                return value + '%';
              }
            }
          }
        }
      },
      type: 'bar'
    };

    let { Chart, BarElement, BarController, Tooltip } = await import(
      'chart.js/auto'
    );
    Chart.register([BarElement, BarController, Tooltip]);

    Chart.defaults.color = '#999';
    Chart.defaults.font.family = 'poppins';
    Chart.defaults.clip = 100;

    const chart = new Chart('bar-chart', config);
    if (!chart) {
      // This case happens on initial chart load
      return;
    }
  });
</script>
