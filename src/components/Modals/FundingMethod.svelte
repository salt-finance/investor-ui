<script lang="ts">
  import {
      getAvailableFundingMethods,
      linkFundingMethod,
  } from '@/api/api_account'
  import { fetchAccounts } from '@/store/account'
  import Loading from 'components/Loading.svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import type { IAccount, IFundingMethod } from 'models/account'
  import { mount, onMount, unmount } from 'svelte'
  import { circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

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
        'w-full max-w-96 max-h-full rounded-xl card flex h-auto flex-col sm:mx-16 overflow-hidden p-6 transition-transform',
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
  <div
    class="flex flex-col  transition-all duration-300
{selectedMethod !== undefined ? 'h-auto' : ''}
">
    {#if fundingMethods !== undefined}
      <span
        in:fly|global={{
          // easing: circInOut,
          easing: circOut,
          y: 50,
          delay: 200,
          duration: 500,
        }}>
        Select funding method to use.
      </span>

      <div class="flex gap-3 flex-col mt-4">
        {#each fundingMethods as method, index}
          <label
            in:fly|global={{
              // easing: circInOut,
              easing: circOut,
              x: 50,
              duration: 500,
              delay: 200 * index,
            }}
            
            class="card flex cursor-pointer rounded-lg items-center border-accent border border-opacity-0 has-[input:checked]:border-opacity-50 transition-all hover:border-opacity-50 justify-between p-4">
            <span>{method.method}</span>

            <input
              checked={selectedMethod === method.id}
              bind:group={selectedMethod}
              value={method.id}
              tabindex="0"
              class="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-accent checked:ring-accent transition-all"
              type="radio" />
          </label>
        {/each}
      </div>

      {#if selectedMethod !== undefined}
        <button
          in:fly={{
            // easing: circInOut,
            easing: circOut,
            y: 50,
            delay: 0,
            duration: 500,
          }}
          onclick={selectFundingMethod}
          class="primary-button gap-4 mt-8">
          Confirm
        </button>
      {/if}
    {:else}
      <Loading />
    {/if}
  </div>
{/snippet}
