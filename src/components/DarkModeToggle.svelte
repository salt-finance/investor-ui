<button
  aria-label="open menu"
  class="text-xl md:text-2xl lg:text-2xl flex items-center leading-none rounded outline-none hover:text-blue-500"
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
  import { theme } from '@/store/theme'
  import { MediaQuery } from 'svelte/reactivity'

  let systemDark = new MediaQuery('prefers-color-scheme: dark');

  let currentTheme = $state(localStorage.theme ?? 'auto');

  let actualTheme = $state('auto');
  $effect(() => {
    // Listen to media query changes, or currentTheme changes to auto update styles.

    if (currentTheme === 'auto') {
      actualTheme = systemDark.current ? 'dark' : 'light';
      document.body.classList.toggle('dark', systemDark.current);
    } else if (currentTheme === 'dark') {
      actualTheme = 'dark';
      document.body.classList.toggle('dark', true);
    } else {
      actualTheme = 'light';

      document.body.classList.toggle('dark', false);
    }

    theme.set(actualTheme);
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
