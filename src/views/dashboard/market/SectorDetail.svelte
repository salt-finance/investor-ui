{#if sector !== undefined}
  <h1 class="page-title mb-2">{sector.title}</h1>
  {#if sector.description !== undefined}
    <span class="opacity-80 dark:opacity-60 lg:w-2/3">
      {sector.description}
    </span>
  {/if}
  <div class="flex-col flex w-full mt-4 motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px]">
    {#if sectorSecurites.length > 0}
      <h2 class="text-xl mb-4">Securities</h2>
      <div class="flex gap-4 flex-wrap">
        {#each sectorSecurites as security}
          <div class="glass-effect flex flex-row flex-wrap p-4 gap-4 items-center">
            <img
              class="rounded-full border-none aspect-square items-center h-20"
              src={security.logoUrl}
              alt="logo"
            />
            <div class="flex flex-col gap-1">
              <p class="text-opacity-80 dark-light-text">{security.name}</p>
              <p class="font-medium text-xl">
                {currencyFormat()(security.price ?? 0)}
              </p>
              <span class="flex gap-2">
                <p class="text-opacity-80 dark-light-text">
                  {security.symbol}
                </p>
                <p class="text-emerald-600">
                  +{decimalFormat()(security.dayChangePercent ?? 0)}%
                </p>
              </span>
              <div class="flex gap-4 mt-4 flex-wrap">
                <button
                  class="btn-buy p-2 px-4"
                  onclick={(e) => {
                    e.preventDefault();
                    selectedSecurity = security;
                    buy = true;
                    tradeModal?.show();
                  }}
                >
                  Buy
                </button>
                <button
                  class="btn-sell p-2 px-4"
                  onclick={(e) => {
                    e.preventDefault();
                    selectedSecurity = security;
                    buy = false;
                    tradeModal?.show();
                  }}
                >
                  Sell
                </button>
                <button
                  class="p-2 px-4 btn-tearsheet"
                  onclick={(e) => {
                    e.preventDefault();
                    selectedSecurity = security;
                    tearsheetModal?.show();
                  }}
                >
                  View detail
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<Trade bind:this={tradeModal} {buy} value={selectedSecurity} />
<Tearsheet bind:this={tearsheetModal} security={selectedSecurity!} />

<script lang="ts">
  import { type iSector } from 'models/sector';
  import { location } from 'svelte-spa-router';
  import { sectors, securities } from '@/store/stock';
  import { onDestroy, type SvelteComponent } from 'svelte';
  import type { iSecurity } from 'models/security';
  import { currencyFormat, decimalFormat } from 'utils/formatTools';
  import Trade from 'components/Modals/trade.svelte';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';

  let selectedSecurity: iSecurity | undefined = $state();

  let sector: iSector | undefined = $state();
  let sectorSecurites: iSecurity[] | [] = $state([]);
  let buy = $state(true);
  let tradeModal: SvelteComponent;

  let tearsheetModal: SvelteComponent;

  const sectorsSubscription = sectors.subscribe((sectors) => {
    console.log(sectors);

    location.subscribe((val) => {
      let sectorId = val.split('/').pop();
      sector = sectors.find((sector) => sector.id === sectorId);
      if (sector !== undefined) {
        securities.subscribe((securities) => {
          sectorSecurites = securities.filter((security) =>
            sector!.securities.find((id) => id === security.id)
          );

          selectedSecurity = sectorSecurites[1];
        });
      }
    });
  });


  onDestroy(sectorsSubscription);
</script>
