<script>
  import { link } from "svelte-spa-router";

  // core components
  import IndexDropdown from "components/Dropdowns/IndexDropdown.svelte";

  let navbarOpen = false;

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }
</script>

<div class="w-full justify-center flex">
  <nav
    class="z-50  w-11/12 sm:w-10/12 md:w-9/12 max-w-screen-xl flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow fixed glass-effect m-10 rounded-lg bg-opacity-40 bg-white"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between transition-all ease-in-out duration-500"
    >
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
      <div
        class="overflow-hidden transition-all duration-500 ease-in-out flex {navbarOpen ? 'h-36' : 'h-px lg:h-auto'}"
        id="example-navbar-warning"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <IndexDropdown />
          </li>
          <li class="flex items-center">
            <a
              class="hover:text-neutral-500 text-neutral-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-svelte%2F%23%2F"
              target="_blank"
            >
              <i class="text-neutral-500 fab fa-facebook text-lg leading-lg"
              ></i>
              <span class="lg:hidden inline-block ml-2">Share</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="hover:text-neutral-500 text-neutral-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-svelte%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20Svelte%20UI%20Kit%20and%20Admin.%20Let%20Notus%20Svelte%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
              target="_blank"
            >
              <i class="text-neutral-500 fab fa-twitter text-lg leading-lg"></i>
              <span class="lg:hidden inline-block ml-2">Tweet</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="hover:text-neutral-500 text-neutral-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://github.com/creativetimofficial/notus-svelte?ref=ns-index-navbar"
              target="_blank"
            >
              <i class="text-neutral-500 fab fa-github text-lg leading-lg"></i>
              <span class="lg:hidden inline-block ml-2">Star</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
