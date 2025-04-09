<script lang="ts">
  // core components
  import { loginWithToken, startWithEmail, tokenTest } from '@/api/api_auth'
  import DarkModeToggle from 'components/DarkModeToggle.svelte'
  import BaseInput from 'components/Inputs/BaseInput.svelte'
  import { querystring, replace } from 'svelte-spa-router'
  import { ApiURL } from 'utils/http_client'

  import Loading from 'components/Loading.svelte'
  import { onDestroy, onMount } from 'svelte'

  let email = $state('')

  let loading = $state(false)

  let src: string | undefined = $state(
    'assets/img/login.jpg',
  )

  async function continueWithEmail() {
    loading = true
    await startWithEmail(email).finally(() => {
      loading = false
    })
  }

  function continueWithSSO() {
    loading = true
    window.location.href = `${ApiURL}/auth/google`
  }

  const unsubscribe = querystring.subscribe(async (value) => {
    if (value !== undefined && value !== '') {
      let token = value.split('continue=')[1]
      if (token) {
        loginWithToken(token)
      }
    }
  })

  onMount(async () => {
    const result = await tokenTest()
    if (result.data) {
      replace('/dashboard')
    }
  })

  onDestroy(unsubscribe)
</script>

<link rel="preload" as="image" href={src}>


<div
  class="flex flex-col body-colors p-5 lg:p-8 content-center w-screen flex-wrap h-screen overflow-hidden justify-center">
  <div class="xl:max-w-screen-2xl xl:max-h-[1400px] w-full h-[90%]">
    <div
      class="h-full w-full md:justify-stretch justify-between gap-4 relative">
      <div
        class="flex items-center z-10 absolute mx-5 lg:mx-10 mt-10 top-0 left-0 right-0 justify-between">
        <div
          class="text-2xl tracking-wide font-extralight leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate hover:no-underline">
          <div class="logo"></div>
        </div>
        <DarkModeToggle />
      </div>
      <div class="flex flex-col justify-end w-full gap-4 h-full">
        <div
          class="flex flex-row flex-wrap h-full w-full glass-effect overflow-hidden">
          <div
            class="lg:w-1/2 h-1/2 flex-col w-full lg:h-full lg:flex items-center justify-center content-start flex-wrap">
            {#if src !== undefined}
              <img
                {src}
                onerror={() => (src = undefined)}
                class="w-full h-full object-cover dark:opacity-80"
                alt="" />
            {/if}
          </div>
          <form
            class="overflow-y-auto flex flex-col justify-start lg:justify-center gap-4 w-full h-1/2 sm:w-3/4 lg:w-2/5 self-center mx-auto lg:h-full px-8 md:px-12 py-6 lg:mb-3">
            <h1
              class="text-xl md:text-2xl/tight font-serif font-extralight max-w-[60vw]">
              Enter your email address to continue
            </h1>

            <BaseInput
              large
              appendIcon="alternate_email"
              placeholder="Email"
              type="email"
              bind:disabled={loading}
              bind:value={email} />

            <div class=" w-full flex flex-col lg:mt-4">
              <!-- Error will show here -->

              <button
                disabled={!email || loading}
                class="primary-button gap-4"
                onclick={continueWithEmail}
                type="button">
                Continue

                {#if loading}
                  <Loading />
                {/if}
              </button>

              <hr
                class="my-8 opacity-60 border-1 border-neutral-800 dark:border-neutral-300" />

              <button
                class="primary-button bg-black dark:bg-white text-white dark:text-black w-full login-with-google-btn flex gap-4 items-center justify-center"
                onclick={continueWithSSO}
                type="button"
                disabled={loading}>
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
