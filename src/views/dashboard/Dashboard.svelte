<script>
    // core components
    import CardBarChart from "components/Cards/CardBarChart.svelte";
    import CardDoghnutChart from "components/Cards/CardDoghnutChart.svelte";
    import CardLineChart from "components/Cards/CardLineChart.svelte";
    import CardPageVisits from "components/Cards/CardPageVisits.svelte";
    import CardPieChart from "components/Cards/CardPieChart.svelte";
    import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
    import Holdings from "./Holdings.svelte";
    import Activity from "./Activity.svelte";

    import {blur, fly} from "svelte/transition";
    import {blurTransitionInConfig, blurTransitionOutConfig, staggerdTransition,} from "utils/animationTools.js";
</script>

<!--   in:blur={{ amount: 30, delay: 50, duration: 1000 }}
 -->
<div
        class="w-full"
        in:blur={blurTransitionInConfig}
        out:blur={blurTransitionOutConfig}
>
    <div class="flex flex-row flex-wrap gap-4">
        <div class="w-full  md:w-9/12 flex-3  glass-effect rounded-lg"
             in:fly={staggerdTransition(1)}>
            <div class="relative flex flex-col min-w-0 break-words w-full h-full">
                <div class="mb-0 px-4 py-3">
                    <div class="w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase mb-1 font-extrabold">
                            Total value over time
                        </h6>
                        <h2 class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight">
                            Performance
                        </h2>
                    </div>
                </div>
                <CardLineChart/>
            </div>
        </div>
        <div class="w-full md:w-3/12 flex-1 bg-white bg-opacity-80 dark:bg-neutral-950 dark:bg-opacity-40 glass-effect rounded-lg bg-opacity-80"
             in:fly={staggerdTransition(2)}>
            <div class="relative flex flex-col min-w-0 break-words w-full h-full">
                <div class="mb-0 px-4 py-3">
                    <div class="w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase mb-1 font-extrabold"> Portfolio distribution by category
                        </h6>
                        <h2 class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight">Spread</h2>
                    </div>
                </div>
                <CardPieChart/>
            </div>
        </div>

        <div class="w-full md:w-9/12 flex-shrink bg-white bg-opacity-80 dark:bg-neutral-950 dark:bg-opacity-40  glass-effect rounded-lg bg-opacity-80"
             in:fly={staggerdTransition(3)}>
            <div class="relative flex flex-col min-w-0 break-words w-full h-full">
                <div class="mb-0 px-4 py-3">
                    <div class="w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase mb-1 font-extrabold"> Performance vs Previous year
                        </h6>
                        <h2 class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight">Comparison</h2>
                    </div>
                </div>
                <CardBarChart/>
            </div>
        </div>
        <div class="w-full md:w-3/12 flex-1 bg-white bg-opacity-80 dark:bg-neutral-950 dark:bg-opacity-40  glass-effect rounded-lg bg-opacity-80"
             in:fly={staggerdTransition(4)}>
            <div class="relative flex flex-col min-w-0 break-words w-full h-full">
                <div class="mb-0 px-4 py-3">
                    <div class="w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase mb-1 font-extrabold">
                            Average profit to loss ratio
                        </h6>
                        <h2 class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight">Profit/Loss</h2>
                    </div>
                </div>
                <CardDoghnutChart/>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap mt-4 gap-4" in:fly={staggerdTransition(4)}>

        <Activity/>

        <Holdings/>

    </div>
</div>
