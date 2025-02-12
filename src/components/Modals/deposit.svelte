<dialog bind:this={dialogRef}>
  {#if dialogVisible}
    <div
      class="w-full max-w-96 h-fit max-h-full rounded-xl card flex flex-col sm:mx-16 overflow-hidden p-6 {closing
        ? 'motion-hide'
        : 'motion-preset-expand motion-duration-300'}"
    >
      <!--      HEADER-->
      <div class="pb-4 flex justify-between w-auto items-center">
        <div class="flex flex-col">
          <span class="text-xl font-semibold">{verb()}</span>
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

      <BaseInput
        baseClass="mb-4"
        label="Available to {verb()}"
        value={currencyFormat()(availableAmount())}
        viewOnly
      />

      <BaseInput
        placeholder="1000.56"
        label="Enter amount"
        bind:value={amount}
      />

      <button
        disabled={amount === undefined ||
          amount <= 0 ||
          inProgress ||
          amount > availableAmount()}
        class="base-button primary-button mt-4 hover:dark-light-text focus:dark-light-text"
        onclick={handleSubmit}
      >
        {verb()}
        {currencyFormat()(amount ?? 0)}
      </button>
    </div>
  {/if}
</dialog>

<script lang="ts">
  import type { IAccount } from 'models/account';
  import { currencyFormat } from 'utils/formatTools';
  import BaseInput from 'components/Inputs/BaseInput.svelte';
  import { depositFunds, withdrawFunds } from '@/api/api_account.js';
  import { fetchAccounts } from '@/store/account';

  let dialogRef: HTMLDialogElement | undefined = $state();

  let closing = $state(false);

  let inProgress = $state(false);

  let amount: number | undefined = $state();

  let dialogVisible = $state(false);

  async function handleSubmit() {
    if (amount === undefined || amount <= 0 || amount > availableAmount()) {
      return;
    }
    inProgress = true;
    try {
      if (withdrawal) {
        await withdrawFunds(account, amount);
        // Withdraw funds
      } else {
        await depositFunds(account, amount);
        // Deposit funds
      }

      fetchAccounts().then(() => {
        hide();
      });
    } catch (e) {
      console.error(e);
    } finally {
      inProgress = false;
    }
  }

  function hide(e?: Event) {
    e?.preventDefault();
    closing = true;
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
      amount = undefined;
      dialogVisible = false;
    }, 500);
  }

  export function show() {
    dialogRef?.showModal();
    dialogVisible = true;
  }

  function verb(): string {
    if (withdrawal) {
      return 'Withdraw';
      // Withdraw funds
    }
    return 'Deposit';
    // Deposit funds
  }

  function availableAmount(): number {
    if (withdrawal) {
      return account?.balance?.cash ?? 0;
    }
    return account?.fundingMethod?.balance ?? 0;
  }

  interface Props {
    // core components
    account: IAccount;
    withdrawal?: boolean;
  }

  let { account, withdrawal }: Props = $props();
</script>
