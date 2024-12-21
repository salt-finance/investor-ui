<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import { blur, fly } from "svelte/transition";
  import {
    blurTransitionInConfig,
    blurTransitionOutConfig,
    staggerdTransition
  } from "utils/animationTools.js";
</script>

<div
  class="flex flex-wrap"
  out:blur|global={blurTransitionOutConfig}
  in:blur|global={blurTransitionInConfig}
>
  <div class="w-full mb-12 px-4" in:fly|global={staggerdTransition(0)}>
    <CardTable />
  </div>
  <div class="w-full mb-12 px-4" in:fly|global={staggerdTransition(2)}>
    <CardTable color="dark" />
  </div>
</div>
