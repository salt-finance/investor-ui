<script>
  // core components
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

  import { link } from "svelte-spa-router";

  let navbarOpen = false;

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }
</script>

<!-- Navbar -->
<div class="w-full justify-center flex z-10 sticky top-10">
  <nav
    class="hidden lg:flex flex-col z-50 p-4 shadow glass-effect rounded-lg bg-opacity-80 bg-blue-200 w-full"
  >
    <div
      class="mx-auto w-full items-center flex justify-between md:flex-nowrap flex-wrap"
    >
      <!-- Brand -->
      <a
        class="text-netural-700 text-sm uppercase hidden lg:inline-block font-semibold"
        href="#pablo"
        on:click={(e) => e.preventDefault()}
      >
        Salt Finance
      </a>
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a
          use:link
          class="text-neutral-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase skiptranslate"
          href="/"
        >
          Salt Finance
        </a>
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
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </div>
  </nav>
</div>
<!-- End Navbar -->
