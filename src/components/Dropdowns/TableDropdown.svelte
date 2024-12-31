<div bind:this={btnDropdownRef}>
  <button
    aria-label="notifications"
    class="p-2 outline-none text-xl focus:outline-blue-600 rounded-lg items-center inline-flex z-50"
    onblur={handleBlur}
    onclick={toggleDropdown}
  >
    <span class="material-symbols-outlined skiptranslate">more_vert</span>
  </button>
  <div
    bind:this={popoverDropdownRef}
    class={dropdownPopoverShow ? 'block' : 'hidden'}
  >
    <div data-popper-arrow></div>
    <div
      class="glass-effect bg-opacity-100 shadow-none text-base z-50 flex flex-col text-left rounded min-w-48"
    >
      <button
        class="hover:bg-blue-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        onclick={(e) => e.preventDefault()}
      >
        View tearsheet for {value?.symbol}
      </button>
      <button
        class="hover:bg-emerald-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        onclick={(e) => {
          e.preventDefault();
          buy = true;
          tradeModal?.show();
          toggleDropdown(e);
        }}
      >
        Buy {value?.symbol}
      </button>
      {#if value?.owned}
        <button
          onclick={(e) => {
            e.preventDefault();
            buy = false;
            tradeModal?.show();
            toggleDropdown(e);
          }}
          class="hover:bg-yellow-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        >
          Sell {value?.symbol}
        </button>
      {/if}
    </div>
  </div>
</div>

<Trade bind:this={tradeModal} {buy} {value} />

<script lang="ts">
  // library for creating dropdown menu appear on click
  import {
    createPopper,
    type StrictModifiers,
    type Instance
  } from '@popperjs/core';

  import Trade from 'components/Modals/trade.svelte';

  import type { SvelteComponent } from 'svelte';

  // core components

  let dropdownPopoverShow = $state(false);

  let btnDropdownRef: Element | undefined = $state();
  let buy = $state(true);
  let tradeModal: SvelteComponent;

  let popoverDropdownRef: HTMLElement | undefined = $state();
  let popoverInstance: Instance | undefined;
  let { value } = $props();

  const handleBlur = (event: FocusEvent) => {
    event.preventDefault();

    const eventTarget = event.relatedTarget as HTMLElement;

    if (eventTarget?.parentElement?.parentNode === popoverDropdownRef) {
      return;
    }
    popoverInstance?.destroy();
    dropdownPopoverShow = false;
  };

  const toggleDropdown = (event: Event) => {
    event.preventDefault();

    if (dropdownPopoverShow) {
      popoverInstance?.destroy();
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      popoverInstance = createPopper<StrictModifiers>(
        btnDropdownRef!,
        popoverDropdownRef!,
        {
          placement: 'left-start',
          modifiers: [
            {
              name: 'flip',
              options: {
                mainAxis: true,
                fallbackPlacements: ['bottom-start']
              }
            }

            // {
            //   name: 'arrow',
            //   options: {
            //     padding: 5
            //   }
            // }
          ]
        }
      );
    }
  };
</script>
