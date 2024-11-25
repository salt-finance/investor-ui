<script lang="ts">
    import {onMount} from "svelte";
    import {chartColors, createLinearGradient1} from "../../utils/chartTools";
    import {monthsForLocale} from "../../utils/formatTools";
    import {ChartConfiguration, ChartItem} from "chart.js";

    // library that creates chart objects in page
    // init chart
    onMount(async () => {
        let render = document.getElementById("bar-chart");

        const labels = monthsForLocale();
        let chartColorBase = chartColors.blue;


        // let backgroundFill;

        let config: ChartConfiguration = {
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "This year",
                        fill: false,
                        backgroundColor: chartColors.blue,
                        borderColor: chartColors.red,
                        hoverBorderColor: chartColors.red,
                        data: [5000, 6800, 86000, 74000, 56000, 60000, 87000, 99999.34, 67000, 75000, 120000],
                        borderRadius: 5,
                    },
                    {
                        label: "Last year",
                        backgroundColor: chartColors.yellow,
                        borderColor: "#fff0",
                        data: [2000, 5000, 9000, 14000, 99999.34, 67000, 75000, 80000, 85000, 50000, 100000],
                        fill: false,
                        borderRadius: 5,
                    },
                ],
            },
            options: {
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                layout: {
                    padding: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 10,
                    },
                },
                maintainAspectRatio: false,
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
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value) {
                                const val = value as number;

                                value = new Intl.NumberFormat("am-ET", {
                                    currencySign: "standard",
                                    notation: Math.abs(val) > 10000 ? "compact" : "standard",
                                    style: "currency",
                                    currencyDisplay: "symbol",
                                    signDisplay: "never",
                                    currency: "ETB",
                                }).format(val);
                                return value;
                            },
                        },
                    },
                },
            },
            type: "bar",
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


        const chart = new Chart(render as ChartItem, config);
        if (!chart) {
            // This case happens on initial chart load
            return;
        }

        const {ctx, chartArea} = chart;

        if (!chartArea) {
            // This case happens on initial chart load
            return;
        }

        // backgroundFill = createLinearGradient1(ctx, chartArea, chartColorBase);

        // chart.update()
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
