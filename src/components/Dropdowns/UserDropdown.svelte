<script>
  // library for creating dropdown menu appear on click
  import { createPopper } from "@popperjs/core";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  // core components

  const image =
    "https://salt-finance.github.io/investor-ui/assets/img/team-2-800x800.webp";

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
  <a
    class="text-neutral-500 block"
    href="#pablo"
    bind:this={btnDropdownRef}
    on:click={toggleDropdown}
  >
    <div class="items-center flex">
      <span
        class="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full"
      >
        <img
          alt="..."
          width="48"
          height="48"
          class="w-full rounded-full align-middle border-none shadow-lg"
          src={image}
        />
      </span>
    </div>
  </a>
  <div
    bind:this={popoverDropdownRef}
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
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
    <a
      use:link
      href="/"
      class="text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent"
    >
      Logout <i class="fas fa-arrow-right-from-bracket"></i>
    </a>
    <div id="google_translate_element"></div>
  </div>
</div>
