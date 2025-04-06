<script lang="ts">
  import FundingMethod from 'components/Modals/FundingMethod.svelte'
  import Transact from 'components/Modals/Transact.svelte'
  import type { IAccount } from 'models/account'

  import BaseInput from 'components/Inputs/BaseInput.svelte'
  import type { SvelteComponent } from 'svelte'
  import { formatCurrencyWithNotation } from 'utils/formatTools'

  let withdrawal: boolean = $state(false)

  let fundModal: SvelteComponent | undefined = $state()
  let depositModal: SvelteComponent | undefined = $state()

  interface Props {
    // core components
    account: IAccount
  }

  let { account }: Props = $props()
</script>

<div id="fund" class="flex flex-col mb-6 glass-effect bg-opacity-40">
  <div
    class="flex-auto {account.fundingMethod != null
      ? 'p-4 lg:px-8 lg:py-10'
      : 'px-4 py-3'}">
    <h6
      class="text-sm mb-6 gap-4 font-bold flex-wrap flex items-center justify-between">
      <span class="flex flex-col body-text">
        Status
        {#if account.fundingMethod}
          <span class="text-emerald-500">Connected</span>
        {:else}
          <span class="text-amber-500">Unavailable</span>
        {/if}
      </span>
      <button
        class={account.fundingMethod
          ? 'dashed-button border-current'
          : 'base-button bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white hover:no-underline'}
        onclick={() => fundModal?.show()}>
        {#if account.fundingMethod}
          Change
          <span class="ml-4 material-symbols-outlined thin text-[1.5rem]">
            swap_horiz
          </span>
        {:else}
          Connect
          <span class="ml-4 material-symbols-outlined thin text-[1.5rem]">
            money
          </span>
        {/if}
      </button>
    </h6>
    {#if account.fundingMethod}
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 gap-2 flex flex-col">
          <BaseInput
            label="Active Funding method"
            value={account.fundingMethod.method}
            viewOnly />

          <BaseInput
            label="Available for deposit"
            value={formatCurrencyWithNotation(account.fundingMethod.balance)}
            viewOnly />
        </div>

        <div class="flex justify-between w-full mt-6">
          <button
            disabled={!account.fundingMethod.balance ||
              account.fundingMethod.balance <= 0}
            class="primary-button"
            onclick={() => {
              withdrawal = false
              depositModal?.show()
            }}>
            Deposit
          </button>
          <button
            class="secondary-button"
            onclick={() => {
              withdrawal = true
              depositModal?.show()
            }}>
            Withdraw
          </button>
        </div>
      </div>
      <Transact bind:this={depositModal} {account} {withdrawal} />
    {:else}
      <p class="body-text mb-5">Connect a funding method to start investing.</p>
    {/if}

    <FundingMethod bind:this={fundModal} {account} />
  </div>
</div>
