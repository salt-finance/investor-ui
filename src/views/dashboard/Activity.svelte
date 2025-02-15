<div class="motion-preset-fade w-full block">
  <span class="page-title m-4 block">
    Activity
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
              <span class="flex gap-2">
                <span class="flex flex-col">
                  <span class="dark-light-text body-text">{security.Date}</span>
                  <span class="dark-light-text body-text">{security.name}</span>
                  <span>{security.Transaction}</span>
                </span>
              </span>
            </span>
          </button>
        {/each}
      </div>
    {:else}
      <CardTable {onRowTap} {columns} {data} />
    {/if}
  </div>
</div>
<Tearsheet bind:this={tearsheetModal} />

<script lang="ts">
  import CardTable, {
    type TableColumn
  } from 'components/Cards/CardTable.svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';
  import type { ISecurity } from 'models/security';
  import type { SvelteComponent } from 'svelte';

  let mobile = new MediaQuery('max-width: 1024px');
  let tearsheetModal: SvelteComponent | undefined = $state();

  const onRowTap = (data: ISecurity) => {
    tearsheetModal?.show(data);
  };

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
    { key: 'netAmount', header: 'Net Amount (Etb)', sortable: true }
  ];

  const data = [
    {
      Date: 'Nov 12-2024',
      Transaction: 'Bought 3 Shares ETC @ 400.00 Birr',
      Quantity: '3.00',
      symbol: 'ETC',
      netAmount: '-1,200.00',
      name: 'Ethio Telecom',
      securityTicker: 'Ethio Telecom | ETC',
      id: '1',
      description: 'description',
      type: 'Common Stock',
      sector: 'Technology',
      exchange: 'ECMA',
      yearHigh: 5300,
      yearLow: 5000,
      dayHigh: 5230,
      dayLow: 5200,
      dayChange: 30,
      dayChangePercent: 0.4,
      price: 5200,
      closePrice: 5300,
      owned: true,
      volume: 400,
      marketCap: 400000,
      earningsPerShare: 12,
      priceToEarningsPerShare: 0.12,
      logoUrl:
        'https://salt-finance.github.io/investor-ui/assets/img/Icons/48/ETC.webp'
    },
    {
      Date: 'Dec 19-2024',
      Transaction: 'Sold 4 Shares CBE @ 890.00 Birr',
      securityTicker: 'Commercial Bank Of Ethiopia | CBE',

      Quantity: '4.00',
      symbol: 'CBE',
      netAmount: '3,560.00',
      name: 'Commercial Bank Of Ethiopia',
      id: '2',
      description: 'description',
      sector: 'Financial Services',
      exchange: 'ECMA',
      yearHigh: 5300,
      yearLow: 5000,
      dayHigh: 5230,
      dayLow: 5200,
      dayChange: 30,
      type: 'Common Stock',
      price: 5200,
      closePrice: 5300,
      volume: 400,
      marketCap: 400000,
      earningsPerShare: 12,
      priceToEarningsPerShare: 0.12,
      logoUrl:
        'https://salt-finance.github.io/investor-ui/assets/img/Icons/48/CBE.webp'
    },
    {
      Date: 'Nov 22-2024',
      Transaction: 'Sold 8 Shares EIC @ 280.00 Birr',
      securityTicker: 'Ethiopian Insurance Corporation | EIC',
      Quantity: '8.00',
      symbol: 'EIC',
      netAmount: '2,240.00',
      name: 'Ethiopian Insurance Corporation',
      id: '6',
      description: 'description',
      sector: 'Finacial Services',
      exchange: 'ESX',
      yearHigh: 5300,
      yearLow: 5000,
      type: 'Common Stock',
      dayHigh: 5230,
      dayLow: 5200,
      dayChange: 30,
      dayChangePercent: 0.4,
      openPrice: 5200,
      closePrice: 5300,
      volume: 400,
      marketCap: 400000,
      earningsPerShare: 12,
      priceToEarningsPerShare: 0.12,
      logoUrl:
        'https://salt-finance.github.io/investor-ui/assets/img/Icons/48/EIC.webp'
    }
  ];
</script>
