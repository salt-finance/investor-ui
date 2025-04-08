<script lang="ts">
  import { findSecurities } from '@/api/api_security'
  import BaseInput from 'components/Inputs/BaseInput.svelte'
  import Tearsheet from 'components/Modals/Tearsheet.svelte'
  import type { ISecurity } from 'models/security'
  import { type SvelteComponent } from 'svelte'
  import { circInOut } from 'svelte/easing'
  import { slide } from 'svelte/transition'

  let tearsheetModal: SvelteComponent | undefined = $state()

  let searchTerm = $state('')
  let securities: ISecurity[] = $state([])
  let timeout: NodeJS.Timeout
  let searching = $state(false)

let  controller = new AbortController();


  const openTearsheet = (data: ISecurity) => {
    tearsheetModal?.show(undefined, data.id)
  }

  async function getProducts() {
    if (!searchTerm) {
      reset()
      return
    }

    searching = true

    const result = await findSecurities(searchTerm, controller)
    searching = false

    if (result.error) {
     if(result.error as unknown as string !== 'cancel'){
      handleError()
     }
      
    }

    if (result.data) {
      securities = result.data.response
    }
  }

  function handleSearch() {

    if (timeout) {
      clearTimeout(timeout)
    }
    if(searching){
      controller.abort("cancel");
      controller = new AbortController();
    }
    
    timeout = setTimeout(getProducts, 300)
  }

  function handleError() {
    reset()
  }

  function reset() {
    securities = []
    searchTerm = ''
    searching = false
  }
</script>

<div
  class="md:justify-self-end w-full relative"
  onfocusoutcapture={async (e) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      reset()
    }
  }}>
  <BaseInput
    inputClass="py-4"
    placeholder="Search stock"
    prependIcon="search"
    oninput={handleSearch}
    onfocusout={(e) => e.preventDefault}
    bind:value={searchTerm}></BaseInput>

  {#if securities.length > 0}
    <div
      class="card w-full absolute text-left rounded-t-none z-20 top-[90%]"
      transition:slide={{
        axis: 'y',
        easing: circInOut,
        duration: 200,
      }}>
      <div class="flex flex-col">
        {#each securities as security}
          <button
            tabindex="0"
            onclick={() => openTearsheet(security)}
            class="w-full py-2 px-4 hover:bg-accent/30 dark:hover:bg-accent-dark/30 border-neutral-500 border-b border-opacity-50">
            <span class="flex justify-between sm:flex-col text-left">
              <strong>{security.symbol}</strong>
              <span>{security.name}</span>
            </span>
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <Tearsheet bind:this={tearsheetModal} />
</div>
