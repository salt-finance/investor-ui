<script lang="ts">
  import type { ISector } from 'models/sector'
  import { push } from 'svelte-spa-router'

  let { sector } = $props<{
    sector: ISector
  }>()
</script>

<button
  onclick={() => push(`/dashboard/sector/${sector.id}`)}
  title="View sector details"
  class="unset ">
  <div
    class="flex flex-col gap-4 glass-effect p-4 bg-opacity-40 justify-between sector-card hover:scale-95 transition-all group border-solid hover:border-accent">
    <div class="w-full flex justify-between">
      <span class="text-lg font-semibold">{sector.title}</span>
      <span
        class="material-symbols-outlined skiptranslate ml-2 duration-200 text-xl
     group-hover:text-accent rotate-45 group-hover:rotate-0 group-hover:opacity-100">
        north_east
      </span>
    </div>
    {#if sector.description !== undefined}
      <span class="dark-light-text body-text">
        {sector.description}
      </span>
    {/if}

    <span class="gap-4 w-full inline-flex">
      {#if sector.totalGainLoss !== undefined && sector.totalGainLoss !== 0}
        <span
          class:text-green-500={sector.totalGainLoss > 0}
          class:text-red-500={sector.totalGainLoss < 0}
          class="font-semibold text-sm flex items-center gap-1">
          <span class="material-symbols-outlined skiptranslate text-sm">
            {sector.totalGainLoss > 0 ? 'trending_up' : 'trending_down'}
          </span>
          {sector.totalGainLoss} %
        </span>
      {/if}
      {#if sector.securities !== null}
        <span class="font-semibold text-sm flex gap-1 justify-self-end">
          <span class="material-symbols-outlined skiptranslate text-sm">
            category
          </span>
          {sector.securities.count}
        </span>
      {/if}
    </span>
  </div>
</button>
