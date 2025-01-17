<dialog bind:this={dialogRef}>
  <div
    class="w-full h-5/6 max-h-screen xl:max-w-screen-lg glass-effect border-0 dark:bg-opacity-75 bg-opacity-75 flex flex-col sm:m-16 overflow-hidden {closing
      ? 'motion-hide'
      : 'motion-preset-expand motion-duration-300'}"
  >
    <!--      HEADER-->
    <div class="p-4 text-white flex justify-between items-center dark-light-bg">
      <div class="flex flex-col">
        <span class="font-semibold text-lg"
          >Security Details | {security?.symbol}</span
        >
      </div>

      <button class="close-icon" id="cancel" onclick={hide} type="reset">
        <span class="material-symbols-outlined skiptranslate">
          cancel
        </span></button
      >
    </div>

    <!--    BODY -->
    <div class="p-4 flex flex-col gap-4 h-full overflow-y-scroll">
      <!--      Security Title-->
      <div class="flex justify-between flex-wrap gap-4">
        <div class="flex items-center gap-4">
          <img
            class="rounded-full border-none aspect-square items-center h-20"
            src={security.logoUrl}
            alt="logo"
          />
          <div>
            <span class="text-lg font-semibold mr-2">{security?.name}</span>
            <p>{security?.exchange}:{security?.symbol}</p>
          </div>
        </div>
        <div class="flex gap-4 items-end">
          <button
            class="btn-buy p-2 px-4"
            onclick={(e) => {
              e.preventDefault();
              buy = true;
              tradeModal?.show();
            }}
          >
            Buy
          </button>
          <button
            class="btn-sell p-2 px-4"
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
        <div class="col-span-1 lg:col-span-3">
          <div class="flex gap-2 w-full flex-wrap md:flex-nowrap">
            <div class="card p-4 w-full gap-2 flex flex-col">
              Open Price
              <span class="text-xl">
                {currencyFormat({
                  notation:
                    Math.abs(security.price) >= 10000 ? 'compact' : 'standard'
                })(security.price)}
              </span>
            </div>
            <div class="card p-4 w-full gap-2 flex flex-col">
              Market Cap
              <span class="text-xl">
                {currencyFormat({
                  notation:
                    Math.abs(security.marketCap) >= 10000
                      ? 'compact'
                      : 'standard'
                })(security.marketCap)}
              </span>
            </div>
            <div class="card p-4 w-full gap-2 flex flex-col">
              Volume
              <span class="text-xl">
                {currencyFormat({
                  notation:
                    Math.abs(security.volume) >= 10000 ? 'compact' : 'standard'
                })(security.volume)}
              </span>
            </div>
          </div>

          <div class="card p-4 mt-2">
            <CardLineChart />
          </div>
        </div>

        <div class="card p-4 col-span-1 lg:col-span-2">
          <span class="font-semibold block text-lg">Details</span>
          <span>{security.description}</span>
          <hr class="opacity-50 my-4" />

          <div class="flex flex-col gap-4">
            <div class="flex w-full justify-between">
              Closed before
              <span class="font-semibold">
                {currencyFormat()(security.closePrice ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Day Range
              <span class="font-semibold text-right">
                {currencyFormat()(security.dayLow ?? 0)} - {currencyFormat()(
                  security.dayHigh ?? 0
                )}
              </span>
            </div>

            <div class="flex w-full justify-between">
              Earnings per share
              <span class="font-semibold whitespace-nowrap">
                {currencyFormat({
                  notation:
                    Math.abs(security.earningsPerShare) >= 10000
                      ? 'compact'
                      : 'standard'
                })(security.earningsPerShare ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Main Exchange
              <span class="font-semibold whitespace-nowrap">
                {security.exchange}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Market Capitalization
              <span class="font-semibold">
                {currencyFormat({
                  notation:
                    Math.abs(security.marketCap) >= 10000
                      ? 'compact'
                      : 'standard'
                })(security.marketCap ?? 0)}
              </span>
            </div>

            <div class="flex w-full justify-between">
              Price to Earning Ratio
              <span class="font-semibold whitespace-nowrap">
                {decimalFormat({
                  notation:
                    Math.abs(security.priceToEarningsPerShare) >= 10000
                      ? 'compact'
                      : 'standard'
                })(security.priceToEarningsPerShare ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Sector
              <span class="font-semibold whitespace-nowrap">
                {security.sector}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Volume
              <span class="font-semibold whitespace-nowrap">
                {currencyFormat({
                  notation:
                    Math.abs(security.volume) >= 10000 ? 'compact' : 'standard'
                })(security.volume ?? 0)}
              </span>
            </div>
            <div class="flex w-full justify-between">
              Year Range
              <span class="font-semibold text-right">
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
</dialog>

<Trade bind:this={tradeModal} {buy} value={security} />

<script lang="ts">
  import { currencyFormat, decimalFormat } from 'utils/formatTools';
  import type { iSecurity } from 'models/security';
  import CardLineChart from 'components/Cards/CardLineChart.svelte';
  import Trade from 'components/Modals/trade.svelte';
  import type { SvelteComponent } from 'svelte';

  let tradeModal: SvelteComponent;
  let buy = $state(true);

  let { security } = $props<{ security: iSecurity }>();
  let dialogRef: HTMLDialogElement | undefined = $state();

  let closing = $state(false);

  function hide(e: Event) {
    e.preventDefault();
    closing = true;
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
    }, 500);
  }

  export function show() {
    dialogRef?.showModal();
  }
</script>
