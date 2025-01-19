{#snippet actionSnippet(value: Record<string, any>)}
  <TableDropdown {value} />
{/snippet}
<div class="motion-preset-fade w-full block">
  <span class="page-title m-4 block">
    Activity
    {#if data.length > 0}
      ({data.length})
    {/if}
  </span>
  <div class="glass-effect">
    {#if mobile.current}
      <div class="flex flex-col">
        {#each data as security}
          <div class="flex w-full justify-between p-4">
            <div class="flex gap-2">
              <div class="flex flex-col">
                <span>{security.Date}</span>
                <span>{security.name}</span>
                <span>{security.Transaction}</span>
              </div>
            </div>
            {@render actionSnippet(security)}
          </div>
        {/each}
      </div>
    {:else}
      <CardTable {columns} {data} {actionSnippet} />
    {/if}
  </div>
</div>

<script lang="ts">
  import CardTable, {
      type TableColumn
  } from 'components/Cards/CardTable.svelte';
  import TableDropdown from 'components/Dropdowns/TableDropdown.svelte';
  import { MediaQuery } from 'svelte/reactivity';

  let mobile = new MediaQuery('max-width: 1024px');

  const columns: TableColumn<Record<string, any>>[] = [
    {
      key: 'Date',
      header: 'Date',
      sortable: true,
      bodyClasses: 'whitespace-nowrap'
    },
    { key: 'Transaction', header: 'Description', sortable: true },
    { key: 'name', header: 'Security | Ticker', sortable: true },
    { key: 'Quantity', header: 'Quantity (Shares)', sortable: true },
    { key: 'price', header: 'Price (Etb)', sortable: true },
    { key: 'netAmount', header: 'Net Amount (Etb)', sortable: true },
    {
      key: 'id',
      header: '',
      type: 'action',
      action: (a) => console.table(a)
    }
  ];

  const data = [
    {
      Date: 'Nov 12-2024',
      Transaction: 'Bought 3 Shares ETC @ 400.00 Birr',
      name: 'Ethio Telecom | ETC',
      Quantity: '3.00',
      symbol: 'ETC',
      price: '400.00',
      netAmount: '-1,200.00'
    },
    {
      Date: 'Dec 19-2024',
      Transaction: 'Sold 4 Shares CBE @ 890.00 Birr',
      name: 'Commercial Bank of Ethiopia | CBE',
      Quantity: '4.00',
      symbol: 'CBE',
      price: '890.00',
      netAmount: '3,560.00'
    },
    {
      Date: 'Nov 22-2024',
      Transaction: 'Sold 8 Shares EIC @ 280.00 Birr',
      name: 'Ethiopian Insurance Corporation | EIC',
      Quantity: '8.00',
      symbol: 'EIC',
      price: '280.00',
      netAmount: '2,240.00'
    }
  ];
</script>
