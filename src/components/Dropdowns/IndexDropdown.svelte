<div class="flex flex-col gap-x-10 lg:flex-row capitalize py-2">
  {#if isLoggedIn}
    <a
      href="/dashboard"
      use:link
      use:active
      class="font-semibold inline-flex gap-1 hover:no-underline py-4 lg:py-0 items-center"
    >
      <span class="material-symbols-outlined skiptranslate flex items-center">
        dashboard
      </span>
      <p>dashboard</p>
    </a>
    <a
      use:link
      use:active
      href="/dashboard/market"
      class="font-semibold inline-flex gap-1 hover:no-underline py-4 lg:py-0 items-center"
    >
      <span class="material-symbols-outlined skiptranslate flex items-center">
        storefront
      </span>
      <p>market</p>
    </a>
    <a
      use:link
      use:active
      href="/dashboard/portfolio"
      class="font-semibold inline-flex gap-1 hover:no-underline py-4 lg:py-0 items-center"
    >
      <span class="material-symbols-outlined skiptranslate flex items-center">
        pie_chart
      </span>
      <p>portfolio</p>
    </a>
    <a
      use:link
      use:active
      href="/dashboard/holdings"
      class="font-semibold inline-flex gap-1 hover:no-underline py-4 lg:py-0 items-center"
    >
      <span class="material-symbols-outlined skiptranslate flex items-center">
        category
      </span>
      <p>holdings</p>
    </a>
    <a
      use:link
      use:active
      href="/dashboard/activity"
      class="font-semibold inline-flex gap-1 hover:no-underline py-4 lg:py-0 items-center"
    >
      <span class="material-symbols-outlined skiptranslate flex items-center">
        swap_horiz
      </span>
      <p>activity</p>
    </a>
  {:else}
    <a
      use:link
      use:active
      href="/auth/login"
      class="font-semibold px-0 lg:px-4 pb-4 lg:pb-0 block w-full whitespace-nowrap"
    >
      Login
    </a>
    <a
      use:link
      use:active
      href="/auth/register"
      class="font-semibold px-0 lg:px-4 block w-full whitespace-nowrap"
    >
      Register
    </a>
  {/if}
</div>

<script lang="ts">
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  // library for creating dropdown menu appear on click

  let { isLoggedIn = false } = $props();
</script>
