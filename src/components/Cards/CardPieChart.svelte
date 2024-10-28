<script>
  import { onMount } from "svelte";
  // library that creates chart objects in page

  // init chart
  onMount(async () => {
    let config = {
      type: "pie",
      data: {
        labels: ["ETFs", "Mutual Funds", "Cash"],
        datasets: [
          {
            label: "Portfolio",
            fill: false,
            backgroundColor: [
              "#ed64a6",
              "rgb(54, 162, 235)",
              "rgb(12, 200, 132)",
            ],
            data: [40, 30, 30],
            hoverOffset: 40,
          },
          {
            label: "%",
            data: [12, 28, 20, 10, 30],
            backgroundColor: [
              "#4c51bf",
              "#ed64a6",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(12, 200, 132)",
            ],
            hoverOffset: 20,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 10,
          },
        },
        plugins: {
          legend: {
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
    var ctx = document.getElementById("pie-chart");

    let { Chart, Legend, ArcElement, PieController, Tooltip } = await import(
      "chart.js"
    );

    Chart.register([PieController, ArcElement, Tooltip, Legend]);

    Chart.defaults.color = "#334155";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 100;

    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-semibold">
          Security distribution by category
        </h6>
        <h2 class="text-neutral-700 text-xl font-semibold">Pie chart</h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px">
      <canvas id="pie-chart"></canvas>
    </div>
  </div>
</div>
