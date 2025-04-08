<script lang="ts">
  import { getSecurity } from '@/api/api_security'
  import CardLineChart from 'components/Cards/CardLineChart.svelte'
  import Loading from 'components/Loading.svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import Trade from 'components/Modals/trade.svelte'
  import RoundedImage from 'components/RoundedImage.svelte'
  import type { ISecurity } from 'models/security'
  import { mount, type SvelteComponent, tick, unmount } from 'svelte'
  import { mountChart } from 'utils/chartTools'
  import {
      currencyFormat,
      decimalFormat,
      formatCurrencyWithNotation,
  } from 'utils/formatTools'

  let tradeModal: SvelteComponent | undefined = $state()
  let buy = $state(true)

  let security: ISecurity | undefined = $state()
  let loading = $state(true)

  let loadingError = $state('')

  let modal: Record<string, any>

  async function hide() {
    await unmount(modal, { outro: true })
  }

  let chartContainer: HTMLElement | undefined = $state()
  let target: HTMLElement

  // noinspection JSUnusedGlobalSymbols

  export async function show(securityToShow?: ISecurity, id?: string) {
    security = securityToShow
    loadingError = ''

    // noinspection JSUnusedGlobalSymbols
    let props = {
      hide: hide,
      title: title,
      body: body,
      loading: false,
    }

    modal = mount(ModalDialog, { props, target })

    if (securityToShow === undefined && id) {
      loading = true
      const result = await getSecurity(id)

      loading = false

      if (result.error) {
        loadingError = result.error.message
        return
      }

      if (result.data) {
        security = result.data.response
      }
    } else {
      loading = false
    }

    // Wait one frame to allow the dialog to render
    await tick()
    if (chartContainer) {
      
      mountChart(CardLineChart, chartContainer, {
        startingValue: security?.ask,
        dataLength:20
      })
    }
  }
</script>

<div bind:this={target} ></div>

{#snippet title()}
  <span class="font-semibold text-lg">
    Security Details {security?.symbol ? ' | ' + security.symbol : ''}
  </span>
{/snippet}

{#snippet body()}
  <div class="p-4 pt-1 flex flex-col gap-4 h-full overflow-y-scroll z-10 min-h-[100vh] lg:min-h-max">
    {#if loading}
      <Loading />
    {:else if loadingError.length > 0}
      {loadingError}
    {:else if security !== undefined}
      <!--      Security Title-->
      <div
        class="flex justify-between flex-wrap gap-4 p-4 order-2 md:order-none sticky md:top-1 bottom-28 z-10 card"
      >
        <div class="flex items-center gap-4">
          <RoundedImage src={security.logoUrl} fallBackText={security.name} />

          <div>
            <span class="text-lg font-semibold mr-2">{security?.name}</span>
            <p>{security?.exchange} : {security?.symbol}</p>
          </div>
        </div>
        <div class="flex gap-4 md:items-end w-full md:max-w-fit">
          <button
            class="btn-buy p-2 px-4 w-full"
            onclick={(e) => {
              e.preventDefault()
              buy = true
              tradeModal?.show()
            }}
          >
            Buy
          </button>
          <button
            class="btn-sell p-2 px-4 w-full"
            onclick={(e) => {
              e.preventDefault()
              buy = false
              tradeModal?.show()
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <!--Security body-->

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-2 w-full flex-wrap mb-20 pb-2 lg:pb-0 lg:mb-0">
        <div class="col-span-1 lg:col-span-3 flex flex-col">
          <div class="flex gap-2 w-full flex-wrap md:flex-nowrap">
            <div class="card p-4 w-full gap-2 flex flex-col">
              Open Price
              <span class="text-xl">
                {formatCurrencyWithNotation(security?.ask)}
              </span>
            </div>
            <div class="card p-4 w-full gap-2 flex flex-col">
              Market Cap
              <span class="text-xl">
                {currencyFormat({
                  notation:
                    Math.abs(security.marketCap ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.marketCap ?? 0)}
              </span>
            </div>
            <div class="card p-4 w-full gap-2 flex flex-col">
              Volume
              <span class="text-xl">
                {currencyFormat({
                  notation:
                    Math.abs(security.volume ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.volume ?? 0)}
              </span>
            </div>
          </div>

          <div class="card mt-2 flex-grow grid h-96 lg:h-auto">
            <div class="m-4 h-[95%]" bind:this={chartContainer}></div>
          </div>
        </div>

        <div class="p-4 col-span-1 lg:col-span-2 card">
          <span class="font-semibold block text-lg">Details</span>
          <span>{security.description}</span>
          <hr class="my-4 opacity-20 bg-neutral-800 h-[2px]" />

          <div class="flex flex-col gap-4">
            <div class="flex w-full justify-between select-none flex-wrap">
              Day Range
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat()(security.dayLow ?? 0)} - {currencyFormat()(
                  security.dayHigh ?? 0,
                )}
              </span>
            </div>

            <div class="flex w-full justify-between select-none flex-wrap">
              Earnings per share
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat({
                  notation:
                    Math.abs(security.earningsPerShare ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.earningsPerShare ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between select-none flex-wrap">
              Main Exchange
              <span class="font-semibold text-right text-sm select-text">
                {security.exchange}
              </span>
            </div>
            <div class="flex w-full justify-between select-none flex-wrap">
              Market Capitalization
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat({
                  notation:
                    Math.abs(security.marketCap ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.marketCap ?? 0)}
              </span>
            </div>

            <div class="flex w-full justify-between select-none flex-wrap">
              Previous close
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat()(security.closePrice ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between select-none flex-wrap">
              Price to Earning Ratio
              <span class="font-semibold text-right text-sm select-text">
                {decimalFormat({
                  notation:
                    Math.abs(security.priceToEarningsPerShare ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.priceToEarningsPerShare ?? 0)}
              </span>
            </div>

            <div class="flex w-full justify-between select-none flex-wrap">
              Sector
              <span class="font-semibold text-right text-sm select-text">
                {security.sector}
              </span>
            </div>
            <div class="flex w-full justify-between select-none flex-wrap">
              Volume
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat({
                  notation:
                    Math.abs(security.volume ?? 0) >= 10000
                      ? 'compact'
                      : 'standard',
                })(security.volume ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between select-none flex-wrap">
              Year Range
              <span class="font-semibold text-right text-sm select-text">
                {currencyFormat()(security.yearLow ?? 0)} - {currencyFormat()(
                  security.yearHigh ?? 0,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Trade bind:this={tradeModal} {buy} {security} />
    {/if}
  </div>
{/snippet}
