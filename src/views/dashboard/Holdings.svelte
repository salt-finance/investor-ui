<!--{#snippet actionSnippet(value: ISecurity)}-->
<!--  <TableDropdown {value} />-->
<!--{/snippet}-->
<div class="motion-preset-fade w-full block">
  <div class="flex justify-between">
    <span class="page-title m-4 block">
      Holdings
      {getTitle()}
    </span>
    {#if showTop && all.length > maxTop}
      <button
        class="base-button mb-3"
        onclick={() => {
          replace('/dashboard/holdings');
        }}
        >Show all
      </button>
    {/if}
  </div>

  <div class="card bg-opacity-40">
    {#if mobile.current}
      <div class="flex flex-col">
        {#if filtered.length === 0}
          <span class="p-6"> No results found. </span>
        {/if}
        {#each filtered as security}
          <button
            onclick={() => onRowTap(security)}
            class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30"
          >
            <span class="flex w-full justify-between p-4">
              <span class="flex gap-4 items-center">
                <RoundedImage
                  src={security.logoUrl}
                  fallBackText={security.name}
                />
                <span class="flex flex-col">
                  <span>
                    {security.name}
                    &nbsp;
                    <span class="font-semibold text-sm">{security.symbol}</span
                    ></span
                  >
                  <span class="body-text dark-light-text"
                    >{currencyFormat()(security.price ?? 0)}</span
                  >
                </span>
              </span>
            </span>
          </button>
        {/each}
      </div>
    {:else}
      <CardTable {onRowTap} {columns} bind:data={filtered} sortIndex={2} />
    {/if}
  </div>
</div>

<Tearsheet bind:this={tearsheetModal} security={selectedSecurity} />

<script lang="ts">
  import CardTable, {
    type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import { MediaQuery } from 'svelte/reactivity';
  import { currencyFormat } from 'utils/formatTools.js';
  import { onDestroy, type SvelteComponent } from 'svelte';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';
  import { type ISecurity } from 'models/security';
  import { fetchSectors, sectorStore } from '@/store/stock';
  import { replace } from 'svelte-spa-router';
  import RoundedImage from 'components/RoundedImage.svelte';

  let all: ISecurity[] = $state([]);
  let filtered: ISecurity[] = $state([]);

  const maxTop = 5;

  const sectorsSubscription = sectorStore.subscribe((sectors) => {
    all = [];
    sectors.forEach((sector) => {
      if (sector?.securities?.data) {
        all.push(...sector.securities.data);
      }
    });

    if (showTop && all.length > maxTop) {
      filtered = all?.filter((_, index) => index < maxTop);
    } else {
      filtered = all;
    }
  });

  const getTitle = () => {
    if (filtered.length <= 0) {
      return '';
    }

    if (showTop && all.length !== filtered.length) {
      return `(${maxTop} of ${all.length})`;
    }
    return `(${all.length})`;
  };

  let { showTop } = $props<{
    showTop?: boolean;
  }>();

  onDestroy(sectorsSubscription);

  fetchSectors();

  let selectedSecurity: ISecurity | undefined = $state();
  let tearsheetModal: SvelteComponent | undefined = $state();
  const onRowTap = (data: ISecurity) => {
    selectedSecurity = data;
    tearsheetModal?.show();
  };

  let mobile = new MediaQuery('max-width: 1024px');

  // Column definitions
  const columns: TableColumn<ISecurity>[] = [
    {
      key: 'logoUrl',
      header: '',
      sortable: false,
      type: 'image',
      imageFallBackProp: 'name'
    },
    { key: 'name', header: 'Security Name', sortable: true },
    { key: 'symbol', header: 'Ticker', sortable: true },
    { key: 'price', header: 'Price', sortable: true, format: 'currency' },
    { key: 'yearHigh', header: '52W High', sortable: true, format: 'currency' },
    {
      key: 'dayChange',
      header: 'Gain/Loss',
      sortable: true,
      format: 'currency'
    },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'sector', header: 'Sector', sortable: true }
  ];
</script>
