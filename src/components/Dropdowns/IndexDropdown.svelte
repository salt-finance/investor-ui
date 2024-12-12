<script>
    import {link} from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    // library for creating dropdown menu appear on click
    import {createPopper} from "@popperjs/core";

    let {isLoggedIn = false} = $props();

    // core components
    let dropdownPopoverShow = false;

    let btnDropdownRef;
    let popoverDropdownRef;

    const toggleDropdown = (event) => {
        event.preventDefault();
        if (dropdownPopoverShow) {
            dropdownPopoverShow = false;
        }
        else {
            dropdownPopoverShow = true;
            createPopper(btnDropdownRef, popoverDropdownRef, {
                placement: "bottom-start"
            });
        }
    };
</script>

<div class="flex flex-col lg:flex-row capitalize lg:space-x-4 space-y-4 lg:space-y-0 py-2">
    {#if isLoggedIn}
        <a
                use:link
                use:active
                href="/dashboard"
                class="font-semibold block"
        >
            dashboard
        </a>
        <a
                use:link
                use:active
                href="/dashboard/market"
                class="font-semibold block"
        >
            market
        </a>
        <a
                use:link
                use:active
                href="/dashboard/holdings"
                class="font-semibold block"
        >
            holdings
        </a>
        <a
                use:link
                use:active
                href="/dashboard/activity"
                class="font-semibold block"
        >
            activity
        </a>
    {:else}
        <a
                use:link
                use:active
                href="/auth/login"
                class="font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap"
        >
            Login
        </a>
        <a
                use:link
                use:active
                href="/auth/register"
                class="font-semibold px-0 lg:px-4 block w-full whitespace-nowrap"
        >
            Register
        </a>
    {/if}
</div>
