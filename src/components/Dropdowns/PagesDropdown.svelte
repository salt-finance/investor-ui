<script>
  import { link } from 'svelte-spa-router';
  // library for creating dropdown menu appear on click
  import { createPopper } from "@popperjs/core";

  // core components

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
        placement: "bottom-start",
      });
    }
  };
</script>

<div>
  <a
    class="lg:text-white lg:hover:text-neutral-200 text-neutral-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
    href="#pablo"
    bind:this="{btnDropdownRef}"
    onclick={toggleDropdown}
  >
    Demo Pages
  </a>
  <div
    bind:this="{popoverDropdownRef}"
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
  >
    <span
      class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-neutral-500"
    >
      Admin Layout
    </span>
    <a
      use:link
      href="/admin/dashboard"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Dashboard
    </a>
    <a
      use:link
      href="/admin/settings"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Settings
    </a>
    <a
      use:link
      href="/admin/tables"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Tables
    </a>
    <a
      use:link
      href="/admin/maps"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Maps
    </a>
    <div class="h-0 mx-4 my-2 border border-solid border-slate-100"></div>
    <span
      class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-neutral-500"
    >
      Auth Layout
    </span>
    <a
      use:link
      href="/auth/login"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Login
    </a>
    <a
      use:link
      href="/auth/register"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Register
    </a>
    <div class="h-0 mx-4 my-2 border border-solid border-slate-100"></div>
    <span
      class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-neutral-500"
    >
      No Layout
    </span>
    <a
      use:link
      href="/landing"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Landing
    </a>
    <a
      use:link
      href="/profile"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Profile
    </a>
  </div>
</div>
