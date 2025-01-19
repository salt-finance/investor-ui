<div class="w-full motion-preset-focus">
  <div class="flex w-full justify-between items-center flex-wrap gap-2">
    <span class="page-title"> Market </span>
    <BaseInput
      baseClass="md:justify-self-end"
      placeholder="Search stock"
      prependIcon="search"
    ></BaseInput>
  </div>

  <h2 class="text-xl my-4">Sectors</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
    {#each sectors as sector}
      <SectorCard {sector} />
    {/each}
  </div>
</div>

<script lang="ts">
  import BaseInput from 'components/Inputs/BaseInput.svelte';

  import sectorsData from 'data/sectors.json';
  import { type iSector, Sector } from 'models/sector';
  import SectorCard from 'components/SectorCard.svelte';

  const sectors: iSector[] = Sector.fromJsonList(sectorsData);
</script>
