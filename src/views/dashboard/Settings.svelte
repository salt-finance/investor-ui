<script>
  // core components
  import CardProfile from "components/Cards/CardProfile.svelte";
  import CardSettings from "components/Cards/CardSettings.svelte";
  import { blur, fly } from "svelte/transition";
  import { blurTransitionInConfig, blurTransitionOutConfig, staggerdTransition } from "utils/animationTools.js";
</script>

<div
out:blur|global={blurTransitionOutConfig}
in:blur|global={blurTransitionInConfig}

  class="flex flex-wrap gap-4 flex-col-reverse lg:flex-row"
>
  <div class="w-full lg:w-6/12" in:fly|global={staggerdTransition(0)}>
    <CardSettings />
  </div>
  <div class="w-full flex-grow lg:w-5/12" in:fly|global={staggerdTransition(2)}>
    <CardProfile />
  </div>
</div>
