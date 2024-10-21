<script>
  // core components
  import CardProfile from "components/Cards/CardProfile.svelte";
  import CardSettings from "components/Cards/CardSettings.svelte";
</script>

<div class="flex flex-wrap">
  <div class="w-full lg:w-8/12 px-4">
    <CardSettings />
  </div>
  <div class="w-full lg:w-4/12 px-4">
    <CardProfile />
  </div>
</div>
