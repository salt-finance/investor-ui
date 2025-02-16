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
        {#each filtered as holding}
          <button
            onclick={() => onRowTap(holding)}
            class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30"
          >
            <span class="flex w-full justify-between p-4">
              <span class="flex items-center w-full justify-between">
                <RoundedImage
                  src={holding.securityLogoUrl}
                  fallBackText={holding.securityName}
                />
                <span class="flex flex-col w-[calc(100%-4rem)]">
                  <span class="flex justify-between flex-wrap gap-2">
                    {holding.securityName}
                    <span class="font-semibold text-sm">{holding.symbol} </span>
                  </span>
                  <span class="flex justify-between flex-wrap gap-2">
                    <span class="body-text {styleForValue(holding.averageROI)}"
                      >{formatPercentage(holding.averageROI)}</span
                    >
                    <span class="body-text dark-light-text"
                      >{currencyFormat()(holding.marketValue)}</span
                    >
                  </span>
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

<Tearsheet bind:this={tearsheetModal} />

<script lang="ts">
  import CardTable, {
    type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import { MediaQuery } from 'svelte/reactivity';
  import {
    currencyFormat,
    formatPercentage,
    styleForValue
  } from 'utils/formatTools.js';
  import { onDestroy, type SvelteComponent } from 'svelte';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';

  import { replace } from 'svelte-spa-router';
  import RoundedImage from 'components/RoundedImage.svelte';
  import { getHoldings } from '@/api/api_holding';
  import { accountStore } from '@/store/account';
  import type { IHolding } from 'models/holding';

  let all: IHolding[] = $state([]);
  let filtered: IHolding[] = $state([]);

  const maxTop = 5;

  const accountSubscription = accountStore.subscribe((account) => {
    if (account === undefined) {
      return;
    }

    getHoldings(account.id).then((resp) => {
      all = resp.response ?? [];
      console.table(all);

      if (showTop && all.length > maxTop) {
        filtered = all?.filter((_, index) => index < maxTop);
      } else {
        filtered = all;
      }
    });
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

  onDestroy(accountSubscription);

  let tearsheetModal: SvelteComponent | undefined = $state();
  const onRowTap = (data: IHolding) => {
    tearsheetModal?.show(undefined, data.securityId);
  };

  let mobile = new MediaQuery('max-width: 1024px');

  // Column definitions
  const columns: TableColumn<IHolding>[] = [
    {
      key: 'securityLogoUrl',
      header: '',
      sortable: false,
      type: 'image',
      imageFallBackProp: 'name'
    },
    { key: 'securityName', header: 'Security Name', sortable: true },
    { key: 'symbol', header: 'Ticker', sortable: true },
    { key: 'openPrice', header: 'Price', sortable: true, format: 'currency' },
    {
      key: 'quantity',
      header: 'Quantity <br /> (Shares)',
      sortable: true,
      format: 'number'
    },
    { key: 'totalCost', header: 'Cost', sortable: true, format: 'currency' },

    {
      key: 'averageROI',
      header: 'Gain / Loss %',
      sortable: true,
      type: 'gainLoss',
      format: 'percentage'
    },
    {
      key: 'totalGainLoss',
      header: 'Gain / Loss',
      sortable: true,
      type: 'gainLoss',
      format: 'currencyChange'
    },

    {
      key: 'marketValue',
      header: 'Market value',
      sortable: true,
      format: 'currency'
    }
  ];
</script>
