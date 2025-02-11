<div class="flex flex-col mb-6 card bg-opacity-40">
  <div class="flex-auto p-4 lg:py-10 lg:px-8">
    {#if account.fundingMethod != null}
      <h6
        class="text-neutral-500 text-sm mb-6 gap-4 font-bold flex-wrap uppercase flex items-center justify-between"
      >
        Active Funding Method
        <button
          class="base-button secondary-button border-dashed border-neutral-500"
          onclick={() => fundModal?.show()}
          >Change
        </button>
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 gap-2 flex flex-col">
          <BaseInput
            label="Funding Method"
            value={account.fundingMethod.method}
            viewOnly
          />
          <BaseInput
            label="Available Balance"
            value={currencyFormat()(account.fundingMethod.balance ?? 0)}
            viewOnly
          />
        </div>
      </div>
    {:else}
      <h6 class="body-text text-sm mb-6 text-amber-500">
        <span class="material-symbols-outlined">priority_high </span>
        No funding method linked
      </h6>

      <button
        class="base-button primary-button"
        onclick={() => fundModal?.show()}
        >Link a funding method
      </button>
    {/if}

    <Fund bind:this={fundModal} {account} />
  </div>
</div>

<script lang="ts">
  import type { IAccount } from 'models/account';
  import Fund from 'components/Modals/fund.svelte';
  import type { SvelteComponent } from 'svelte';
  import BaseInput from 'components/Inputs/BaseInput.svelte';
  import { currencyFormat } from 'utils/formatTools';

  let fundModal: SvelteComponent | undefined = $state();

  interface Props {
    // core components
    account: IAccount;
  }

  let { account }: Props = $props();
</script>
