<script lang="ts">
    // library for creating dropdown menu appear on click
    import { createPopper } from "@popperjs/core";

    // core components

    let dropdownPopoverShow = $state(false);

    let btnDropdownRef:Element|undefined = $state();
    let popoverDropdownRef:HTMLElement|undefined = $state();
    let {value} = $props();

    const toggleDropdown = (event: Event) => {
        event.preventDefault();
        if (dropdownPopoverShow) {
            dropdownPopoverShow = false;
        } else {
            dropdownPopoverShow = true;
            createPopper(btnDropdownRef!, popoverDropdownRef!, {
                placement: "bottom-start",
            });
        }
    };
</script>

<div>
    <button
            class="p-2 outline-none text-xl focus:outline-blue-600 rounded-lg items-center inline-flex"
            bind:this="{btnDropdownRef}"
            onclick="{toggleDropdown}"
            aria-label="notifications"
    >
        <span class="material-symbols-outlined skiptranslate">more_vert</span>
    </button>
    <div
            bind:this="{popoverDropdownRef}"
            class=" glass-effect bg-opacity-95 text-base z-50 float-left py-2 flex flex-col text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
    >
        <button
                onclick={(e) => e.preventDefault()}
                class="hover:bg-blue-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        >
            View tearsheet for {value?.symbol}
        </button>
        <button
                onclick={(e) => e.preventDefault()}
                class="hover:bg-lime-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        >
            Buy {value?.symbol}
        </button>
        {#if value?.owned}
        <button
                onclick={(e) => e.preventDefault()}
                class="hover:bg-yellow-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
        >
            Sell {value?.symbol}
        </button>
        {/if}
    </div>
</div>
