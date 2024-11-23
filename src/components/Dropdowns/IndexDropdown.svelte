<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
// library for creating dropdown menu appear on click
  import { createPopper } from "@popperjs/core";
  let { isLoggedIn = false } = $props();

  // core components
  let dropdownPopoverShow = false;

  let btnDropdownRef;
  let popoverDropdownRef;

  const toggleDropdown = (event) => {
    event.preventDefault();
    if (dropdownPopoverShow) {
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      createPopper(btnDropdownRef, popoverDropdownRef, {
        placement: "bottom-start",
      });
    }
  };
</script>

<div class="flex flex-col lg:flex-row">
  {#if isLoggedIn}
    <a
      use:link
      use:active
      href="/admin/dashboard"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Dashboard
    </a>
    <a
      use:link
      use:active
      href="/admin/market"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Market
    </a>
    <a
      use:link
      use:active
      href="/admin/holdings"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Holdings
    </a>
    <a
      use:link
      use:active
      href="/admin/activity"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Activity
    </a>
    <a
      use:link
      use:active
      href="/admin/portfolio"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Portfolio
    </a>
  {:else}
    <a
      use:link
      use:active
      href="/auth/login"
      class="text-sm font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Login
    </a>
    <a
      use:link
      use:active
      href="/auth/register"
      class="text-sm font-semibold px-0 lg:px-4 block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Register
    </a>
  {/if}
</div>
