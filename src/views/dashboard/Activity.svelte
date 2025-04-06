<script lang="ts">
  import { getActivity } from '@/api/api_account'
  import { accountStore } from '@/store/account'
  import CardTable, {
      type TableColumn,
  } from 'components/Cards/CardTable.svelte'
  import Loading from 'components/Loading.svelte'
  import Tearsheet from 'components/Modals/Tearsheet.svelte'
  import RoundedImage from 'components/RoundedImage.svelte'
  import { Activity } from 'models/account'
  import { onDestroy, type SvelteComponent } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { MediaQuery } from 'svelte/reactivity'
  import {
      currencyFormat,
      parsedDate,
      styleForValue,
  } from 'utils/formatTools'

  let mobile = new MediaQuery('max-width: 1024px')
  let tearsheetModal: SvelteComponent | undefined = $state()

  let all: Activity[] = $state([])
  let loading = $state(true)
  let filtered: Activity[] = $state([])
  const maxTop = 5
  const onRowTap = (data: Activity) => {
    if (data.securityId) {
      tearsheetModal?.show(undefined, data.securityId)
    }
  }

  const imageFallBackFunc = (activity: Activity) => {
  return activity.securitySymbol ??
  activity.securityName ?? activity.transaction; 
  }

  const columns: TableColumn<Activity>[] = [
    {
      key: 'securityLogoUrl',
      header: '',
      sortable: false,
      type: 'image',
      imageFallBackFunc: imageFallBackFunc,
    },
    { key: 'transaction', header: 'Description', sortable: true },

    {
      key: 'date',
      header: 'Date',
      sortable: true,
      bodyClasses: 'whitespace-nowrap',
      format: 'date',
    },
    { key: 'securityName', header: 'Security Name', sortable: true },
    {
      key: 'securitySymbol',
      header: 'Ticker',
      sortable: true,
      bodyClasses: 'font-bold',
    },
    {
      key: 'quantity',
      header: 'Quantity (shares)',
      sortable: true,
      format: 'number',
    },
    { key: 'price', header: 'Price', sortable: true, format: 'currency' },
    {
      key: 'netAmount',
      header: 'Net Amount',
      sortable: true,
      format: 'currencyChange',
      type: 'gainLoss',
    },
  ]

  const accountSubscription = accountStore.subscribe(async (account) => {
    if (account === undefined || all.length > 0) {
      loading = false
      return
    }
    loading = true
    const result = await getActivity(account.id)

    if (result.data !== null) {
      all = result.data.response
      // all = all.filter((activity) => activity.securityId)
      all.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      if (showTop && all.length > maxTop) {
        filtered = all.slice(0, maxTop)
      } else {
        filtered = all
      }
    }
    loading = false
  })

  const getTitle = () => {
    if (filtered.length <= 0 || showTop) {
      return ''
    }

    return `(${all.length})`
  }

  let { showTop } = $props<{
    showTop?: boolean
  }>()

  onDestroy(() => {
    accountSubscription
  })
</script>

<div class="w-full block">
  <div class="flex justify-between">
    <span class="page-title my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate thin">
        swap_horiz
      </span>

      {showTop ? 'Recent activity' : 'Activity'}

      {getTitle()}
    </span>
    {#if showTop && all.length > maxTop}
      <button
        class="mb-3 dashed-button border-current"
        onclick={() => {
          push('/dashboard/activity')
        }}>
        Show all
      </button>
    {/if}
  </div>

  <div class="card">
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
            class="p-4 flex flex-col w-full card z-10 gap-y-1 border-0 dark:border-b  border-foreground/50 rounded-b-none shadow-md dark:shadow-none {showTop? "" : "sticky top-0"}">
            <span class="flex justify-between gap-2">
              <span>
                <strong>Ticker</strong>
                | Security name
              </span>
              <span>Description</span>
            </span>
            <span class="flex justify-between gap-2">
              <span>
                <span class="opacity-50">↓</span>
                Date
              </span>
              <span>Net amount</span>
            </span>
          </span>
          {#each filtered as activity}
            <button
              onclick={() => onRowTap(activity)}
              class="border-b  border-foreground/30 hover:bg-accent/30 text-left">
              <span class="flex w-full justify-between p-4">
                <span class="flex items-center w-full justify-between">
                  <RoundedImage
                    src={activity.securityLogoUrl}
                    fallBackText={imageFallBackFunc(activity)} />
                  <span class="flex flex-col w-[calc(100%-4rem)] gap-y-2">
                    <span class="flex justify-between gap-x-4">
                      <span>
                        {#if activity.securitySymbol}
                        <strong>{activity.securitySymbol}</strong>
                        |
                        {activity.securityName ?? '--'}
                        {:else}
                        --
                        {/if}
                      </span>
                      <div class="inline text-right">
                        {@html activity.transaction}
                      </div>
                    </span>
                    <span class="flex justify-between gap-x-4">
                      <span class="body-text">
                        {parsedDate(activity.date)}
                      </span>
                      <span
                        class="body-text {styleForValue(activity.netAmount)}">
                        {currencyFormat({ signDisplay: 'exceptZero' })(
                          activity.netAmount
                        )}
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
          sortIndex={2}
          sticky={!showTop}
          sortDirection="desc" />
      </div>
    {/if}
  </div>
</div>

<Tearsheet bind:this={tearsheetModal} />
