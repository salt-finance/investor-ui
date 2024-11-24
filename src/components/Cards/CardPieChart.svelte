<script>
  import { onMount } from "svelte";
  import {
    chartColors,
    createRadialGradient1,
    createShades,
    getHover,
  } from "utils/chartTools";
  // library that creates chart objects in page

  // init chart
  onMount(async () => {
    let { Chart, ArcElement, PieController, Tooltip } = await import(
      "chart.js/auto"
    );

    var ctx = document.getElementById("pie-chart");

    const chartColorBase = chartColors.blue;
    const labels = ["ETFs", "Bonds", "Mutual Funds", "Cash", "Other"];
    const data = [10, 40, 25, 15, 5].sort((a, b) => b - a);

    const colors = createShades(labels.length, chartColorBase);

    let config = {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Portfolio",
            fill: false,
            borderColor: "#0000",
            backgroundColor: function (context) {
              let c = colors[context.dataIndex];
              if (!c) {
                return;
              }
              if (context.active) {
                c = getHover(c);
              }
              return createRadialGradient1(context, c);
            },
            data: data,
            hoverOffset: 20,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            display: false,
            align: "start",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                  label += "%";
                }
                return label;
              },
            },
          },
        },
      },
    };

    Chart.register([PieController, ArcElement, Tooltip]);
    Chart.defaults.color = "#334155";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 200;

    new Chart(ctx, config);
  });
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
  <div class="rounded-t mb-0 px-4 py-3">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">

        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-black">
          Portfolio distribution by category
        </h6>
        <h2 class="text-neutral-700 text-4xl font-light">Spread</h2>
     
     
      </div>
    </div>
  </div>
  <div class="relative h-48 lg:h-72 xl:h-80">
    <canvas id="pie-chart" class="absolute top-0"></canvas>
  </div>
</div>
