<script>
    import {onMount} from "svelte";
    // library that creates chart objects in page

    import {chartColors, createLinearGradient1} from "utils/chartTools";
    import {dateTimeFormat} from "utils/formatTools";
    // init chart
    onMount(async () => {

        var ctx = document.getElementById("line-chart");

        // var labels = monthsForLocale();
        // var data = [10, 25, 30, -15, 50, 60, 65, 60, 50, -35, 40, 60].map(
        //   (n) => n * 1000
        // );
        const startDate = Date.now();
        var latestValue = 4500;

        const generateData = (length, startingValue = 450000) => {
            latestValue = startingValue;

            return [...Array(length).keys()].map(() => {
                var factor = Math.sin(100000 * Math.random() * Math.random()).toFixed(
                    1
                );
                var value = latestValue;

                value = Math.floor(latestValue + factor * 5000);
                latestValue = value;

                return value;
            });
        };

        var defaultLength = 15;
        var data = generateData(defaultLength).reverse();

        var labels = [...Array(defaultLength).keys()]
            .map((i) => dateTimeFormat(startDate - defaultLength * 1000 * i))
            .reverse();
        var chartColorBase = chartColors.grey;

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
                        pointStyle: false,
                        // cubicInterpolationMode: "monotone",
                        data: data,
                        backgroundColor: function (context) {
                            const chart = context.chart;
                            const {ctx, chartArea} = chart;

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
                            const {ctx, chartArea} = chart;

                            if (!chartArea) {
                                // This case happens on initial chart load
                                return;
                            }
                            if (borderFill == null) {
                                borderFill = chartColorBase;
                            }
                            return borderFill;
                        },
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
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
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
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

        let {
            Chart,
            Filler,
            LineController,
            LineElement,
            PointElement,
        } = await import(
            "chart.js/auto"
            );

        Chart.register([
            LineController,
            PointElement,
            Filler,
            LineElement
        ]);

        Chart.defaults.color = "#999";
        Chart.defaults.font.family = "poppins";
        Chart.defaults.clip = 100;

        const chart = new Chart(ctx, config);
        const setData = (date) => {
            var values = generateData(2, latestValue);

            var value = values[1];

            var label = dateTimeFormat(date.getTime());
            labels.push(label);
            data.push(value);

            borderFill = null;
            backgroundFill = null;
            chartColorBase =
                data[data.length - 1] >= data[data.length - 2]
                    ? chartColors.green
                    : chartColors.red;
            chart.update();
        };

        let a = () => setInterval(() => setData(new Date(Date.now())), 5000);
        a();
    });
</script>


<div class="relative h-48 lg:h-72 xl:h-80">
    <canvas id="line-chart" class="absolute top-0"></canvas>
</div>
