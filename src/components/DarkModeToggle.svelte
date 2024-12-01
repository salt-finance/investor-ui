<script>
    function isSystemTheme() {
        return !('theme' in localStorage)
    }

    function isDarkMode() {
        return localStorage.theme === 'dark' || (isSystemTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }


    document.body.classList.toggle(
        'dark',
        isDarkMode()
    );


    function setTheme(value = 0) {
        // Whenever the user explicitly chooses light mode

        // Toggle Value
        if (value === 0) {

            if (localStorage.theme === 'light') {
                localStorage.theme = 'dark';

            } else if (localStorage.theme === 'dark') {
                localStorage.removeItem('theme');
            } else {
                localStorage.theme = 'light';
            }

        } else {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem('theme');

        }

        document.body.classList.toggle(
            'dark',
            isDarkMode()
        );
        isDark = isDarkMode();
        isSystem = isSystemTheme();
    }


    // setTheme(1);


    let isDark = $state(isDarkMode());
    let isSystem = $state(isSystemTheme());

</script>
<button
        aria-label="open menu"
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
        onclick={() => setTheme()}
        type="button"
>
    {#if isSystem}
         <span title="Use light mode" class="material-symbols-outlined skiptranslate">
light_mode      </span>
    {:else if isDark}
         <span title="Use system preference" class="material-symbols-outlined skiptranslate">
night_sight_auto </span>

    {:else}
         <span title="Use dark mode" class="material-symbols-outlined skiptranslate">
            dark_mode
        </span>

    {/if}
</button>
