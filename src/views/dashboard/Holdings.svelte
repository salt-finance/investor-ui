{#snippet actionSnippet(value: iSecurity)}
  <TableDropdown {value} />
{/snippet}
<div class="motion-preset-fade w-full block">
  <span class="page-title m-4 block">
    Holdings
    {#if data.length > 0}
      ({data.length})
    {/if}
  </span>
  <div>
    {#if mobile.current}
      <div class="flex flex-col glass-effect">
        {#each data as security}
          <div class="flex w-full justify-between p-4">
            <div class="flex gap-2 items-center">
              <img
                width="48"
                height="48"
                class="rounded-full align-middle border-none max-w-fit object-cover h-min"
                src={security.logoUrl}
                alt="logo"
              />

              <div class="flex flex-col">
                <span>{security.name} <b>{security.symbol}</b></span>
                <span>{currencyFormat()(security.price ?? 0)}</span>
              </div>
            </div>
            {@render actionSnippet(security)}
          </div>
        {/each}
      </div>
    {:else}
      <CardTable {actionSnippet} {columns} {data} sortIndex={2} />
    {/if}
    <div></div>
  </div>
</div>

<script lang="ts">
  import TableDropdown from 'components/Dropdowns/TableDropdown.svelte';
  import CardTable, {
      type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import holdings from 'data/holdings.json';
  import { Security, type iSecurity } from 'models/security';

  const data: iSecurity[] = [];

  const sec = Security.fromJsonList(holdings);

  data.push(...sec);

  import { MediaQuery } from 'svelte/reactivity';
  import { currencyFormat } from 'utils/formatTools.js';

  let mobile = new MediaQuery('max-width: 1024px');

  // Column definitions
  const columns: TableColumn<iSecurity>[] = [
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
    { key: 'sector', header: 'Sector', sortable: true },
    {
      key: 'id',
      header: '',
      type: 'action',
      action: (a) => console.table(a)
    }
  ];
</script>
