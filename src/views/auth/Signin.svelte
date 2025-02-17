<div
  class="flex flex-col body-colors bg-gradient-to-bl from-0% to-60% dark:to-40% p-5 lg:p-8 content-center w-screen flex-wrap h-screen overflow-hidden justify-center"
>
  <div class="xl:max-w-screen-2xl xl:max-h-[1400px] w-full h-[90%]">
    <div
      class="h-full w-full md:justify-stretch justify-between gap-4 relative"
    >
      <div
        class="flex items-center z-10 absolute mx-5 lg:mx-10 mt-10 top-0 left-0 right-0 justify-between"
      >
        <div
          class="text-2xl tracking-wide font-extralight leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate hover:no-underline"
        >
          <div class="logo"></div>
        </div>
        <DarkModeToggle />
      </div>
      <div class="flex flex-col justify-end w-full gap-4 h-full">
        <div
          class="flex flex-row flex-wrap h-full w-full glass-effect overflow-hidden"
        >
          <div
            class="lg:w-1/2 h-1/2 flex-col w-full lg:h-full lg:flex items-center justify-center content-start flex-wrap"
          >
            {#if src !== undefined}
              <img
                src="assets/img/login.jpg"
                onerror={() => (src = undefined)}
                class="w-full h-full object-cover dark:opacity-80"
                alt=""
              />
            {/if}
          </div>
          <form
            class="overflow-y-auto flex flex-col justify-start lg:justify-center gap-4 w-full h-1/2 sm:w-3/4 lg:w-2/5 self-center mx-auto lg:h-full px-8 md:px-12 py-6 lg:mb-3"
          >
            <h1
              class="text-xl md:text-2xl/tight font-serif font-extralight max-w-[60vw]"
            >
              Enter your email address to continue
            </h1>

            <BaseInput
              large
              appendIcon="alternate_email"
              placeholder="Email"
              type="email"
              onchange={(e) => (email = e.currentTarget.value)}
              value={email}
            />

            <div class=" w-full flex flex-col lg:mt-10">
              <!-- Error will show here -->

              <button
                disabled={true}
                class="primary-button"
                onclick={continueWithEmail}
                type="button"
              >
                Continue
              </button>

              <hr
                class="mt-8 md:mt-16 opacity-60 border-1 border-neutral-800 dark:border-neutral-300"
              />

              <button
                class="primary-button bg-black dark:bg-white text-white dark:text-black w-full mt-4 md:mt-16 login-with-google-btn flex gap-4 items-center justify-center"
                onclick={continueWithSSO}
                type="button"
                disabled={loading}
              >
                Continue with Google &nbsp;
                {#if loading}
                  <Loading />
                {/if}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  // core components
  import { querystring, replace } from 'svelte-spa-router';
  import BaseInput from 'components/Inputs/BaseInput.svelte';
  import DarkModeToggle from 'components/DarkModeToggle.svelte';
  import { ApiURL } from 'utils/http_client';
  import { tokenTest } from '@/api/api_auth';

  import { onDestroy } from 'svelte';
  import Loading from 'components/Loading.svelte';

  let email = $state('');

  let loading = $state(false);

  let src: string | undefined = $state(
    'https://picsum.photos/id/525/3000?grayscale'
  );

  function continueWithEmail() {
    window.location.href = `${ApiURL}/auth/google`;
  }

  function continueWithSSO() {
    loading = true;
    window.location.href = `${ApiURL}/auth/google`;
  }

  const unsubscribe = querystring.subscribe((value) => {
    if (value !== undefined && value !== '') {
      let token = value.split('continue=')[1];
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  });

  tokenTest()
    .then(() => {
      replace('/dashboard');
    })
    .catch(() => {});
  onDestroy(unsubscribe);
</script>
