<script>
    // library for creating dropdown menu appear on click
    import {createPopper} from "@popperjs/core";
    import {link} from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    // core components

    const image =
        "https://salt-finance.github.io/investor-ui/assets/img/team-2-800x800.webp";

    let dropdownPopoverShow = $state(false);

    let btnDropdownRef = $state();
    let popoverDropdownRef = $state();

    const toggleDropdown = (event) => {
        event.preventDefault();
        if (dropdownPopoverShow) {
            dropdownPopoverShow = false;
        } else {
            dropdownPopoverShow = true;
            createPopper(btnDropdownRef, popoverDropdownRef, {
                placement: "bottom-end",
            });
        }
    };
</script>

<div class="relative">
    <a
            class="block"
            href="#pablo"
            bind:this={btnDropdownRef}
            onclick={toggleDropdown}
    >
        <div class="items-center flex">
      <span
              class="w-12 h-12 inline-flex items-center justify-center rounded-full"
      >
        <img
                alt="..."
                width="48"
                height="48"
                class="w-full rounded-full align-middle border-none"
                src={image}
        />
      </span>
        </div>
    </a>
    <div
            bind:this={popoverDropdownRef}
            class="z-50 py-2 list-none text-left rounded min-w-48 glass-effect dark:bg-opacity-90 bg-opacity-95  {dropdownPopoverShow
      ? 'block'
      : 'hidden'}"
    >
        <a
                use:link
                use:active
                href="/admin/settings"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
        >
            Settings
        </a>

        <div id="google_translate_element"></div>

        <a
                use:link
                href="/"
                class="text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent"
        >
            Logout <i class="fas fa-arrow-right-from-bracket"></i>
        </a>
    </div>
</div>
