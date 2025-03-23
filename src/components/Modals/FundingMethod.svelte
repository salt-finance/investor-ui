<script lang="ts">
  import {
    getAvailableFundingMethods,
    linkFundingMethod,
  } from '@/api/api_account'
  import type { IAccount, IFundingMethod } from 'models/account'
  import { fetchAccounts } from '@/store/account'
  import { mount, onMount, unmount } from 'svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import Loading from 'components/Loading.svelte'

  let fundingMethods: IFundingMethod[] | undefined = $state()

  let selectedMethod: string | undefined = $state()

  interface Props {
    // core components
    account: IAccount
  }

  let { account }: Props = $props()

  async function selectFundingMethod() {
    if (!selectedMethod || selectedMethod.length === 0) return
    const result = await linkFundingMethod(account, selectedMethod)

    if (result.error !== null) {
      return
    }
    await fetchAccounts()
    hide()
  }

  onMount(async () => {
    const result = await getAvailableFundingMethods()

    if (result.data) {
      fundingMethods = result.data.response
    }
  })

  let target: HTMLElement

  let modal: Record<string, any>

  async function hide() {
    selectedMethod = undefined
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
  <span class="text-xl font-semibold">
    {account.fundingMethod
      ? 'Change funding method'
      : 'Connect a funding method'}
  </span>
{/snippet}

{#snippet body()}
  {#if fundingMethods !== undefined}
    Select funding method to use.
    <div class="flex gap-3 flex-col mt-4">
      {#each fundingMethods as method}
        <label
          class="card flex cursor-pointer rounded-lg items-center border-accent border border-opacity-0 has-[input:checked]:border-opacity-50 transition-all hover:border-opacity-50 justify-between p-4">
          <span>{method.method}</span>

          <input
            checked={selectedMethod === method.id}
            bind:group={selectedMethod}
            value={method.id}
            class="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-accent checked:ring-accent transition-all"
            type="radio" />
        </label>
      {/each}
    </div>

    <button
      disabled={selectedMethod === undefined}
      onclick={selectFundingMethod}
      class="secondary-button gap-4 mt-8">
      Confirm
    </button>
  {:else}
    <Loading />
  {/if}
{/snippet}
