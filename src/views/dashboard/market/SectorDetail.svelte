{#if sector !== undefined}
  <div class="flex-col flex w-full motion-preset-fade p-2">
    <span class="page-title mb-4">{sector.title}</span>
    {#if sector.description !== undefined}
      <span class="body-text dark-light-text lg:w-2/3">
        {sector.description}
      </span>
    {/if}
    {#if sectorSecurites.length > 0}
      <span class="page-subtitle my-4">Securities</span>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 flex-wrap"
      >
        {#each sectorSecurites as security}
          <button onclick={() => onRowTap(security)} class="unset">
            <span
              class="col-span-1 card flex flex-row flex-wrap p-4 items-start gap-4 content-between hover:bg-accent/30 dark:hover:bg-accent-dark/30"
            >
              <span class="flex flex-grow w-full justify-between items-center">
                <img
                  class="rounded-full border-none aspect-square items-center h-12"
                  src={security.logoUrl}
                  alt="logo"
                />
              </span>

              <span class="flex flex-col gap-1">
                <span class="body-text dark-light-text">{security.name}</span>
                <span class="font-medium text-xl">
                  {currencyFormat()(security.price ?? 0)}
                </span>
                <span class="flex gap-2">
                  <span class="body-text dark-light-text">
                    {security.symbol}
                  </span>
                  <span class="text-emerald-600">
                    +{decimalFormat()(security.dayChangePercent ?? 0)}%
                  </span>
                </span>
              </span>
            </span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <Tearsheet bind:this={tearsheetModal} security={selectedSecurity} />
{/if}

<script lang="ts">
  import { sectors, securities } from '@/store/stock';
  import { type ISector } from 'models/sector';
  import type { ISecurity } from 'models/security';
  import { onDestroy, type SvelteComponent } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { currencyFormat, decimalFormat } from 'utils/formatTools';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';

  let sector: ISector | undefined = $state();
  let sectorSecurites: ISecurity[] | [] = $state([]);

  let selectedSecurity: ISecurity | undefined = $state();
  let tearsheetModal: SvelteComponent | undefined = $state();
  const onRowTap = (data: ISecurity) => {
    selectedSecurity = data;
    tearsheetModal?.show();
  };

  const sectorsSubscription = sectors.subscribe((sectors) => {
    location.subscribe((val) => {
      let sectorId = val.split('/').pop();
      sector = sectors.find((sector) => sector.id === sectorId);
      if (sector !== undefined) {
        securities.subscribe((securities) => {
          sectorSecurites = securities.filter((security) =>
            sector!.securities.find((id) => id === security.id)
          );
        });
      }
    });
  });

  onDestroy(sectorsSubscription);
</script>
