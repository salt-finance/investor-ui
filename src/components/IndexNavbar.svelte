<script lang="ts">
  import { link, location } from 'svelte-spa-router'
  // core components
  import IndexDropdown from 'components/Dropdowns/IndexDropdown.svelte'

  import UserDropdown from 'components/Dropdowns/UserDropdown.svelte'

  import { onDestroy, onMount } from 'svelte'
  import DarkModeToggle from './DarkModeToggle.svelte'

  let { isLoggedIn = false } = $props()

  let navbarOpen = $state(false)

  function setNavbarOpen() {
    navbarOpen = !navbarOpen
  }

  let scrollY = $state(0)

  let body = document.querySelector('body')!

  let navRef: HTMLElement

  const hideClasses = ['-translate-y-full', 'top-0']
  const showClasses = ['top-4']

  const scrollOffset = 80

  const unsubscribeLocation = location.subscribe(() => {
    if (navbarOpen) {
      setNavbarOpen()
    }
  })

  function toggleNavSize() {
    if (navRef.clientHeight - scrollOffset > body.scrollTop) {
      // don't hide if there's no overlap yet.
      navRef.classList.remove(...hideClasses)
      return
    }

    if (Math.abs(scrollY - body.scrollTop) < scrollOffset) {
      return
    }

    if (scrollY - body.scrollTop < 0) {
      // User is scrolling up hide it;
      navRef.classList.remove(...showClasses)
      navRef.classList.add(...hideClasses)
    } else {
      // User is scrolling down show it;
      navRef.classList.remove(...hideClasses)
      navRef.classList.add(...showClasses)
    }
    scrollY = body.scrollTop
  }

  onMount(() => {
    body!.addEventListener('scroll', toggleNavSize)
  })

  onDestroy(() => {
    body.removeEventListener('scroll', toggleNavSize)
    unsubscribeLocation()
  })
  // Listen to media query changes, or currentTheme changes to auto update styles.
</script>

<div
  class="navbar-fixed top-4 w-full px-5  z-20 transition-transform max-w-full xl:max-w-screen-xl"
  bind:this={navRef}>
  <nav class="flex flex-col p-[14px] glass-effect">
    <div
      class="px-0 grid grid-cols-12 items-center justify-between flex-wrap w-full flex-grow min-h-[50px]">
      <div class="flex items-center col-span-11 lg:col-span-1">
        <a
          class="text-2xl tracking-wide font-extralight leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate hover:no-underline"
          href="/"
          aria-label="logo"
          use:link>
          <div class="logo"></div>
        </a>
      </div>
      <div
        class="overflow-hidden lg:flex col-span-10 items-center order-3 transition-all ease-in-out duration-200 lg:order-none w-full lg:w-auto flex-grow {navbarOpen
          ? 'h-auto'
          : 'h-px lg:h-auto'}"
        class:justify-center={isLoggedIn}
        class:justify-end={!isLoggedIn}>
           <IndexDropdown {isLoggedIn} />
 
      </div>

      <div class="flex flex-shrink justify-end gap-4">
        <DarkModeToggle />

        <button
          aria-label="open menu"
          class="cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          onclick={setNavbarOpen}
          type="button">
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
