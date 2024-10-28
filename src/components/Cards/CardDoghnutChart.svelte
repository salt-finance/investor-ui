<script>
  import { onMount } from "svelte";

  onMount(async () => {
    let config = {
      type: "doughnut",
      data: {
        labels: [
          "Security 1",
          "Security 2",
          "Security 3",
          "Security 4",
          "Security 5",
        ],
        datasets: [
          {
            label: "% distribution",
            data: [12, 28, 20, 10, 30],
            backgroundColor: [
              "#4c51bf",
              "#ed64a6",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(12, 200, 132)",
            ],
            hoverOffset: 40,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
          padding: {
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            align: "start",
          },
        },
      },
    };
    var ctx = document.getElementById("doughnut-chart");

    let { Chart, Legend, ArcElement, DoughnutController, Tooltip } =
      await import("chart.js");
    Chart.register([DoughnutController, ArcElement, Tooltip, Legend]);

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
          Doughnut Chart
        </h6>
        <h2 class="text-neutral-700 text-xl font-semibold">
          Security distribution
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
