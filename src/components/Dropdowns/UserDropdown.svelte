<div class="relative">
  <button class="block" bind:this={btnDropdownRef} onclick={toggleDropdown}>
    <span class="items-center flex">
      <span
        class="inline-flex items-center justify-center rounded-full shadow-sm"
      >
        {#if image}
          <img
            alt="..."
            class="h-12 rounded-full aspect-square glass-effect"
            src={image}
          />
        {/if}
      </span>
    </span>
  </button>
  <div
    bind:this={popoverDropdownRef}
    class="z-50 py-2 list-none text-left rounded min-w-48 glass-effect dark:bg-opacity-90 bg-opacity-95 {dropdownPopoverShow
      ? 'block'
      : 'hidden'}"
  >
    <a
      use:link
      use:active
      href="/admin/settings"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
    >
      Settings
    </a>

    <div id="googleTranslateElement"></div>

    <a
      use:link
      href="/"
      class="text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent"
    >
      Logout <i class="fas fa-arrow-right-from-bracket"></i>
    </a>
  </div>
</div>

<script lang="ts">
  // library for creating dropdown menu appear on click
  import { createPopper } from '@popperjs/core';
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  // core components

  const image =
    'https://salt-finance.github.io/investor-ui/assets/img/user.webp';

  let dropdownPopoverShow = $state(false);

  let btnDropdownRef: Element | undefined = $state();
  let popoverDropdownRef: HTMLElement | undefined = $state();

  const toggleDropdown = (event: Event) => {
    event.preventDefault();
    if (dropdownPopoverShow) {
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      createPopper(btnDropdownRef!, popoverDropdownRef!, {
        placement: 'bottom-end'
      });
    }
  };
</script>
