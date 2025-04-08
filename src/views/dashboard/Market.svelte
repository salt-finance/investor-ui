<script lang="ts">
  import { fetchSectors, sectorStore } from '@/store/stock'
  import Loading from 'components/Loading.svelte'
  import Search from 'components/Search.svelte'
  import SectorCard from 'components/SectorCard.svelte'
  import { type ISector } from 'models/sector'
  import { onDestroy } from 'svelte'
  import { circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  let sectors: ISector[] = $state([])

  const sectorsSubscription = sectorStore.subscribe((data) => {
    sectors = data
  })

  onDestroy(sectorsSubscription)

  fetchSectors()
</script>

<div class="w-full">
  <div
    class="flex w-full justify-between items-start flex-wrap gap-2 pb-4"
    in:fly|global={{
      y: 50,
      easing: circOut,
      opacity: 0,
      delay: 200,
      duration: 500,
    }} 
    >
    <span class="page-title my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate thin">
        storefront
      </span>

      Market
    </span>
    <div class="w-full sm:w-1/2">
      <Search />
    </div>
  </div>

  <h2
    class="page-subtitle mb-4"
    in:fly|global={{
      easing: circOut,
      duration: 1000,
      y: 50,
    }}>
    Sectors
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
    {#if sectors.length === 0}
      <div class="p-4">
        <Loading />
      </div>
    {:else}
      {#each sectors as sector, index}
        <div
          class="lg:flex items-stretch"
          in:fly|global={{
            easing: circOut,
            duration: 1000,
            opacity: 0,
            delay: index * 100,
            y: 100,
          }}>
          <SectorCard {sector} />
        </div>
      {/each}
    {/if}
  </div>
</div>
