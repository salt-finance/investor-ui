<button
  aria-label="open menu"
  class="text-xl leading-none px-3 py-1 rounded block outline-none hover:text-blue-500"
  onclick={() => setTheme()}
  type="button"
>
  {#if currentTheme === 'dark'}
    <span
      title="Use light mode"
      class="material-symbols-outlined skiptranslate"
    >
      dark_mode
    </span>
  {:else if currentTheme === 'light'}
    <span title="Use dark mode" class="material-symbols-outlined skiptranslate">
      light_mode
    </span>
  {:else}
    <span
      title="Use system preference"
      class="material-symbols-outlined skiptranslate"
    >
      night_sight_auto
    </span>
  {/if}
</button>

<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';

  let systemDark = new MediaQuery('prefers-color-scheme: dark');

  let currentTheme = $state(localStorage.theme ?? 'auto');

  $effect(() => {
    // Listen to media query changes, or currentTheme changes to auto update styles.
    if (currentTheme === 'auto') {
      document.body.classList.toggle('dark', systemDark.current);
    } else if (currentTheme === 'dark') {
      document.body.classList.toggle('dark', true);
    } else {
      document.body.classList.toggle('dark', false);
    }
  });

  function setTheme() {
    if (currentTheme === 'dark') {
      localStorage.theme = 'light';
    } else if (currentTheme === 'auto') {
      localStorage.theme = 'dark';
    } else {
      localStorage.removeItem('theme');
    }
    currentTheme = localStorage.theme ?? 'auto';
  }
</script>
