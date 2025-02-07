<div class="w-full motion-preset-fade">
  <div class="flex w-full justify-between items-start flex-wrap gap-2 p-4">
    <span class="page-title"> Market </span>
    <BaseInput
      baseClass="md:justify-self-end w-full sm:w-fit"
      placeholder="Search stock"
      prependIcon="search"
    ></BaseInput>
  </div>

  <h2 class="page-subtitle m-4 mt-0">Sectors</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
    {#each sectors as sector}
      <SectorCard {sector} />
    {/each}
  </div>
</div>

<script lang="ts">
  import BaseInput from 'components/Inputs/BaseInput.svelte';

  import SectorCard from 'components/SectorCard.svelte';
  import sectorsData from 'data/sectors.json';
  import { type ISector, Sector } from 'models/sector';

  const sectors: ISector[] = Sector.fromJsonList(sectorsData);
</script>
