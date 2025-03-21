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
          {#if buy}
            <span>Cash available</span>
            <span class={canBuy() ? '' : 'text-amber-400'}
              >{currencyFormat()(account?.balance?.cash ?? 0)}</span
            >
          {:else}
            <span>Shares held</span>
            <span class={canBuy() ? '' : 'text-amber-400'}
              >{holding?.quantity ?? 0}</span
            >
          {/if}
        </div>
      </div>
      <div class="py-12 px-4 text-center flex flex-col justify-center">
        <div class="flex gap-4 justify-center mb-2">
          <button
            disabled={quantity === 0 || processing}
            class="text-base btn-icon rounded-full glass-effect"
            onclick={() => (quantity > 0 ? quantity-- : null)}
          >
            -
          </button>
          <input
            class="text-3xl select-none bg-transparent text-center max-w-16"
            bind:value={quantity}
            type="text"
            disabled={processing}
            inputmode="numeric"
            size="3"
            pattern="\d*"
          />

          <button
            class="text-base btn-icon rounded-full glass-effect"
            onclick={() => quantity++}
            disabled={!canBuy() || processing}
          >
            +
          </button>
        </div>

        Shares to {buy ? 'buy' : 'sell'}
      </div>
      <div class="p-4 flex flex-col gap-4">
        <div class="flex justify-between">
          <span> Total </span>
          <span class="text-xl">{formatCurrencyWithNotation(total)}</span>
        </div>

        {#if !buy}
          <button
            disabled={processing || (holding?.quantity ?? 0) == 0}
            class="secondary-button"
            onclick={() => (quantity = holding?.quantity ?? 0)}
          >
            Sell all shares
          </button>
        {/if}

        {#if account?.fundingMethod == null}
          <a
            href="/dashboard/settings"
            use:link
            class=" base-button bg-amber-600 hover:bg-amber-700 text-white hover:text-white hover:no-underline"
          >
            Add funding account
            <span class="ml-4 material-symbols-outlined">money </span>
          </a>
        {:else}
          <button
            disabled={!valid() || processing}
            class="flex justify-center items-center gap-1 {buy
              ? 'btn-buy'
              : 'btn-sell'}"
            onclick={buyNow}
          >
            Place {buy ? 'buy' : 'sell'} order
            {#if processing}
              <Loading />
            {/if}
          </button>
        {/if}
      </div>
    </div>
  {/if}
</dialog>

<script lang="ts">
  import {
    currencyFormat,
    formatCurrencyWithNotation
  } from 'utils/formatTools';
  import {
    accountStore,
    fetchAccounts,
    fetchHoldings,
    holdingsStore
  } from '@/store/account';
  import type { IAccount } from 'models/account';
  import { onDestroy } from 'svelte';
  import { buySecurity, sellSecurity } from '@/api/api_holding';
  import type { ISecurity } from 'models/security';
  import type { IHolding } from 'models/holding';
  import Loading from 'components/Loading.svelte';

  import { link } from 'svelte-spa-router';

  let { security, buy } = $props<{
    security: ISecurity;
    buy: boolean;
  }>();
  let dialogRef: HTMLDialogElement | undefined = $state();

  let account: IAccount | undefined = $state();

  let holding: IHolding | undefined = $state();
  let processing = $state(false);

  let quantity = $state(0);
  let closing = $state(false);
  let dialogVisible = $state(false);

  const accountSubscription = accountStore.subscribe((value) => {
    account = value;
  });

  const holdingSubscription = holdingsStore.subscribe((holdings) => {
    holding = holdings?.find((v) => v.securityId === security.id);
  });

  onDestroy(() => {
    accountSubscription;
    holdingSubscription;
  });

  let total = $derived(quantity * (security?.ask ?? 0));

  async function buyNow() {
    if (!account) {
      return;
    }
    processing = true;

    try {
      if (buy) {
        await buySecurity(account.id, security.id, quantity);
      } else {
        await sellSecurity(account.id, security.id, quantity);
      }
      await fetchAccounts();
      await fetchHoldings(account?.id, true);

      quantity = 0;
    } finally {
      processing = false;
    }
  }

  function canBuy() {
    if (!account?.balance?.cash) {
      return false;
    }

    if (buy) {
      return account.balance.cash - total >= security.ask;
    }
    return quantity < (holding?.quantity ?? 0);
  }

  function valid() {
    if (!total) {
      return false;
    }
    if (buy) {
      return (
        (account?.balance?.cash ?? 0) > 0 &&
        (account?.balance?.cash ?? 0 - total) >= security.ask
      );
    }
    return quantity > 0 && quantity <= (holding?.quantity ?? 0);
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
