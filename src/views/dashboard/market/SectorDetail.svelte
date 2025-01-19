{#if sector !== undefined}
  <h1 class="page-title mb-2">{sector.title}</h1>
  {#if sector.description !== undefined}
    <span class="body-text dark-light-text lg:w-2/3">
      {sector.description}
    </span>
  {/if}
  <div
    class="flex-col flex w-full mt-4 motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px]"
  >
    {#if sectorSecurites.length > 0}
      <h2 class="text-xl mb-4">Securities</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 flex-wrap"
      >
        {#each sectorSecurites as security}
          <div
            class="col-span-1 glass-effect flex flex-row flex-wrap p-4 items-start gap-4 content-between"
          >
            <div class="flex flex-grow w-full justify-between items-center">
              <img
                class="rounded-full border-none aspect-square items-center h-12"
                src={security.logoUrl}
                alt="logo"
              />
              <TableDropdown value={security} />
            </div>

            <div class="flex flex-col gap-1">
              <p class="body-text dark-light-text">{security.name}</p>
              <p class="font-medium text-xl">
                {currencyFormat()(security.price ?? 0)}
              </p>
              <span class="flex gap-2">
                <p class="body-text dark-light-text">
                  {security.symbol}
                </p>
                <p class="text-emerald-600">
                  +{decimalFormat()(security.dayChangePercent ?? 0)}%
                </p>
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<script lang="ts">
  import { sectors, securities } from '@/store/stock';
  import TableDropdown from 'components/Dropdowns/TableDropdown.svelte';
  import { type iSector } from 'models/sector';
  import type { iSecurity } from 'models/security';
  import { onDestroy } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { currencyFormat, decimalFormat } from 'utils/formatTools';

  let sector: iSector | undefined = $state();
  let sectorSecurites: iSecurity[] | [] = $state([]);

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
