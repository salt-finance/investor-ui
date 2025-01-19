<dialog bind:this={dialogRef}>
  {#if dialogVisible}
    <div
      class="w-full max-w-96 glass-effect shadow-inner dark:bg-opacity-70 flex flex-col overflow-hidden sm:m-16 {closing
        ? 'motion-hide'
        : 'motion-preset-expand motion-duration-300'}"
    >
      <!--      HEADER-->
      <div
        class="p-4 text-white flex justify-between items-center {buy
          ? 'bg-emerald-600'
          : 'bg-yellow-600'}"
      >
        <div class="flex flex-col">
          <span class="uppercase font-semibold">{buy ? 'Buy' : 'Sell'}</span>
          <span class="text-xl font-semibold">{value?.name}</span>
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
      <div class="p-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <span>Unit price</span>
          <span> {currencyFormat()(value?.price ?? 0)}</span>
        </div>
        <div class="flex justify-between">
          <span>Cash available</span>
          <span>{currencyFormat()(50400.22)}</span>
        </div>
      </div>
      <div class="py-12 px-4 text-center flex flex-col justify-center">
        <div class="flex gap-4 justify-center mb-2">
          <button
            disabled={quantity === 0}
            class="text-base btn-icon rounded-full glass-effect"
            onclick={() => (quantity > 0 ? quantity-- : null)}
          >
            -
          </button>
          <input
            class="text-3xl select-none bg-transparent text-center max-w-16"
            bind:value={quantity}
            type="text"
            inputmode="numeric"
            size="3"
            pattern="\d*"
          />

          <button
            class="text-base btn-icon rounded-full glass-effect"
            onclick={() => quantity++}
          >
            +
          </button>
        </div>

        Shares to {buy ? 'buy' : 'sell'}
      </div>
      <div class="p-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <span>Total price</span>
          <span class="text-xl"
            >{currencyFormat({
              notation: Math.abs(total) >= 1000000 ? 'compact' : 'standard'
            })(total ?? 0)}</span
          >
        </div>

        <button class={buy ? 'btn-buy' : 'btn-sell'} onclick={hide}>
          Place {buy ? 'buy' : 'sell'} order
        </button>
      </div>
    </div>
  {/if}
</dialog>

<script lang="ts">
  import { currencyFormat } from 'utils/formatTools';

  let { value, buy } = $props();
  let dialogRef: HTMLDialogElement | undefined = $state();

  let quantity = $state(0);
  let closing = $state(false);
  let dialogVisible = $state(false);

  let total = $derived(quantity * (value?.price ?? 0));

  function hide(e: Event) {
    e.preventDefault();
    closing = true;
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
      dialogVisible = false;
    }, 500);
  }

  export function show() {
    dialogRef?.showModal();
    quantity = 0;
    dialogVisible = true;
  }
</script>
