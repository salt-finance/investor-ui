<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
// core components
  import NotificationDropdown from "components/Dropdowns/NotificationDropdown.svelte";
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

  import { fly } from "svelte/transition";
  import { staggerdTransition } from "utils/animationTools.js";

  let collapseShow = $state("hidden");
</script>

<nav
  class="lg:left-0 lg:block h-full lg:top-0 lg:bottom-0 lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden shadow-xl flex flex-wrap items-center justify-between  py-4 px-6 bg-opacity-100 bg-neutral-800 text-white"
>
  <div
    class="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
  >
    <!-- Toggler -->
    <button
      class="cursor-pointer lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      aria-label="togglecollapse"
      onclick={() => (collapseShow = "glass-effect bg-opacity-80 bg-neutral-800 m-2 py-3 px-6")}
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- Brand -->
    <a
      use:link
      class="lg:block text-left lg:pb-2 mr-0 inline-block whitespace-nowrap  uppercase font-bold p-4 px-0 skiptranslate"
      href="/"
    >
      Salt Finance
    </a>
    <!-- User -->
    <ul class="lg:hidden items-center flex flex-wrap list-none">
      <li class="inline-block relative">
        <NotificationDropdown />
      </li>
      <li class="inline-block relative">
        <UserDropdown />
      </li>
    </ul>
    <!-- Collapse -->
    <div
      class="lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
      transition:fly={staggerdTransition(1)}
    >
      <!-- Collapse header -->
      <div
        class="lg:min-w-full lg:hidden block pb-4 mb-4 border-b border-solid border-slate-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              class="lg:block text-left lg:pb-2 mr-0 inline-block whitespace-nowrap  uppercase font-bold p-4 px-0 skiptranslate"
              href="/"
            >
              Salt Finance
            </a>
          </div>
          <div class="w-6/12 flex justify-end">
            <button
              type="button"
              class="cursor-pointer lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              aria-label="togglecollapse"
              onclick={() => (collapseShow = "hidden")}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- Form -->
      <form class="mt-6 mb-4 lg:hidden">
        <div class="mb-3 pt-0">
          <input
            type="text"
            placeholder="Search"
            class="border-0 px-3 py-2 h-12 border border-solid border-slate-500 placeholder-slate-300 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
          />
        </div>
      </form>

      <!-- Divider -->
      <hr class="my-4 lg:min-w-full" />
      <!-- Heading -->
      <h6
        class="lg:min-w-full  uppercase font-bold block pt-1 pb-4 no-underline"
      >
        Admin Layout Pages
      </h6>
      <!-- Navigation -->

      <ul class="lg:flex-col lg:min-w-full flex flex-col list-none">
        <li class="items-center">
          <a
            use:link
            use:active
            href="/admin/dashboard"
            onclick={() => (collapseShow = "hidden")}
            class=" uppercase py-3 font-bold block hover:text-blue-500"
          >
            <i class="fas fa-tv mr-2 "></i>
            Dashboard
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            use:active
            href="/admin/settings"
            onclick={() => (collapseShow = "hidden")}
            class=" uppercase py-3 font-bold block hover:text-blue-500"
          >
            <i class="fas fa-tools mr-2 "></i>
            Settings
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            use:active
            href="/admin/tables"
            onclick={() => (collapseShow = "hidden")}
            class=" uppercase py-3 font-bold block hover:text-blue-500"
          >
            <i class="fas fa-table mr-2 "></i>
            Transactions
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 lg:min-w-full" />
      <!-- Heading -->

      <!-- Navigation -->

      <ul class="lg:flex-col lg:min-w-full flex flex-col list-none lg:mb-4">
        <li class="items-center">
          <a
            use:link
            class="hover:text-blue-500  uppercase py-3 font-bold block"
            href="/auth/login"
          >
            <i class="fas fa-fingerprint  mr-2 "></i>
            Login
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="hover:text-blue-500  uppercase py-3 font-bold block"
            href="/auth/register"
          >
            <i class="fas fa-clipboard-list  mr-2 "></i>
            Register
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 lg:min-w-full" />
      <!-- Navigation -->

      <ul class="lg:flex-col lg:min-w-full flex flex-col list-none lg:mb-4">
        <li class="items-center">
          <a
            use:link
            class="hover:text-blue-500  uppercase py-3 font-bold block"
            href="/landing"
          >
            <i class="fas fa-newspaper  mr-2 "></i>
            Landing Page
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="hover:text-blue-500  uppercase py-3 font-bold block"
            href="/profile"
          >
            <i class="fas fa-user-circle  mr-2 "></i>
            Profile Page
          </a>
        </li>
      </ul>

      <div id="google_translate_element"></div>
    </div>
  </div>
</nav>
