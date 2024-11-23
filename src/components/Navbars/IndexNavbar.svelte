<script>
  import { link } from "svelte-spa-router";

  // core components
  import IndexDropdown from "components/Dropdowns/IndexDropdown.svelte";

  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

  let { isLoggedIn = false } = $props();

  let navbarOpen = $state(false);
  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }
</script>

<nav
  class="flex flex-col p-4 shadow glass-effect rounded-lg bg-opacity-80 bg-white w-full z-10"
>
  <div
    class="px-0 flex items-center justify-between transition-all ease-in-out duration-500 flex-wrap w-full flex-grow"
  >
    <a
      use:link
      class="text-neutral-700 text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate"
      href="/"
    >
      Salt Finance
    </a>

    <div
      class:justify-center={isLoggedIn}
      class:justify-end={!isLoggedIn}
      class="overflow-hidden transition-all duration-500 ease-in-out lg:flex items-center order-3 lg:order-none w-full lg:w-auto flex-grow {navbarOpen
        ? 'h-auto'
        : 'h-px lg:h-auto'}"
    >
      <IndexDropdown {isLoggedIn} />
    </div>
    <div class="flex flex-shrink justify-between">
      {#if isLoggedIn}
        <UserDropdown />
      {/if}
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        aria-label="open menu"
        onclick={setNavbarOpen}
      >
        {#if navbarOpen === false}
          <i class="fas fa-bars"></i>
        {:else}
          <i class="fas fa-close"></i>
        {/if}
      </button>
    </div>
  </div>
</nav>
