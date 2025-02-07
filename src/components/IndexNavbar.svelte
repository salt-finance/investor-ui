<div class="z-20">
  <nav
    bind:this={navRef}
    class="flex flex-col p-[14px] glass-effect z-10 transition-transform"
  >
    <div
      class="px-0 flex items-center justify-between flex-wrap w-full flex-grow min-h-[50px]"
    >
      <div class="flex items-center">
        <a
          class="text-2xl tracking-wide font-extralight leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate hover:no-underline"
          href="/"
          aria-label="logo"
          use:link
        >
          <div class="logo"></div>
        </a>
      </div>
      <div
        class="overflow-hidden lg:flex items-center order-3 transition-all ease-in-out duration-200 lg:order-none w-full lg:w-auto flex-grow {navbarOpen
          ? 'h-auto'
          : 'h-px lg:h-auto'}"
        class:justify-center={isLoggedIn}
        class:justify-end={!isLoggedIn}
      >
        <div class="lg:hidden flex">
          <DarkModeToggle />
        </div>
        <IndexDropdown {isLoggedIn} />
      </div>

      <div class="flex flex-shrink justify-between gap-4">
        <div class="lg:flex hidden">
          <DarkModeToggle />
        </div>

        <button
          aria-label="open menu"
          class="cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          onclick={setNavbarOpen}
          type="button"
        >
          {#if navbarOpen === false}
            <span class="material-symbols-outlined skiptranslate">menu</span>
          {:else}
            <span class="material-symbols-outlined skiptranslate">close</span>
          {/if}
        </button>

        {#if isLoggedIn}
          <UserDropdown />
        {/if}
      </div>
    </div>
  </nav>
</div>

<script lang="ts">
  import { link, location } from 'svelte-spa-router';

  // core components
  import IndexDropdown from 'components/Dropdowns/IndexDropdown.svelte';

  import UserDropdown from 'components/Dropdowns/UserDropdown.svelte';

  import DarkModeToggle from './DarkModeToggle.svelte';
  import { onDestroy, onMount } from 'svelte';

  let { isLoggedIn = false } = $props();

  let navbarOpen = $state(false);

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }

  let scrollY = $state(0);

  let body = document.querySelector('body')!;

  let navRef: HTMLElement;

  const hideClasses = '-translate-y-full';
  const scrollOffset = 100;

  const unsubscribeLocation = location.subscribe(() => {
    if (navbarOpen) {
      setNavbarOpen();
    }
  });

  function toggleNavSize() {
    if (navRef.clientHeight - scrollOffset > body.scrollTop) {
      // don't hide if there's no overlap yet.
      navRef.classList.remove(hideClasses);
      return;
    }

    if (Math.abs(scrollY - body.scrollTop) < scrollOffset) {
      return;
    }

    if (scrollY - body.scrollTop < 0) {
      // User is scrolling up hide it;
      navRef.classList.add(hideClasses);
    } else {
      // User is scrolling down show it;
      navRef.classList.remove(hideClasses);
    }
    scrollY = body.scrollTop;
  }

  onMount(() => {
    body!.addEventListener('scroll', toggleNavSize);
  });

  onDestroy(() => {
    body.removeEventListener('scroll', toggleNavSize);
    unsubscribeLocation();
  });
  // Listen to media query changes, or currentTheme changes to auto update styles.
</script>
