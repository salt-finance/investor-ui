<div
  class="relative flex flex-col w-full min-w-0 break-words card bg-opacity-40 xl:mb-0 h-full"
>
  <div class="flex-auto flex p-4 justify-between gap-2 flex-nowrap">
    <div class="flex flex-col gap-2 w-full">
      <div
        class="relative w-full max-w-full flex-grow flex-1 gap-2 flex-col flex justify-between"
      >
        <h5 class="uppercase font-bold text-sm">
          {statSubtitle}
        </h5>
        <span class="font-extralight text-xl md:text-2xl">
          {statTitle}
        </span>
      </div>

      {#if statPercent !== undefined}
        <p class="hidden md:flex gap-2 items-center flex-wrap xl:flex-nowrap">
          <span
            class="text-sm font-bold gap-1 inline-flex align-item-center line-clamp-1 {statDown
              ? 'text-red-500'
              : 'text-emerald-500'}"
          >
            <span class="material-symbols-outlined text-sm skiptranslate">
              {statDown ? 'trending_down' : 'trending_up'}
            </span>

            {statPercent}%
          </span>
          <span class="whitespace-nowrap">{statDescripiron}</span>
        </p>
      {/if}
    </div>

    {#if statIconName !== undefined}
      <div class="flex relative flex-initial items-start justify-end">
        <div
          class="text-center inline-flex items-center justify-center w-8 sm:w-12 aspect-square sm:shadow-lg rounded-full bg-opacity-0 sm:bg-opacity-80 icon-bg"
        >
          <i class="material-symbols-outlined skiptranslate">{statIconName}</i>
        </div>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  // The value must match one of these strings

  // can be any of the text color utilities

  // can be any of the background color utilities

  interface Props {
    // core components
    statSubtitle?: string;
    statTitle?: string;
    // "up" or "down"
    statDown?: boolean;
    statPercent?: any;
    // from tailwindcss
    statDescripiron?: string;
    statIconName?: string;
  }

  let {
    statSubtitle = 'Traffic',
    statTitle = '350,897',
    statDown = false,
    statPercent,
    statDescripiron = 'Since last month',
    statIconName
  }: Props = $props();
</script>
