<script lang="ts">
  import SectorCard from 'components/SectorCard.svelte'
  import { type ISector } from 'models/sector'
  import { fetchSectors, sectorStore } from '@/store/stock'
  import { onDestroy } from 'svelte'
  import Loading from 'components/Loading.svelte'
  import Search from 'components/Search.svelte'

  let sectors: ISector[] = $state([])

  const sectorsSubscription = sectorStore.subscribe((data) => {
    sectors = data
  })

  onDestroy(sectorsSubscription)

  fetchSectors()
</script>

<div class="w-full motion-preset-fade">
  <div class="flex w-full justify-between items-start flex-wrap gap-2 pb-4">
    <span class="page-title my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate thin">
        storefront
      </span>

      Market
    </span>
    <Search />
  </div>

  <h2 class="page-subtitle mb-4">Sectors</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
    {#if sectors.length === 0}
      <div class="p-4">
        <Loading />
      </div>
    {:else}
      {#each sectors as sector}
        <SectorCard {sector} />
      {/each}
    {/if}
  </div>
</div>
