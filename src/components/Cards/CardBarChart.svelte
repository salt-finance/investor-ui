<script>
  import { onMount } from "svelte";
  import { monthsForLocale } from "utils/formatTools";
  // library that creates chart objects in page
  // init chart
  onMount(async () => {

    var ctx = document.getElementById("bar-chart");
    var gradientFill = ctx.getContext("2d").createLinearGradient(0, 200, 0, 400);
    gradientFill.addColorStop(0, "#4c51bff0");
    gradientFill.addColorStop(1, "#4c51bf00");

    var gradientFill2 =  ctx.getContext("2d").createLinearGradient(0, 200, 0, 400); 

    gradientFill2.addColorStop(0, "#ed64a6f0");
    gradientFill2.addColorStop(1, "#ed64a600")

    const labels = monthsForLocale();

    let config = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Account 1",
            fill: false,
            backgroundColor: gradientFill,
            borderColor: "#4c51bf",
            data: [500, 6800, 86000, 74000, 56000, 60000, 87000],
            borderRadius: Number.MAX_VALUE,
          },
          {
            label: "Account 2",
            backgroundColor: gradientFill2,
            borderColor: "rgb(12, 200, 132)",
            data: [0, 0, 9000, 1400, 99999.34, 67000, 75000],
            fill: false,
            borderRadius: Number.MAX_VALUE,

          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
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
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    };

    let {
      CategoryScale,
      Chart,
      Legend,
      LinearScale,
      BarElement,
      BarController,
      Tooltip,
    } = await import("chart.js");
    Chart.register([
      LinearScale,
      CategoryScale,
      BarElement,
      BarController,
      Tooltip,
      Legend,
    ]);

    Chart.defaults.color = "#334155";
    Chart.defaults.font.family = "poppins";
    Chart.defaults.clip = 100;

    new Chart(ctx, config);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words rounded-lg"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-semibold">
          Bar Chart
        </h6>
        <h2 class="text-neutral-700 text-xl font-semibold">Portfolio value</h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px">
      <canvas id="bar-chart"></canvas>
    </div>
  </div>
</div>
