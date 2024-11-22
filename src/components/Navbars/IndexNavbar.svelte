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
  class="px-0 flex items-center justify-center lg:justify-between transition-all ease-in-out duration-500 flex-col lg:flex-row w-full"
>
  <div class="flex w-full flex-shrink justify-between">
    <div
      class="w-full relative flex justify-between lg:w-auto lg:static lg:justify-start items-center"
    >
      <a
        use:link
        class="text-neutral-700 text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase skiptranslate"
        href="/"
      >
        Salt Finance
      </a>
    </div>
    <div class="flex flex-row-reverse">
      {#if isLoggedIn}
        <UserDropdown />
      {/if}
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        aria-label="open menu"
        on:click={setNavbarOpen}
      >
        {#if navbarOpen === false}
          <i class="fas fa-bars"></i>
        {:else}
          <i class="fas fa-close"></i>
        {/if}
      </button>
    </div>
  </div>
  <div class="flex w-full lg:w-auto">
    <div
      class="overflow-hidden transition-all duration-500 ease-in-out flex items-center {navbarOpen
        ? 'h-auto'
        : 'h-px lg:h-auto'}"
    >
      <IndexDropdown {isLoggedIn} />
    </div>
  </div>
</div>
</nav>