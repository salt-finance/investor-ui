<script>
  import { onMount } from "svelte";
  import { chartColors, createRadialGradient1 } from "utils/chartTools";
  let major = 0;
  onMount(async () => {
    let { Chart, Legend, ArcElement, DoughnutController, Tooltip } =
      await import("chart.js");

    var ctx = document.getElementById("doughnut-chart");

    const labels = ["Profit", "Loss"];
    const factor = 10 - Math.random() * 10;
    major = Math.floor(100 - 10 * factor);

    const data = [major, 100 - major];
    const colors = [major > 50 ? chartColors.green : chartColors.red, "#fff3"];
    let config = {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "% of Trades",
            data: data,
            borderColor: "#fff0",
            backgroundColor: function (context) {
              if(context.dataIndex == 1){
                return colors[context.dataIndex];
              }
              let c = colors[context.dataIndex];
              if (!c) {
                return;
              }

              return createRadialGradient1(context, c);
            },
            hoverOffset: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
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
            dipslay: false,
          },
        },
      },
    };

    Chart.register([DoughnutController, ArcElement, Legend]);

    Chart.defaults.color = "#999";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 100;

    new Chart(ctx, config);
  });
</script>

<div class="relative flex flex-col min-w-0 break-words w-full">
  <div class="mb-0 px-4 py-3">
    <div class="w-full max-w-full flex-grow flex-1">
      <h6 class="uppercase mb-1 text-xs font-extrabold">
        Average return on investment
      </h6>
      <h2 class="text-neutral-700 dark:text-neutral-200 text-4xl font-light">ROI</h2>
    </div>
  </div>
  <div class="relative h-48 lg:h-72 xl:h-80 flex place-items-center">
    <h3
      class:text-emerald-500={major > 50}
      class:text-red-500={0 < major && major < 50}
      class="text-xl md:text-3xl xl:text-5xl font-extralight text-center w-full"
    >
      {major}%
    </h3>
    <canvas id="doughnut-chart" class="absolute top-0"></canvas>
  </div>
</div>
