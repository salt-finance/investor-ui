<dialog bind:this={dialogRef}>
  {#if dialogVisible}
    <div
      class="w-full h-fit max-h-full lg:max-w-screen-lg rounded-xl card flex flex-col sm:mx-16 overflow-hidden p-4 {closing
        ? 'motion-hide'
        : 'motion-preset-expand motion-duration-300'}"
    >
      <!--      HEADER-->
      <div class="py-4 flex justify-between w-auto items-center">
        <div class="flex flex-col">
          <span class="text-xl font-semibold">Connect a funding method</span>
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

      Select funding method from the available methods below.

      {#if fundingMethods !== undefined}
        <div class="flex gap-10 flex-col">
          {#each fundingMethods as method}
            <div class="flex gap-4 gap-y-10 mt-4 items-center">
              <span>{method.method}</span>

              <input
                disabled={loadingMethod !== undefined}
                type="checkbox"
                onchange={() => selectFundingMethod(method)}
              />
              {#if loadingMethod === method}
                <span>...</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</dialog>

<script lang="ts">
  import {
    getAvailableFundingMethods,
    linkFundingMethod
  } from '@/api/api_account';
  import type { IAccount, IFundingMethod } from 'models/account';
  import { fetchAccounts } from '@/store/account';

  let dialogRef: HTMLDialogElement | undefined = $state();

  let closing = $state(false);
  let dialogVisible = $state(false);

  let fundingMethods: IFundingMethod[] | undefined = $state();

  let loadingMethod: IFundingMethod | undefined = $state();

  function hide(e?: Event) {
    e?.preventDefault();
    closing = true;
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
      loadingMethod = undefined;
      dialogVisible = false;
    }, 500);
  }

  export function show() {
    dialogRef?.showModal();
    dialogVisible = true;
  }

  interface Props {
    // core components
    account: IAccount;
  }

  let { account }: Props = $props();

  function selectFundingMethod(method: IFundingMethod) {
    loadingMethod = method;
    linkFundingMethod(account, method).then(() => {
      fetchAccounts().then(() => {
        hide();
      });
    });
  }

  getAvailableFundingMethods().then((res) => {
    fundingMethods = res.response;
  });
</script>
