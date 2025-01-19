<div
  class="flex flex-col gap-4 card p-4 bg-opacity-40 justify-between sector-card"
>
  <div class="w-full flex justify-between">
    <span class="text-lg font-semibold">{sector.title}</span>
  </div>
  {#if sector.description !== undefined}
    <span class="dark-light-text body-text h-full">
      {sector.description}
    </span>
  {/if}

  <button
    onclick={() => push(`/dashboard/sector/${sector.id}`)}
    class="text-left text-indigo-500 dark:text-blue-300 hover:text-blue-500 flex items-center"
  >
    <span class="underline-offset-4 underline"> View securites </span>
    <span
      class="material-symbols-outlined skiptranslate ml-2 duration-200 text-sm"
    >
      north_east</span
    >
  </button>

  <span class="gap-4 w-full inline-flex">
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
        {sector.securities.length.toString()}
      </span>
    {/if}
  </span>
</div>

<script lang="ts">
  import type { iSector } from 'models/sector';
  import { push } from 'svelte-spa-router';

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
