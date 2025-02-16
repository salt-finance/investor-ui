<div
  class="relative flex flex-col w-full min-w-0 break-words card bg-opacity-40 xl:mb-0 h-full"
>
  <div class="flex-auto flex p-4 justify-between gap-2 flex-nowrap">
    <div class="flex flex-col gap-2 w-full">
      <div
        class="relative w-full max-w-full gap-2 flex-row flex justify-between items-center"
      >
        <h5 class="uppercase font-bold text-sm pb-0">
          {statSubtitle}
        </h5>
        {#if statIconName !== undefined}
          <div class="flex relative flex-initial items-start justify-end">
            <div
              class="text-center inline-flex items-start sm:items-center text-lg justify-center w-4 sm:w-10 aspect-square sm:shadow-lg rounded-full bg-opacity-0 sm:bg-opacity-80 icon-bg"
            >
              <i class="material-symbols-outlined skiptranslate"
                >{statIconName}</i
              >
            </div>
          </div>
        {/if}
      </div>

      <span class="text-xl md:text-2xl {titleClass}">
        {statTitle}
      </span>

      {#if statDescripiron !== undefined}
        <p class="gap-2 items-center flex-wrap xl:flex-nowrap">
          <span class="text-sm sm:text-lg lg:text-sm">{statDescripiron}</span>
        </p>
      {/if}
    </div>
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
    titleClass?: string;
    // "up" or "down"
    // from tailwindcss
    statDescripiron?: string;
    statIconName?: string;
  }

  let {
    statSubtitle,
    statTitle,
    titleClass,
    statDescripiron,
    statIconName
  }: Props = $props();
</script>
