<div
  class="flex flex-col w-1/4 gap-4 card p-4 bg-opacity-40 justify-between sector-card"
>
  <div class="w-full flex justify-between">
    <span class="text-lg font-semibold">{sector.title}</span>
  </div>
  {#if sector.description !== undefined}
    <span class="text-white/50 h-full">
      {sector.description}
    </span>
  {/if}

  <button
    class="text-left underline-offset-4 underline text-amber-700 dark:text-blue-300"
  >
    View securites<span
      class="material-symbols-outlined skiptranslate text-sm hidden ml-2"
    >
      north</span
    >
  </button>

  <span class="gap-4 dark-light-text w-full inline-flex">
    {#if sector.totalGainLoss !== undefined && sector.totalGainLoss !== 0}
      <span
        class:text-green-500={sector.totalGainLoss > 0}
        class:text-red-500={sector.totalGainLoss < 0}
        class="font-semibold text-sm flex items-center gap-1"
      >
        <span class="material-symbols-outlined skiptranslate text-sm">
          {sector.totalGainLoss > 0 ? 'trending_up' : 'trending_down'}
        </span>
        {sector.totalGainLoss} %
      </span>
    {/if}
    {#if sector.securities !== undefined}
      <span
        class="font-semibold text-sm flex items-center gap-1 justify-self-end"
      >
        <span class="material-symbols-outlined skiptranslate text-sm">
          category
        </span>
        {sector.securities.toString()}
      </span>
    {/if}
  </span>
</div>

<script lang="ts">
  import type { iSector } from 'models/sector';

  let { sector } = $props<{
    sector: iSector;
  }>();
</script>

<style>
  button {
    &:hover {
      .material-symbols-outlined {
        display: inline-block;
        transform: rotate(45deg);
      }
    }
  }
</style>
