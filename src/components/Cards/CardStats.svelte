<div
  class="relative flex flex-col w-full min-w-0 break-words glass-effect xl:mb-0 h-full"
>
  <div
    class="flex-auto flex p-4 justify-between gap-2 flex-wrap-reverse md:flex-nowrap"
  >
    <div class="flex flex-col gap-2">
      <div
        class="relative w-full max-w-full flex-grow flex-1 gap-2 flex-col flex justify-top"
      >
        <h5 class="uppercase font-bold text-sm">
          {statSubtitle}
        </h5>
        <span class="font-extralight text-xl md:text-2xl">
          {statTitle}
        </span>
      </div>

      {#if statPercent !== undefined}
        <p class="flex gap-2 items-center flex-wrap md:flex-nowrap">
          <span
            class="text-sm font-bold gap-1 inline-flex align-item-center line-clamp-1 {statPercentColor}"
          >
            <span class="material-symbols-outlined text-sm skiptranslate">
              {statArrow === 'up' ? 'trending_up' : 'trending_down'}
            </span>

            {statPercent}%
          </span>
          <span class="whitespace-nowrap text-xs">{statDescripiron}</span>
        </p>
      {/if}
    </div>

    {#if statIconName !== undefined}
      <div class="relative w-auto flex-initial items-center">
        <div
          class="p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-opacity-80 {statIconColor}"
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
    statArrow?: string;
    statPercent?: any;
    // from tailwindcss
    statPercentColor?: string;
    statDescripiron?: string;
    statIconName?: string;
    // from tailwindcssp
    statIconColor?: string;
  }

  let {
    statSubtitle = 'Traffic',
    statTitle = '350,897',
    statArrow = 'up',
    statPercent,
    statPercentColor = 'text-emerald-500',
    statDescripiron = 'Since last month',
    statIconName,
    statIconColor = 'bg-red-500'
  }: Props = $props();
</script>
