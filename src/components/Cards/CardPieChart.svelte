<script>
    import {onMount} from "svelte";
    import {
        chartColors,
        createRadialGradient,
        createShades,
        getHover
    } from "utils/chartTools.ts";


    // init chart
    onMount(async () => {


        var ctx = document.getElementById("pie-chart");

        const chartColorBase = chartColors.blue;
        const labels = ["ETFs", "Bonds", "Mutual Funds", "Cash", "Other"];
        const data = [10, 40, 25, 15, 5].sort((a, b) => b - a);

        const colors = createShades(labels.length, chartColorBase);

        let config = {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Portfolio",
                        fill: false,
                        borderColor: "#0000",
                        backgroundColor: function (context) {
                            let c = colors[context.dataIndex];
                            if (!c) {
                                return;
                            }
                            if (context.active) {
                                c = getHover(c);
                            }
                            return createRadialGradient(context, c);
                        },
                        data: data,
                        hoverOffset: 20
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        align: "start"
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
                            }
                        }
                    }
                }
            }
        };

        let {Chart, ArcElement, PieController, Tooltip} = await import(
            "chart.js/auto"
            );

        Chart.register([PieController, ArcElement, Tooltip]);
        Chart.defaults.color = "#999";
        Chart.defaults.font.family = "poppins";
        Chart.defaults.clip = 200;

        new Chart(ctx, config);
    });
</script>

<div class="relative h-48 lg:h-72 xl:h-80">
    <canvas class="absolute top-0" id="pie-chart"></canvas>
</div>
