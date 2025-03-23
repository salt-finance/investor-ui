<script lang="ts">
  import { type ISector } from 'models/sector'
  import type { ISecurity } from 'models/security'
  import { onDestroy, type SvelteComponent } from 'svelte'
  import { params } from 'svelte-spa-router'
  import {
    formatCurrencyWithNotation,
    formatPercentage,
    styleForValue,
  } from 'utils/formatTools'
  import Tearsheet from 'components/Modals/Tearsheet.svelte'
  import RoundedImage from 'components/RoundedImage.svelte'
  import { getSector } from '@/api/api_security'
  import Loading from 'components/Loading.svelte'

  let loading = $state(true)

  let sector: ISector | undefined = $state()
  let tearsheetModal: SvelteComponent | undefined = $state()
  const onRowTap = (data: ISecurity) => {
    tearsheetModal?.show(data)
  }

  const paramSubscription = params.subscribe(async (val) => {
    if (val?.sectorId) {
      const result = await getSector(val.sectorId)
      if (result.data) {
        sector = result.data.response
      }
      loading = false
    }
  })

  onDestroy(paramSubscription)
</script>

{#if loading}
  <div class="h-8 m-4 flex items-center">
    <Loading />
  </div>
{:else if sector !== undefined}
  <div class="flex-col flex w-full motion-preset-fade p-2">
    <span class="page-title mb-4">{sector.title}</span>
    {#if sector.description !== undefined}
      <span class="body-text dark-light-text lg:w-2/3">
        {sector.description}
      </span>
    {/if}
    {#if sector?.securities?.data}
      <span class="page-subtitle my-4">Securities</span>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 flex-wrap">
        {#each sector.securities.data as security}
          <button
            onclick={() => onRowTap(security)}
            class="unset"
            title="View security details">
            <span
              class="col-span-1 card flex flex-row flex-wrap p-4 items-start gap-4 content-between h-full hover:scale-95 transition-all group border-solid border-accent border-opacity-0 hover:border-opacity-100">
              <span class="w-full flex justify-between">
                <span
                  class="flex flex-grow w-full justify-between items-center">
                  <RoundedImage
                    src={security.logoUrl}
                    fallBackText={security.name} />
                </span>
                <span
                  class="material-symbols-outlined skiptranslate ml-2 duration-200 text-xl
                     group-hover:text-accent rotate-45 group-hover:rotate-0 group-hover:opacity-100">
                  north_east
                </span>
              </span>

              <span class="flex flex-col gap-1">
                <span class="body-text dark-light-text">{security.name}</span>
                <span class="font-medium text-xl">
                  {formatCurrencyWithNotation(security.ask)}
                </span>
                <span class="flex gap-2">
                  <span class="body-text dark-light-text">
                    {security.symbol}
                  </span>
                  <span class={styleForValue(security.dayChangePercent)}>
                    {formatPercentage(security.dayChangePercent)}
                  </span>
                </span>
              </span>
            </span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <Tearsheet bind:this={tearsheetModal} />
{/if}
