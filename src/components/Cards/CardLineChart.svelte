<script>
  import { onMount } from "svelte";
  // library that creates chart objects in page
  import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    LogarithmicScale,
    PointElement,
    Tooltip,
  } from "chart.js";

  // init chart
  onMount(async () => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Account 1",
            fill: true,
            backgroundColor: "#4c51bfaf",
            borderColor: "#4c51bf",
            data: [500, 6800, 86000, 74000, 56000, 60000, 87000],
          },
          {
            label: "Account 2",
            backgroundColor: "rgba(12, 200, 132, 0.7)",
            borderColor: "rgb(12, 200, 132)",
            data: [0, 0, -9000, -1400, 99999.34, 67000, 75000],
            fill: true,
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
    var ctx = document.getElementById("line-chart");
    Chart.register([
      LineController,
      LinearScale,
      CategoryScale,
      LogarithmicScale,
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

<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-slate-500 mb-1 text-xs font-semibold">
          Line Chart
        </h6>
        <h2 class="text-xl text-slate-700 font-semibold">Value over time</h2>
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
