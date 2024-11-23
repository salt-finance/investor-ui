<script>
  import { onMount } from "svelte";
  // library that creates chart objects in page

  import { chartColors, createLinearGradient1 } from "utils/chartTools";
  import { monthsForLocale } from "utils/formatTools";

  // init chart
  onMount(async () => {
    let {
      CategoryScale,
      Chart,
      Filler,
      Legend,
      LinearScale,
      LineController,
      LineElement,
      PointElement,
      Tooltip,
    } = await import("chart.js");

    var ctx = document.getElementById("line-chart");

    const labels = monthsForLocale();
    const data = [10, 25, 30, -15, 50, 60, 65, 60, 50, -35, 40].map(
      (n) => n * 1000
    );

    const chartColorBase =
      data[data.length - 1] > data[data.length - 2]
        ? chartColors.green
        : chartColors.red;

    var borderFill;
    var backgroundFill;

    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Account 1",
            fill: true,
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              if (backgroundFill == null) {
                backgroundFill = createLinearGradient1(
                  ctx,
                  chartArea,
                  chartColorBase
                );
              }
              return backgroundFill;
            },
            borderColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              if (borderFill == null) {
                borderFill = createLinearGradient1(
                  ctx,
                  chartArea,
                  chartColorBase,
                  true
                );
              }
              return borderFill;
            },
            data: data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value) {
                value = new Intl.NumberFormat("am-ET", {
                  currencySign: "standard",
                  notation: Math.abs(value) >= 10000 ? "compact" : "standard",
                  style: "currency",
                  currencyDisplay: "symbol",
                  signDisplay: "never",
                  currency: "ETB",
                }).format(value);
                return value;
              },
            },
          },
        },
        plugins: {
          legend: {
            align: "end",
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("am-ET", {
                    style: "currency",
                    currencyDisplay: "name",
                    currency: "ETB",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
      },
    };

    Chart.register([
      LineController,
      LinearScale,
      CategoryScale,
      PointElement,
      Filler,
      LineElement,
      Tooltip,
      Legend,
    ]);

    Chart.defaults.color = "#334155";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 100;

    new Chart(ctx, config);
  });
</script>

<div class="relative flex flex-col min-w-0 break-words w-full">
  <div class="rounded-t mb-0 px-4 py-3">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-semibold">
         Year to Date
        </h6>
        <h2 class="text-xl text-neutral-700 font-semibold">
          Profit / Loss
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <!-- Chart -->
    <div class="relative h-350-px">
      <canvas id="line-chart"></canvas>
    </div>
  </div>
</div>
