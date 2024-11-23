<script>
  import { onMount } from "svelte";
  import { chartColors, createRadialGradient1, createShades, getHover } from "utils/chartTools";

  onMount(async () => {
    let { Chart, Legend, ArcElement, DoughnutController, Tooltip } =
      await import("chart.js");


    var ctx = document.getElementById("doughnut-chart");
    const chartColorBase = chartColors.purple;
    const labels = ["ETFs", "Mutual Funds", "Cash", "Other", "Other", "Other", "7", "8", "9", "10", "ETFs", "Mutual Funds", "Cash", "Other", "Other", "Other", "7", "8", "9", "10"];
    const data =  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 10];

    const colors = createShades(labels.length, chartColorBase);
    let config = {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "% distribution",
            data: data,
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
            hoverOffset: 20,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            display: false,
            align: "start",
          },
        },
      },
    };

    Chart.register([DoughnutController, ArcElement, Tooltip, Legend]);

    Chart.defaults.color = "#334155";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 100;

    new Chart(ctx, config);
  });
</script>

<div class="relative flex flex-col min-w-0 break-words w-full">
  <div class="mb-0 px-4 py-3">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-semibold">
          Doughnut Chart
        </h6>
        <h2 class="text-neutral-700 text-xl font-semibold">
          Portfolio distribution
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px">
      <canvas id="doughnut-chart"></canvas>
    </div>
  </div>
</div>
