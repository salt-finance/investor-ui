<script>
  // core components

  export let statSubtitle = "Traffic";
  export let statTitle = "350,897";
  // The value must match one of these strings
  // "up" or "down"
  export let statArrow = "up";
  export let statPercent = "3.48";
  // can be any of the text color utilities
  // from tailwindcss
  export let statPercentColor = "text-emerald-500";
  export let statDescripiron = "Since last month";
  export let statIconName = "far fa-chart-bar";
  // can be any of the background color utilities
  // from tailwindcss
  export let statIconColor = "bg-red-500";
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white bg-opacity-80 dark:bg-neutral-950 dark:bg-opacity-40 glass-effect rounded-lg xl:mb-0 shadow-lg h-full"
>
  <div class="flex-auto flex flex-col p-4 justify-between">
    <div class="flex flex-wrap gap-2">
      <div class="relative w-full max-w-full flex-grow flex-1 gap-2 flex-col flex">
        <h5 class="uppercase font-bold text-sm">
          {statSubtitle}
        </h5>
        <span class="font-light text-xl md:text-2xl">
          {statTitle}
        </span>
      </div>
      <div class="relative w-auto flex-initial">
        <div
          class="p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-opacity-80 {statIconColor}"
        >
          <i class="{statIconName}"></i>
        </div>
      </div>
    </div>
    <p class="text-sm  mt-4">
      <span class="mr-2 {statPercentColor}">
        <i
          class="{statArrow === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}"
        ></i>
        {statPercent}%
      </span>
      <span class="whitespace-nowrap">{statDescripiron}</span>
    </p>
  </div>
</div>
