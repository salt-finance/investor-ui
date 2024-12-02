<script>
    // library for creating dropdown menu appear on click
    import {createPopper} from "@popperjs/core";

    // core components

    let dropdownPopoverShow = false;

    let btnDropdownRef;
    let popoverDropdownRef;

    const toggleDropdown = (event) => {
        event.preventDefault();
        if (dropdownPopoverShow) {
            dropdownPopoverShow = false;
        } else {
            dropdownPopoverShow = true;
            createPopper(btnDropdownRef, popoverDropdownRef, {
                placement: "bottom-start",
            });
        }
    };
</script>

<div>
    <button
            class="py-1 px-3 outline-none text-xl focus:outline-black dark:focus:outline-white rounded-lg"
            bind:this="{btnDropdownRef}"
            onclick="{toggleDropdown}"
            aria-label="notifications"
    >
        <i class="fas fa-ellipsis-v"></i>
    </button>
    <div
            bind:this="{popoverDropdownRef}"
            class="glass-effect bg-opacity-95 text-base z-50 float-left py-2 flex flex-col text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
    >
        <button
                onclick={(e) => e.preventDefault()}
                class="py-2 px-4 whitespace-nowrap text-left"
        >
            View tearsheet
        </button>
        <button
                onclick={(e) => e.preventDefault()}
                class="py-2 px-4 whitespace-nowrap text-left"
        >
            Buy
        </button>
        <button
                onclick={(e) => e.preventDefault()}
                class="py-2 px-4 whitespace-nowrap text-left"
        >
            Sell
        </button>
    </div>
</div>
