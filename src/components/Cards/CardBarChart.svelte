<script>
  import { onMount } from "svelte";
  import { chartColors, createLinearGradient1 } from "utils/chartTools";
  import { monthsForLocale } from "utils/formatTools";
  // library that creates chart objects in page
  // init chart
  onMount(async () => {
    var ctx = document.getElementById("bar-chart");

    const labels = monthsForLocale();
    var chartColorBase = chartColors.blue;
  

    var backgroundFill;
    var backgroundFill2;




    let config = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Account 1",
            fill: false,
            backgroundColor: backgroundFill,
            borderColor: "#fff0",
            data: [500, 6800, 86000, 74000, 56000, 60000, 87000],
            borderRadius: Number.MAX_VALUE,
          },
          {
            label: "Account 2",
            backgroundColor: backgroundFill,
            borderColor: "#fff0",
            data: [0, 0, 9000, 1400, 99999.34, 67000, 75000],
            fill: false,
            borderRadius: Number.MAX_VALUE,
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

    
    const chart = Chart(context, config);


    console.log(context);
    console.log(chart);
    if (!chart) {
      // This case happens on initial chart load
      return;
    }
    
    const { context, chartArea } = chart;
    if (!chartArea) {
      // This case happens on initial chart load
      return;
    }
    if (backgroundFill == null) {
      backgroundFill = createLinearGradient1(ctx, chartArea, chartColorBase);
    }
  });
</script>

<div class="relative flex flex-col min-w-0 break-words rounded-lg">
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-neutral-500 mb-1 text-xs font-black">
          Performance vs Previous year
        </h6>
        <h2 class="text-neutral-700 text-4xl font-light">Comparison</h2>
      </div>
    </div>
  </div>
  <div class="relative h-48 lg:h-72 xl:h-80">
    <canvas id="bar-chart" class="absolute top-0"></canvas>
  </div>
</div>
