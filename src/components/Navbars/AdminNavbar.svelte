<script>
  // core components
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";
</script>

<!-- Navbar -->
<div class="w-full justify-center flex relative z-10">
  <nav
    class="fixed top-10 w-11/12 sm:w-10/12 md:w-9/12 max-w-screen-xl hidden md:flex flex-col z-50 p-4 shadow glass-effect rounded-lg bg-opacity-40 bg-neutral-800"
  >
    <div
      class="mx-auto w-full items-center flex justify-between md:flex-nowrap flex-wrap"
    >
      <!-- Brand -->
      <a
        class="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        href="#pablo"
        on:click={(e) => e.preventDefault()}
      >
        Dashboard
      </a>
      <!-- Form -->
      <form
        class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-neutral-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            class="border-0 px-3 py-3 placeholder-slate-300 text-neutral-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form>
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </div>
  </nav>
</div>
<!-- End Navbar -->
