<span
  class="inline-flex max-h-full items-center justify-center rounded-full shadow-sm aspect-square"
>
  {#if src}
    <img
      alt="..."
      class="h-auto rounded-full glass-effect"
      onerror={() => (src = undefined)}
      {src}
    />
  {:else}
    <span
      class="h-auto rounded-full glass-effect flex items-center justify-center font-bold"
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
