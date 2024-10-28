<script>
  // core components
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardDoghnutChart from "components/Cards/CardDoghnutChart.svelte";
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardPieChart from "components/Cards/CardPieChart.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";

  import { blur, fly } from "svelte/transition";
  import {
    blurTransitionInConfig,
    blurTransitionOutConfig,
    staggerdTransition,
  } from "utils/animationTools.js";
</script>

<!--   in:blur={{ amount: 30, delay: 50, duration: 1000 }}
 -->
<div
  class="w-full"
  in:blur={blurTransitionInConfig}
  out:blur={blurTransitionOutConfig}
>
  <div class="flex flex-row flex-wrap gap-4">
    <div class="w-full md:w-6/12 xl:w-8/12 flex-shrink" in:fly={staggerdTransition(1)}>
      <CardLineChart />
    </div>
    <div class="w-full md:w-5/12 xl:w-3/12 flex-1" in:fly={staggerdTransition(2)}>
      <CardPieChart />
    </div>

    <div class="w-full md:w-6/12 xl:w-8/12 flex-shrink" in:fly={staggerdTransition(3)}>
      <CardBarChart />
    </div>
    <div class="w-full md:w-5/12 xl:w-3/12 flex-1" in:fly={staggerdTransition(4)}>
      <CardDoghnutChart />
    </div>
  </div>
  <div class="flex flex-wrap mt-4" in:fly={staggerdTransition(4)}>
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0">
      <CardPageVisits />
    </div>
    <div class="w-full xl:w-4/12" in:fly={staggerdTransition(4)}>
      <CardSocialTraffic />
    </div>
  </div>
</div>
