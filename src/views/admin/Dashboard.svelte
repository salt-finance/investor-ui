<script>
  // core components
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardPieChart from "components/Cards/CardPieChart.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
  import CardDoghnutChart from "../../components/Cards/CardDoghnutChart.svelte";

  import { blur, fly } from "svelte/transition";
  import { blurTransitionInConfig, blurTransitionOutConfig, staggerdTransition } from "utils/animationTools.js";


</script>

<!--   in:blur={{ amount: 30, delay: 50, duration: 1000 }}
 -->
<div
  in:blur={blurTransitionInConfig}
  out:blur={blurTransitionOutConfig}
>
  <div class="flex flex-wrap">
    <div
      class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"
      in:fly={staggerdTransition(1)}
    >
      <CardLineChart />
    </div>
    <div
      class="w-full xl:w-4/12 px-4"
      in:fly={staggerdTransition(2)}
    >
      <CardPieChart />
    </div>
    <div
      class="w-full xl:w-8/12 px-4"
      in:fly={staggerdTransition(3)}

    >
      <CardBarChart />
    </div>
    <div
      class="w-full xl:w-4/12 px-4"
      in:fly={staggerdTransition(4)}
    >
      <CardDoghnutChart />
    </div>
  </div>
  <div
    class="flex flex-wrap mt-4"
    in:fly={staggerdTransition(4)}
  >
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardPageVisits />
    </div>
    <div
      class="w-full xl:w-4/12 px-4"
      in:fly={staggerdTransition(4)}
    >
      <CardSocialTraffic />
    </div>
  </div>
</div>
