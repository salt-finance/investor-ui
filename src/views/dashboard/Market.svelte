<div in:fly|global={staggerdTransition(1)} class="w-full">
  <CardTable title={'Market'} data={[]} columns={[]} />
</div>

<script lang="ts">
  import CardTable from 'components/Cards/CardTable.svelte';
  import { fly } from 'svelte/transition';
  import { staggerdTransition } from 'utils/animationTools';
</script>
