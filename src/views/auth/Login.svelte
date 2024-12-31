<div class="flex flex-wrap gap-y-4 w-full glass-effect overflow-hidden">
  <div
    class="lg:w-1/2 flex-col w-full h-full hidden lg:flex items-center justify-center content-start flex-wrap"
  >
    <img
      src="https://picsum.photos/id/525/500/500?grayscale"
      height="100px"
      class="h-full object-cover"
      alt=""
    />
  </div>
  <form class="flex flex-col justify-center gap-2 w-full lg:w-1/2 px-8 py-6">
    <div class=" w-full mb-3">
      <label class="block text-sm mb-2" for="grid-email"> Email </label>
      <input
        class="border-0 px-3 py-3 w-full primary-input"
        id="grid-email"
        placeholder="Email"
        type="email"
        value="test@example.com"
      />
    </div>

    <div class=" w-full mb-3">
      <label class="block text-sm mb-2" for="grid-password"> Password </label>
      <input
        class="border-0 px-3 py-3 w-full primary-input"
        id="grid-password"
        placeholder="Password"
        type="password"
        value="1234567"
      />
    </div>

    <div class="mt-6">
      <button class="primary-button w-full" onclick={signIn} type="button">
        Log In
      </button>
    </div>
  </form>
</div>

<script lang="ts">
  // core components
  import { replace } from 'svelte-spa-router';

  export const location = '';

  function signIn() {
    replace('/dashboard');
  }
</script>
