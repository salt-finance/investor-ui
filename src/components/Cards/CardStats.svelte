<script>
    // core components

    export let statSubtitle = "Traffic";
    export let statTitle = "350,897";
    // The value must match one of these strings
    // "up" or "down"
    export let statArrow = "up";
    export let statPercent;
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
        class="relative flex flex-col min-w-0 break-words glass-effect rounded-lg xl:mb-0  h-full"
>
    <div class="flex-auto flex p-4 justify-between gap-2">
        <div class="flex flex-col gap-2">
            <div class="relative w-full max-w-full flex-grow flex-1 gap-2 flex-col flex justify-between">
                <h5 class="uppercase font-bold">
                    {statSubtitle}
                </h5>
                <span class="font-light text-xl md:text-2xl">
                    {statTitle}
                </span>
            </div>

            {#if statPercent !== undefined}
                <p class="flex gap-2 items-center">
      <span class="text-sm font-bold {statPercentColor}">
        <i
                class="{statArrow === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'} mr-2"
        ></i>
          {statPercent}%
      </span>
                    <span class="whitespace-nowrap text-xs">{statDescripiron}</span>
                </p>
            {/if}

        </div>
        <div class="relative w-auto flex-initial items-center flex">
            <div
                    class="p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-opacity-80 {statIconColor}"
            >
                <i class="material-symbols-outlined">{statIconName}</i>
            </div>
        </div>

    </div>
</div>
