<script lang="ts">
  // core components
  import { push } from "svelte-spa-router";
  const github =
    "https://salt-finance.github.io/investor-ui/assets/img/github.svg";
  const google =
    "https://salt-finance.github.io/investor-ui/assets/img/google.svg";
  export const location = "";

  function signIn() {
    push("/admin/dashboard");
  }
</script>

<div class="flex content-center items-center justify-center w-full">
  <div
    class="relative flex-wrap flex flex-col bg-white rounded-lg py-20 min-h-500 px-10 flex-auto lg:flex-1 w-full gap-4 glass-effect bg-opacity-80 text-neutral-800"
  >
    <form>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-neutral-600 text-xs font-bold mb-2"
          for="grid-email"
        >
          Email
        </label>
        <input
          id="grid-email"
          type="email"
          class="border-0 px-3 py-3 placeholder-slate-300 text-neutral-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
        />
      </div>

      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-neutral-600 text-xs font-bold mb-2"
          for="grid-password"
        >
          Password
        </label>
        <input
          id="grid-password"
          type="password"
          class="border-0 px-3 py-3 placeholder-slate-300 text-neutral-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Password"
        />
      </div>
      <div>
        <label class="inline-flex items-center cursor-pointer">
          <input
            id="customCheckLogin"
            type="checkbox"
            class="form-checkbox border-0 rounded text-neutral-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
          />
          <span class="ml-2 text-sm font-semibold text-neutral-600">
            Remember me
          </span>
        </label>
      </div>

      <div class="text-center mt-6">
        <button
          onclick={signIn}
          class="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</div>
