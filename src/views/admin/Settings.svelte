<script>
  // core components
  import CardProfile from "components/Cards/CardProfile.svelte";
  import CardSettings from "components/Cards/CardSettings.svelte";
  import { blur, fly } from "svelte/transition";
  import { blurTransitionInConfig, blurTransitionOutConfig, staggerdTransition } from "utils/animationTools.js";
</script>

<div
out:blur={blurTransitionOutConfig}
in:blur={blurTransitionInConfig}

  class="flex flex-wrap"
>
  <div class="w-full lg:w-8/12 px-4" in:fly={staggerdTransition(0)}>
    <CardSettings />
  </div>
  <div class="w-full lg:w-4/12 px-4" in:fly={staggerdTransition(2)}>
    <CardProfile />
  </div>
</div>
