<!--{#snippet actionSnippet(value: ISecurity)}-->
<!--  <TableDropdown {value} />-->
<!--{/snippet}-->
<div class="motion-preset-fade w-full block">
  <span class="page-title m-4 block">
    Holdings
    {#if data.length > 0}
      ({data.length})
    {/if}
  </span>
  <div class="card bg-opacity-40">
    {#if mobile.current}
      <div class="flex flex-col">
        {#each data as security}
          <button
            onclick={() => onRowTap(security)}
            class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30"
          >
            <span class="flex w-full justify-between p-4">
              <span class="flex gap-4 items-center">
                <img
                  class="rounded-full border-none aspect-square h-12"
                  src={security.logoUrl}
                  alt="logo"
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
      <CardTable {onRowTap} {columns} {data} sortIndex={2} />
    {/if}
    <div></div>
  </div>
</div>

<Tearsheet bind:this={tearsheetModal} security={selectedSecurity} />

<script lang="ts">
  import CardTable, {
    type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import holdings from 'data/holdings.json';
  import { MediaQuery } from 'svelte/reactivity';
  import { currencyFormat } from 'utils/formatTools.js';
  import type { SvelteComponent } from 'svelte';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';
  import { Security, type ISecurity } from 'models/security';

  const data: ISecurity[] = [];

  const sec = Security.fromJsonList(holdings);
  data.push(...sec);

  let selectedSecurity: ISecurity | undefined = $state();
  let tearsheetModal: SvelteComponent | undefined = $state();
  const onRowTap = (data: ISecurity) => {
    selectedSecurity = data;
    tearsheetModal?.show();
  };

  let mobile = new MediaQuery('max-width: 1024px');

  // Column definitions
  const columns: TableColumn<ISecurity>[] = [
    { key: 'logoUrl', header: '', sortable: false, type: 'image' },
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
