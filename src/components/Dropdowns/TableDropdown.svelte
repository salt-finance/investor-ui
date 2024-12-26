<script lang="ts">
    // library for creating dropdown menu appear on click
    import {createPopper} from "@popperjs/core";
    import Trade from "components/Modals/trade.svelte";

    import type {SvelteComponent} from "svelte";

    // core components

    let dropdownPopoverShow = $state(false);

    let btnDropdownRef: Element | undefined = $state();
    let buy = $state(true);
    let tradeModal: SvelteComponent;


    let popoverDropdownRef: HTMLElement | undefined = $state();
    let {value} = $props();


    const handleBlur = (event: FocusEvent) => {
        event.preventDefault();

        if (event.relatedTarget?.offsetParent === popoverDropdownRef) {
            return;
        }
        dropdownPopoverShow = false;
    };

    const toggleDropdown = (event: Event) => {
        event.preventDefault();

        if (dropdownPopoverShow) {
            dropdownPopoverShow = false;
        }
        else {
            dropdownPopoverShow = true;
            createPopper(btnDropdownRef!, popoverDropdownRef!, {

                placement: "right-end"
            });
        }
    };
</script>

<div>

    <button
            aria-label="notifications"
            bind:this="{btnDropdownRef}"
            class="p-2 outline-none text-xl focus:outline-blue-600 rounded-lg items-center inline-flex"
            onblur={handleBlur}
            onclick="{toggleDropdown}"
    >
        <span class="material-symbols-outlined skiptranslate">more_vert</span>
    </button>
    <div
            bind:this="{popoverDropdownRef}"
            class="glass-effect bg-opacity-95 text-base z-50 float-left py-2 flex flex-col text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
    >
        <button
                class="hover:bg-blue-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
                onclick={(e) => e.preventDefault()}
        >
            View tearsheet for {value?.symbol}
        </button>
        <button
                class="hover:bg-lime-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
                onclick={(e) => {
                    e.preventDefault();
            buy = true;
        tradeModal?.show();
                }

                }
        >
            Buy {value?.symbol}
        </button>
        {#if value?.owned}
            <button
                    onclick={(e) => {
                    e.preventDefault();
                    buy = false;
        tradeModal?.show();
                    }}
                    class="hover:bg-yellow-600 hover:text-white py-2 px-4 whitespace-nowrap text-left"
            >
                Sell {value?.symbol}
            </button>
        {/if}
    </div>
</div>


<Trade bind:this={tradeModal} {buy} {value}/>
