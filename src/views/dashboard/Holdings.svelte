<script lang="ts">
  import CardTable, {
      type TableColumn,
  } from '../../components/Cards/CardTable.svelte'

  import Tearsheet from 'components/Modals/Tearsheet.svelte'
  import { onDestroy, type SvelteComponent } from 'svelte'
  import { MediaQuery } from 'svelte/reactivity'
  import {
      currencyFormat,
      formatPercentage,
      styleForValue,
  } from 'utils/formatTools.js'

  import { accountStore, fetchHoldings, holdingsStore } from '@/store/account'
  import Loading from 'components/Loading.svelte'
  import RoundedImage from 'components/RoundedImage.svelte'
  import type { IHolding } from 'models/holding'
  import { push } from 'svelte-spa-router'

  let all: IHolding[] = $state([])
  let filtered: IHolding[] = $state([])
  let loading = $state(true)

  const maxTop = 5

  const accountSubscription = accountStore.subscribe(async (account) => {
    if (account === undefined || all.length > 0) {
      loading = false
      return
    }
    loading = true
    await fetchHoldings(account.id)
    loading = false
  })

  const holdingsSubscription = holdingsStore.subscribe((holdings) => {
    if (holdings) {
      all = holdings
      all.sort((a, b) => b.marketValue - a.marketValue)

      if (showTop && all.length > maxTop) {
        filtered = all.slice(0, maxTop)
      } else {
        filtered = all
      }
    }
  })

  const getTitle = () => {
    if (filtered.length <= 0) {
      return ''
    }

    if (showTop && all.length !== filtered.length) {
      return `(${maxTop} of ${all.length})`
    }
    return `(${all.length})`
  }

  let { showTop } = $props<{
    showTop?: boolean
  }>()

  onDestroy(() => {
    accountSubscription
    holdingsSubscription
  })

  let tearsheetModal: SvelteComponent | undefined = $state()
  const onRowTap = (data: IHolding) => {
    tearsheetModal?.show(undefined, data.securityId)
  }

  let mobile = new MediaQuery('max-width: 1024px')

  // Column definitions
  const columns: TableColumn<IHolding>[] = [
    {
      key: 'securityLogoUrl',
      header: '',
      sortable: false,
      type: 'image',
      imageFallBackProp: 'name',
    },
    { key: 'securityName', header: 'Security Name', sortable: true },
    {
      key: 'symbol',
      header: 'Ticker',
      sortable: true,
      bodyClasses: 'font-bold',
    },
    { key: 'openPrice', header: 'Price', sortable: true, format: 'currency' },
    {
      key: 'quantity',
      header: 'Quantity (shares)',
      sortable: true,
      format: 'number',
    },
    { key: 'totalCost', header: 'Cost', sortable: true, format: 'currency' },

    {
      key: 'averageROI',
      header: 'Gain / Loss',
      type: 'gainLoss',
      format: 'percentage',
      sortable: true,
      childColumn: {
        key: 'totalGainLoss',
        header: 'Gain / Loss',
        type: 'gainLoss',
        format: 'currencyChange',
      },
    },

    {
      key: 'marketValue',
      header: 'Market value',
      sortable: true,
      format: 'currency',
    },
  ]
</script>

<div class="w-full block">
  <div class="flex justify-between">
    <span class="page-title my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate thin">category</span>
      Holdings
      {getTitle()}
    </span>
    {#if showTop && all.length > maxTop}
      <button
        class="mb-3 dashed-button border-current"
        onclick={() => {
          push('/dashboard/holdings')
        }}>
        Show all
      </button>
    {/if}
  </div>

  <div class="card bg-opacity-40">
    {#if loading}
      <div class="h-8 m-4 flex items-center">
        <Loading />
      </div>
    {:else if mobile.current}
      <div class="flex flex-col motion-preset-focus-lg motion-duration-1000">
        {#if filtered.length === 0}
          <span class="p-6">No results found.</span>
        {:else}
          <span
            class="p-4 flex flex-col w-full bg-accent/20 dark:bg-accent-dark/20 body-text gap-y-1">
            <span class="flex justify-between gap-2">
              <span>
                <strong>Ticker</strong>
                | Security name
              </span>
              <span>Quantity (shares)</span>
            </span>
            <span class="flex justify-between gap-2">
              <span>Gain / Loss</span>
              <span>
                <span class="sort-indicator">↓</span>
                Market value
              </span>
            </span>
          </span>
          {#each filtered as holding}
            <button
              onclick={() => onRowTap(holding)}
              class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30">
              <span class="flex w-full justify-between p-4">
                <span class="flex items-center w-full justify-between">
                  <RoundedImage
                    src={holding.securityLogoUrl}
                    fallBackText={holding.securityName} />
                  <span class="flex flex-col w-[calc(100%-4rem)] gap-y-2">
                    <span class="flex justify-between gap-x-4">
                      <span>
                        <strong>{holding.symbol}</strong>
                        |
                        {holding.securityName}
                      </span>
                      <span>{holding.quantity}</span>
                    </span>
                    <span class="flex justify-between gap-x-4">
                      <span
                        class="body-text {styleForValue(holding.averageROI)}">
                        {formatPercentage(holding.averageROI)}
                      </span>
                      <span class="body-text dark-light-text">
                        {currencyFormat()(holding.marketValue)}
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </button>
          {/each}
        {/if}
      </div>
    {:else}
    <div class="flex flex-col motion-preset-focus-lg motion-duration-1000">
      <CardTable
      {onRowTap}
      {columns}
      bind:data={filtered}
      sortIndex={7}
      sortDirection="desc" />
  </div>
    {/if}
  </div>
</div>

<Tearsheet bind:this={tearsheetModal} />
