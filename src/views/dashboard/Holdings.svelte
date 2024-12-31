{#snippet actionSnippet(value: iSecurity)}
  <TableDropdown {value} />
{/snippet}
<div class="w-full glass-effect" in:fly|global={staggerdTransition(1)}>
  {#if mobile.current}
    <h3 class="font-semibold text-lg capitalize m-4">
      Holdings
      {#if data.length > 0}
        ({data.length})
      {/if}
    </h3>

    <div class="flex flex-col">
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
    <CardTable
      {actionSnippet}
      {columns}
      {data}
      sortIndex={2}
      title="Holdings"
    />
  {/if}
  <div></div>
</div>

<script lang="ts">
  import TableDropdown from 'components/Dropdowns/TableDropdown.svelte';
  import CardTable, {
    type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import holdings from 'data/holdings.json';
  import { Security, type iSecurity } from 'models/security';
  import { fly } from 'svelte/transition';
  import { staggerdTransition } from 'utils/animationTools';

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
    { key: 'dayChangePercent', header: 'Gain/Loss(%)', sortable: true },
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
