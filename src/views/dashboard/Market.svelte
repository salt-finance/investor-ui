<div class="w-full motion-preset-fade">
  <div class="flex w-full justify-between items-start flex-wrap gap-2 p-4">
    <span class="page-title"> Market </span>
    <BaseInput
      baseClass="hidden md:justify-self-end w-full sm:w-fit"
      placeholder="Search stock"
      prependIcon="search"
    ></BaseInput>
  </div>

  <h2 class="page-subtitle m-4 mt-0">Sectors</h2>

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

<script lang="ts">
  import BaseInput from 'components/Inputs/BaseInput.svelte';

  import SectorCard from 'components/SectorCard.svelte';
  import { type ISector } from 'models/sector';
  import { fetchSectors, sectorStore } from '@/store/stock';
  import { onDestroy } from 'svelte';
  import Loading from 'components/Loading.svelte';

  let sectors: ISector[] = $state([]);

  const sectorsSubscription = sectorStore.subscribe((data) => {
    sectors = data;
  });

  onDestroy(sectorsSubscription);

  fetchSectors();
</script>
