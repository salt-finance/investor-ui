<span class="inline-flex items-center justify-center rounded-full shadow-sm">
  {#if src}
    <img
      alt="..."
      class="h-12 rounded-full aspect-square glass-effect"
      onerror={() => (src = undefined)}
      {src}
    />
  {:else}
    <span
      class="h-12 rounded-full aspect-square glass-effect flex items-center justify-center font-bold"
    >
      {fallBackText?.at(0)?.toUpperCase() ?? 'P'}
    </span>
  {/if}
</span>

<script lang="ts">
  // Props

  let { src, fallBackText } = $props<{
    src?: string;
    fallBackText?: string;
  }>();
</script>
