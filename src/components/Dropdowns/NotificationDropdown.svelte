<script>
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
    class="block py-1 px-3"
    href="#pablo"
    aria-labelledby="notifications"
    bind:this="{btnDropdownRef}"
    onclick={toggleDropdown}
  >
    <i class="fas fa-bell"></i>
  </a>
  <div
    bind:this="{popoverDropdownRef}"
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
  >
    <a
      href="#pablo" onclick={(e) => e.preventDefault()}
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Action
    </a>
    <a
      href="#pablo" onclick={(e) => e.preventDefault()}
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Another action
    </a>
    <a
      href="#pablo" onclick={(e) => e.preventDefault()}
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Something else here
    </a>
    <div class="h-0 my-2 border border-solid border-slate-100"></div>
    <a
      href="#pablo" onclick={(e) => e.preventDefault()}
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-neutral-700"
    >
      Seprated link
    </a>
  </div>
</div>
