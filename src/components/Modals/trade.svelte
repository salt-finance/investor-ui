<script lang="ts">
  import { buySecurity, sellSecurity } from '@/api/api_holding'
  import {
      accountStore,
      fetchAccounts,
      fetchHoldings,
      holdingsStore,
  } from '@/store/account'
  import Loading from 'components/Loading.svelte'
  import type { IAccount } from 'models/account'
  import type { IHolding } from 'models/holding'
  import type { ISecurity } from 'models/security'
  import { mount, onDestroy, unmount } from 'svelte'
  import { currencyFormat, formatCurrencyWithNotation } from 'utils/formatTools'

  import BaseCheckbox from 'components/Inputs/BaseCheckbox.svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import { type Result } from 'models/trycatch'
  import { link } from 'svelte-spa-router'

  let { security, buy } = $props<{
    security: ISecurity
    buy: boolean
  }>()

  let account: IAccount | undefined = $state()

  let holding: IHolding | undefined = $state()
  let processing = $state(false)

  let quantity = $state(0)

  const accountSubscription = accountStore.subscribe((value) => {
    account = value
  })

  const holdingSubscription = holdingsStore.subscribe((holdings) => {
    holding = holdings?.find((v) => v.securityId === security.id)
  })

  onDestroy(async () => {
    accountSubscription
    holdingSubscription
  })

  let total = $derived(quantity * (security?.ask ?? 0))

  async function buyNow() {
    if (!account) {
      return
    }
    processing = true

    let result: Result<any>
    if (buy) {
      result = await buySecurity(account.id, security.id, quantity)
    } else {
      result = await sellSecurity(account.id, security.id, quantity)
    }

    if (result.error !== null) {
      processing = false
      console.trace(result.error)
      return
    }

    await fetchAccounts()
    await fetchHoldings(account?.id, true)
    quantity = 0

    processing = false
  }

  function canBuy() {
    if (!account?.balance?.cash) {
      return false
    }

    if (buy) {
      return account.balance.cash - total >= security.ask
    }
    return quantity < (holding?.quantity ?? 0)
  }

  function valid() {
    if (!total) {
      return false
    }
    if (buy) {
      return (
        (account?.balance?.cash ?? 0) > 0 &&
        (account?.balance?.cash ?? 0 - total) >= security.ask
      )
    }
    return quantity > 0 && quantity <= (holding?.quantity ?? 0)
  }

  // Modal functions
  let target: HTMLElement

  let modal: Record<string, any>

  async function hide() {
    await unmount(modal, { outro: true })
  }

  // noinspection JSUnusedGlobalSymbols
  export function show() {
    quantity = 0

    // noinspection JSUnusedGlobalSymbols
    let props = {
      hide: hide,
      title: title,
      body: body,
      loading: false,
      modalClass:
        'w-full max-w-96 glass-effect shadow-inner bg-opacity-90 dark:bg-opacity-90 flex flex-col overflow-hidden sm:m-1',
      headerClass: `p-4 flex justify-between items-center ${
        buy ? 'bg-buy text-buy-foregorund' : 'bg-sell text-sell-foregorund'
      }`,
    }
    modal = mount(ModalDialog, { props, target })
  }
</script>

<div bind:this={target}></div>

{#snippet title()}
  <div class="flex flex-col">
    <span class="uppercase font-semibold">{buy ? 'Buy' : 'Sell'}</span>
    <span class="text-xl font-semibold">{security?.name}</span>
  </div>
{/snippet}

{#snippet body()}
  <div class="p-4 flex flex-col gap-4">
    <div class="flex justify-between">
      <span>Unit price</span>
      <span>{formatCurrencyWithNotation(security?.ask)}</span>
    </div>
    <div class="flex justify-between">
      {#if buy}
        <span>Cash available</span>
        <span class={canBuy() ? '' : 'text-amber-400'}>
          {currencyFormat()(account?.balance?.cash ?? 0)}
        </span>
      {:else}
        <span>Shares held</span>
        <span class={canBuy() ? '' : 'text-amber-400'}>
          {holding?.quantity ?? 0}
        </span>
      {/if}
    </div>
  </div>
  <div class="py-12 px-4 text-center flex flex-col justify-center">
    <div class="flex gap-4 justify-center mb-2">
      <button
        disabled={quantity === 0 || processing}
        class=" rounded-full secondary-button aspect-square min-h-full p-5"
        onclick={() => (quantity > 0 ? quantity-- : null)}>
        -
      </button>
      <input
        class="text-3xl select-none bg-transparent text-center max-w-16"
        bind:value={quantity}
        type="text"
        disabled={processing}
        inputmode="numeric"
        size="3"
        pattern="\d*" />

      <button
        class="rounded-full primary-button aspect-square min-h-full p-5"
        onclick={() => quantity++}
        disabled={!canBuy() || processing}>
        +
      </button>
    </div>

    Shares to {buy ? 'buy' : 'sell'}
  </div>
  <div class="p-4 flex flex-col gap-4">
    <div class="flex justify-between">
      <span>Total</span>
      <span class="text-xl">{formatCurrencyWithNotation(total)}</span>
    </div>

    {#if !buy && holding !== undefined}
      <BaseCheckbox
        disabled={processing || (holding.quantity ?? 0) === 0}
        label={'Sell all shares'}
        checked={quantity === holding.quantity}
        onchange={() =>
          (quantity =
            quantity === holding?.quantity ? 0 : (holding?.quantity ?? 0))} />
    {/if}

    {#if account?.fundingMethod == null}
      <a
        href="/dashboard/settings"
        use:link
        class=" base-button bg-amber-600 hover:bg-amber-700 text-white hover:text-white hover:no-underline">
        Add funding account
        <span class="ml-4 material-symbols-outlined">money</span>
      </a>
    {:else}
      <button
        disabled={!valid() || processing}
        class="flex justify-center items-center gap-1 {buy
          ? 'btn-buy'
          : 'btn-sell'}"
        onclick={buyNow}>
        Place {buy ? 'buy' : 'sell'} order
        {#if processing}
          <Loading />
        {/if}
      </button>
    {/if}
  </div>
{/snippet}
