<dialog class="tearsheet" bind:this={dialogRef}>
  {#if security !== undefined}
    <div
      class="w-full h-fit max-h-full lg:max-w-screen-lg rounded-xl card flex flex-col sm:mx-16 overflow-hidden {closing
        ? 'motion-hide'
        : 'motion-preset-expand'}"
    >
      <!--      HEADER-->
      <div class="py-4 mx-4 flex justify-between w-auto items-center">
        <div class="flex flex-col">
          <span class="font-semibold text-lg"
            >Security Details | {security?.symbol}</span
          >
        </div>

        <button
          class="close-icon text-2xl"
          id="cancel"
          onclick={hide}
          type="reset"
        >
          <span class="material-symbols-outlined skiptranslate">
            cancel
          </span></button
        >
      </div>

      <!--    BODY -->
      <div class="p-4 pt-1 flex flex-col gap-4 h-full overflow-y-scroll z-10">
        <!--      Security Title-->
        <div
          class="flex justify-between flex-wrap gap-4 p-4 order-2 md:order-none sticky md:-top-1 bottom-0 z-10 card"
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
                e.preventDefault();
                buy = true;
                tradeModal?.show();
              }}
            >
              Buy
            </button>
            <button
              class="btn-sell p-2 px-4 w-full"
              onclick={(e) => {
                e.preventDefault();
                buy = false;
                tradeModal?.show();
              }}
            >
              Sell
            </button>
          </div>
        </div>
        <!--Security body-->

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-2 w-full flex-wrap">
          <div class="col-span-1 lg:col-span-3 flex flex-col">
            <div class="flex gap-2 w-full flex-wrap md:flex-nowrap">
              <div class="card p-4 w-full gap-2 flex flex-col">
                Open Price
                <span class="text-xl">
                  {currencyFormat({
                    notation:
                      Math.abs(security.price ?? 0) >= 10000
                        ? 'compact'
                        : 'standard'
                  })(lineChart?.latest())}
                </span>
              </div>
              <div class="card p-4 w-full gap-2 flex flex-col">
                Market Cap
                <span class="text-xl">
                  {currencyFormat({
                    notation:
                      Math.abs(security.marketCap ?? 0) >= 10000
                        ? 'compact'
                        : 'standard'
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
                        : 'standard'
                  })(security.volume ?? 0)}
                </span>
              </div>
            </div>

            <div class="card mt-2 flex-grow grid h-96 lg:h-auto">
              <div class="m-4 h-[95%]">
                <CardLineChart
                  bind:this={lineChart}
                  startingValue={security.price}
                  range={(security.price ?? 0) * 0.01}
                />
              </div>
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
                    security.dayHigh ?? 0
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
                        : 'standard'
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
                        : 'standard'
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
                        : 'standard'
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
                        : 'standard'
                  })(security.volume ?? 0)}
                </span>
              </div>
              <div class="flex w-full justify-between select-none flex-wrap">
                Year Range
                <span class="font-semibold text-right text-sm select-text">
                  {currencyFormat()(security.yearLow ?? 0)} - {currencyFormat()(
                    security.yearHigh ?? 0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <Trade bind:this={tradeModal} {buy} value={security} />
</dialog>

<script lang="ts">
  import { currencyFormat, decimalFormat } from 'utils/formatTools';
  import type { ISecurity } from 'models/security';
  import CardLineChart from 'components/Cards/CardLineChart.svelte';
  import Trade from 'components/Modals/trade.svelte';
  import { type SvelteComponent } from 'svelte';
  import RoundedImage from 'components/RoundedImage.svelte';

  let tradeModal: SvelteComponent;
  let buy = $state(true);

  let security: ISecurity | undefined = $state();

  let dialogRef: HTMLDialogElement | undefined = $state();

  let closing = $state(false);

  function hide(e: Event) {
    e.preventDefault();
    lineChart?.destroy();
    closing = true;
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
    }, 500);
  }

  let lineChart: SvelteComponent | undefined = $state();

  $effect(() => {
    if (lineChart) {
      lineChart?.show();
    }
  });

  export function show(securityToShow: ISecurity) {
    security = securityToShow;
    lineChart?.show();
    dialogRef?.showModal();
  }
</script>
