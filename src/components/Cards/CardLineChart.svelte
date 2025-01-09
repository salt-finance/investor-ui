<div class="relative h-60 lg:h-72 xl:h-80">
    <canvas class="absolute top-0" id="line-chart"></canvas>
</div>

<script lang="ts">
    import type {Chart, ChartConfiguration} from "chart.js";
    import {onDestroy, onMount} from "svelte";
    // library that creates chart objects in page

    import {
        chartColors,
        createLinearGradient,
        type AnyObject,
        defaultConfigs
    } from "utils/chartTools";
    import {currencyFormat, dateTimeFormat} from "utils/formatTools";
    import {theme} from "@/store/theme";
    // init chart

    let isDark = $state(false);

    let chart: Chart;


    const startDate = Date.now();
    var latestValue = 4500;

    const generateData = (length: number, startingValue = 450000) => {
        latestValue = startingValue;

        return [...Array(length).keys()].map(() => {
            let factor: number = Math.sin(100000 * Math.random() * Math.random());
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

    let borderFill: string | undefined;
    let backgroundFill: CanvasGradient | undefined;

    const options = (baseConfig: any) => {
        return {
            ...baseConfig,

            scales: {
                ...baseConfig?.scales,

                x: {
                    ...baseConfig?.scales?.x,

                    grid: {
                        display: false
                    }
                },
                y: {

                    ...baseConfig?.scales?.y,

                    ticks: {
                        ...baseConfig?.scales?.y?.ticks,
                        // Include a dollar sign in the ticks
                        callback: function (value: any) {
                            value = value as number;
                            value = currencyFormat({
                                notation: Math.abs(value) >= 10000 ? "compact" : "standard"
                            })(value);

                            return value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    ...baseConfig?.plugins?.tooltip,
                    callbacks: {
                        ...baseConfig?.plugins?.tooltip?.callbacks,
                        label: function (context: any) {
                            let label = "";

                            if (context.parsed.y !== null) {
                                label += currencyFormat({
                                    currencyDisplay: "name"
                                })(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        };
    };
    const unsubscribe = theme.subscribe(() => {
        isDark = document.body.classList.contains("dark");
        if (!chart) {
            // This case happens on initial chart load
            return;
        }

        chart.options = options(defaultConfigs(isDark));
        chart.update();
    });


    const config: ChartConfiguration = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Account 1",

                    fill: true,
                    pointStyle: false,
                    // cubicInterpolationMode: "monotone",
                    tension: 0.5,
                    data: data,
                    animation: {duration: 1000, delay: 200, easing: "easeInOutCirc"},
                    backgroundColor: function (context: AnyObject) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;

                        if (!chartArea) {
                            // This case happens on initial chart load
                            return;
                        }
                        if (backgroundFill === undefined) {
                            backgroundFill = createLinearGradient(
                                ctx,
                                chartArea,
                                chartColorBase
                            );
                        }
                        return backgroundFill;
                    },
                    borderColor: function () {
                        if (borderFill == null) {
                            borderFill = chartColorBase;
                        }
                        return borderFill;
                    }
                }
            ]
        }
    };


    onMount(async () => {
        let ctx = document.getElementById("line-chart") as HTMLCanvasElement;

        let {Chart, Filler, LineController, LineElement, PointElement} =
            await import("chart.js/auto");

        Chart.register([LineController, PointElement, Filler, LineElement]);


        chart = new Chart(ctx, config);

        chart.options = options(defaultConfigs(isDark));
        chart.update();

        const setData = (date: Date) => {
            var values = generateData(2, latestValue);

            var value = values[1];

            var label = dateTimeFormat(date.getTime());
            labels.push(label);
            data.push(value);

            borderFill = undefined;
            backgroundFill = undefined;
            chartColorBase =
                data[data.length - 1] >= data[data.length - 2]
                ? chartColors.gain
                : chartColors.loss;
            chart.update();
        };

        let a = () => setInterval(() => setData(new Date(Date.now())), 5000);
        a();
    });

    onDestroy(unsubscribe);

</script>
