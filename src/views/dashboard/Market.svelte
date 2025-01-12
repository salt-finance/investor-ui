<div class="w-full" in:fly|global={staggerdTransition(1)}>
  <BaseInput
    baseClass="justify-self-end"
    placeholder="Search"
    prependIcon="search"
  ></BaseInput>
  <h2 class="text-xl mb-4">Sectors</h2>
  <div class="flex gap-4">
    {#each sectors as sector}
      <SectorCard {sector} />
    {/each}
  </div>
</div>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { staggerdTransition } from 'utils/animationTools';
  import BaseInput from 'components/Inputs/BaseInput.svelte';

  import sectorsData from 'data/sectors.json';
  import { type iSector, Sector } from 'models/sector';
  import SectorCard from 'components/SectorCard.svelte';

  const sectors: iSector[] = Sector.fromJsonList(sectorsData);
</script>
