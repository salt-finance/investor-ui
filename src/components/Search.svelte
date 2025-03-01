<div class="md:justify-self-end w-full sm:w-fit relative">
  <BaseInput
    inputClass="py-4"
    placeholder="Search stock"
    prependIcon="search"
    oninput={handleSearch}
    onfocusout={() => setTimeout(reset, 500)}
    bind:value={searchTerm}
  ></BaseInput>

  {#if searching || securities.length > 0}
    <div class="card w-full absolute text-left rounded-t-none">
      {#if searching}
        <div class="p-2">
          <Loading />
        </div>
      {:else if securities.length > 0}
        <div class="flex flex-col">
          {#each securities as security}
            <button
              onclick={() => openTearsheet(security)}
              class="w-full py-2 px-4 hover:bg-accent/30 dark:hover:bg-accent-dark/30 border-neutral-500 border-b border-opacity-50"
            >
              <span class="flex justify-between sm:flex-col text-left">
                <strong>{security.symbol}</strong>
                <span>{security.name}</span>
              </span>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  <Tearsheet bind:this={tearsheetModal} />
</div>

<script lang="ts">
  import Loading from './Loading.svelte';
  import BaseInput from 'components/Inputs/BaseInput.svelte';
  import type { ISecurity } from 'models/security';
  import { findSecurities } from '@/api/api_security';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';
  import type { SvelteComponent } from 'svelte';

  let tearsheetModal: SvelteComponent | undefined = $state();

  let searchTerm = $state('ethiopian');
  let securities: ISecurity[] = $state([]);
  let timeout: NodeJS.Timeout;
  let searching = $state(false);

  const openTearsheet = (data: ISecurity) => {
    tearsheetModal?.show(undefined, data.id);
  };

  async function getProducts() {
    if (!searchTerm) {
      reset();
      return;
    }

    const data = await findSecurities(searchTerm)
      .then((resp) => {
        return resp.response;
      })
      .catch(() => handleError());
    securities = data || [];
    searching = false;
  }

  function handleSearch() {
    searching = true;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(getProducts, 500);
  }

  function handleError() {
    reset();
  }

  function reset() {
    securities = [];
    searching = false;
  }
</script>
