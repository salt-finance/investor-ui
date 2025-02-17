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
          <span class="text-xl font-semibold">{security?.name}</span>
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
          <span> {formatCurrencyWithNotation(security?.ask)}</span>
        </div>
        <div class="flex justify-between">
          <span>Cash available</span>
          <span class={canBuy() ? '' : 'text-amber-400'}
            >{currencyFormat()(account?.balance?.cash ?? 0)}</span
          >
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
            disabled={!canBuy()}
          >
            +
          </button>
        </div>

        Shares to {buy ? 'buy' : 'sell'}
      </div>
      <div class="p-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <span>Total price</span>
          <span class="text-xl">{formatCurrencyWithNotation(total)}</span>
        </div>

        <button
          disabled={!valid()}
          class={buy ? 'btn-buy' : 'btn-sell'}
          onclick={buyNow}
        >
          Place {buy ? 'buy' : 'sell'} order
        </button>
      </div>
    </div>
  {/if}
</dialog>

<script lang="ts">
  import {
    currencyFormat,
    formatCurrencyWithNotation
  } from 'utils/formatTools';
  import { accountStore, fetchAccounts } from '@/store/account';
  import type { IAccount } from 'models/account';
  import { onDestroy } from 'svelte';
  import { buySecurity } from '@/api/api_holding';
  import type { ISecurity } from 'models/security';

  let { security, buy } = $props<{
    security: ISecurity;
    buy: boolean;
  }>();
  let dialogRef: HTMLDialogElement | undefined = $state();

  let account: IAccount | undefined = $state();

  let quantity = $state(0);
  let closing = $state(false);
  let dialogVisible = $state(false);

  const accountSubscription = accountStore.subscribe((value) => {
    account = value;
  });

  onDestroy(accountSubscription);

  let total = $derived(quantity * (security?.ask ?? 0));

  function buyNow() {
    if (!account) {
      return;
    }
    buySecurity(account.id, security.id, quantity).then(() => {
      fetchAccounts().finally(() => {
        hide();
      });
    });
  }

  function canBuy() {
    if (!account?.balance?.cash) {
      return false;
    }
    return account.balance.cash - total >= security.ask;
  }

  function valid() {
    if (!account?.balance?.cash || !total) {
      return false;
    }
    return account.balance.cash - total >= security.ask;
  }

  function hide(e?: Event) {
    e?.preventDefault();
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
