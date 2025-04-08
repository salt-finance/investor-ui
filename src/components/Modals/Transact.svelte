<script lang="ts">
  import { depositFunds, withdrawFunds } from '@/api/api_account.js'
  import { fetchAccounts } from '@/store/account'
  import BaseInput from 'components/Inputs/BaseInput.svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import { mount, unmount } from 'svelte'
  import { decimalFormat, formatCurrencyWithNotation } from 'utils/formatTools'

  import Loading from 'components/Loading.svelte'
  import type { IAccount } from 'models/account'
  import { circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  let inProgress = $state(false)

  let amount: number | undefined = $state()

  async function handleSubmit() {
    if (amount === undefined || amount <= 0 || amount > availableAmount()) {
      return
    }
    inProgress = true
    let result
    if (withdrawal) {
      result = await withdrawFunds(account, amount)
      // Withdraw funds
    } else {
      result = await depositFunds(account, amount)
      // Deposit funds
    }

    if (result.error !== null) {
      console.error(result.error)
      inProgress = false
      return
    }

    await fetchAccounts()
    amount = 0
    inProgress = false
  }

  function verb(): string {
    if (withdrawal) {
      return 'Withdraw'
      // Withdraw funds
    }
    return 'Deposit'
    // Deposit funds
  }

  function availableAmount(): number {
    if (withdrawal) {
      return account?.balance?.cash ?? 0
    }
    return account?.fundingMethod?.balance ?? 0
  }

  interface Props {
    // core components
    account: IAccount
    withdrawal?: boolean
  }

  let { account, withdrawal }: Props = $props()

  function format() {
    return amount
      ? decimalFormat({ maximumFractionDigits: 2 })(amount)
      : undefined
  }

  function formatValue(v: any) {
    if (!v || v.length < 1) {
      amount = undefined
      return
    }

    if (v.split('.')[0].replaceAll(/\D/g, '').length === 0) {
      amount = undefined
      return
    }
    const clean = parseFloat(v.replaceAll(',', ''))
    if (clean > availableAmount()) {
      return
    }
    amount = clean
  }

  let target: HTMLElement

  let modal: Record<string, any>

  async function hide() {
    amount = undefined
    // close modal
    await unmount(modal, { outro: true })
  }

  // noinspection JSUnusedGlobalSymbols
  export function show() {
    // noinspection JSUnusedGlobalSymbols
    let props = {
      hide: hide,
      title: title,
      body: body,
      loading: false,
      headerClass: 'pb-4 flex justify-between w-auto items-center',
      modalClass:
        'w-full max-w-96 h-fit max-h-full rounded-xl card flex flex-col sm:mx-16 overflow-hidden p-6',
    }
    modal = mount(ModalDialog, { props, target })
  }
</script>

<div bind:this={target}></div>

{#snippet title()}
  <span class="text-xl font-semibold">{verb()}</span>
{/snippet}

{#snippet body()}
  <div class="flex justify-between mb-4">
    <span
      in:fly|global={{
        // easing: circInOut,
        easing: circOut,
        x: -50,
        delay: 200,
        duration: 500,
      }}>
      Available to {verb()}
    </span>
    <span
      in:fly|global={{
        // easing: circInOut,
        easing: circOut,
        x: 50,
        delay: 400,
        duration: 500,
      }}
      class={availableAmount() === amount ? 'text-amber-500' : ''}>
      {formatCurrencyWithNotation(availableAmount())}
    </span>
  </div>

  <div
    transition:fly|global={{
      // easing: circInOut,
      easing: circOut,
      y: 50,
      delay: 200,
      duration: 500,
    }}>
    <BaseInput
      inputClass="py-4"
      placeholder="0.00"
      prependIcon="money"
      disabled={availableAmount() <= 0}
      label="Enter amount"
      bind:value={() => format(), (v) => formatValue(v)} />
  </div>

  <button
    transition:fly|global={{
      // easing: circInOut,
      easing: circOut,
      y: 50,
      delay: 400,
      duration: 500,
    }}
    disabled={amount === undefined ||
      amount <= 0 ||
      inProgress ||
      amount > availableAmount()}
    class="base-button primary-button mt-4 hover:dark-light-text focus:dark-light-text transition-all duration-500"
    onclick={handleSubmit}>
    {verb()}
    {#if amount}
      {formatCurrencyWithNotation(amount)}
    {/if}
    {#if inProgress}
      <Loading />
    {/if}
  </button>
{/snippet}
