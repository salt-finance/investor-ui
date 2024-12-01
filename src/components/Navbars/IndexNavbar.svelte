<script>
    import {link} from "svelte-spa-router";

    // core components
    import IndexDropdown from "components/Dropdowns/IndexDropdown.svelte";

    import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

    import DarkModeToggle from "../DarkModeToggle.svelte";


    let {isLoggedIn = false} = $props();


    let navbarOpen = $state(false);

    function setNavbarOpen() {
        navbarOpen = !navbarOpen;
    }
</script>

<nav
        class="flex flex-col p-4 shadow glass-effect rounded-lg bg-opacity-80 bg-white dark:bg-neutral-950 dark:bg-opacity-40 w-full z-10"
>
    <div
            class="px-0 flex items-center justify-between transition-all ease-in-out duration-500 flex-wrap w-full flex-grow"
    >
        <span class="flex items-center">
        <a
                use:link
                class="text-2xl tracking-wide font-light leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate"
                href="/"
        >
            Salt
        </a>
        <DarkModeToggle/>

    </span>
        <div
                class:justify-center={isLoggedIn}
                class:justify-end={!isLoggedIn}
                class="overflow-hidden transition-all duration-500 ease-in-out lg:flex items-center order-3 lg:order-none w-full lg:w-auto flex-grow {navbarOpen
        ? 'h-auto'
        : 'h-px lg:h-auto'}"
        >
            <IndexDropdown {isLoggedIn}/>
        </div>
        <div class="flex flex-shrink justify-between">
            {#if isLoggedIn}
                <UserDropdown/>
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
