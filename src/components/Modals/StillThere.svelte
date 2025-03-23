<script lang="ts">
  import { expiryTimeout, logout, tokenTest } from '@/api/api_auth'
  import { mount, onDestroy, unmount } from 'svelte'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'

  const timeout = 60

  let secondsLeft = $state(timeout)

  let countdown: NodeJS.Timeout

  let validateTimeout: NodeJS.Timeout

  async function getTimeLeft() {
    secondsLeft = expiryTimeout()?.secondsLeft ?? timeout
    if (secondsLeft < timeout) {
      show()
    }
  }

  // Start listening;
  countdown = setInterval(getTimeLeft, 1000)

  window.onpointerover = resetTimer // catches mouse movements

  async function resetTimer() {
    // Called on interaction.
    if (secondsLeft < timeout) {
      // Ignore events if modal is visible;
      return
    }
    clearTimeout(validateTimeout)
    await getTimeLeft()
    // Call revalidate after :
    let refreshAfter = secondsLeft - timeout
    // Revalidate token after `refreshAfter` seconds to refresh the token from api;
    validateTimeout = setTimeout(async () => {
      clearInterval(countdown)
      await revalidateToken()
      // check updateSecondsLeft every 1s until reset by validateTimeout;
      countdown = setInterval(getTimeLeft, 1000)
    }, refreshAfter * 1000)
  }

  // Modal functions
  let target: HTMLElement

  let modal: Record<string, any>

  async function hide() {
    // Clear interval set by show(); Revalidate token;
    clearInterval(countdown)
    await revalidateToken()
    // Check timeleft every 1s
    countdown = setInterval(getTimeLeft, 1000)
    // close modal
    await unmount(modal, { outro: true })
  }

  function show() {
    // clear interval for getTimeLeft
    clearInterval(countdown)

    // Set countdown interval to countdown from secondsLeft to 0
    // if secondsLeft <= 0 call refresh();
    countdown = setInterval(async () => {
      if (secondsLeft > 0) {
        secondsLeft--
        return
      }

      if (secondsLeft <= 0) {
        await revalidateToken()
      }
    }, 1000)

    let props = {
      hide: hide,
      title: title,
      body: body,
      loading: false,
      headerClass: 'pb-4 flex justify-between w-auto items-center',
      modalClass:
        'w-full max-w-96 h-fit max-h-full rounded-xl card flex flex-col sm:mx-16 overflow-hidden p-6',
    }
    modal = mount(ModalDialog, { props, target })
  }

  async function revalidateToken() {
    const result = await tokenTest()
    // If token has expired, trigger logout.
    if (result.error) {
      await logout()
      return result
    }
    secondsLeft = expiryTimeout()?.secondsLeft ?? timeout

    return result
  }

  onDestroy(() => {
    clearInterval(countdown)
    clearTimeout(validateTimeout)
  })
</script>

<div bind:this={target}></div>

{#snippet title()}
  <span class="text-xl font-semibold inline-flex items-center gap-1">
    <span class="material-symbols-outlined skiptranslate">search_activity</span>
    Still there ?
  </span>
{/snippet}

{#snippet body()}
  <p>
    You have been inactive for a while. <br />
    <br />
    For security reasons you will be signed out in
  </p>
  <p>
    <strong>{secondsLeft}</strong>
    seconds.
  </p>

  <button
    class="primary-button my-3 justify-between gap-10 mt-10"
    onclick={hide}
  >
    <span class="flex-grow">Stay signed in</span>
    <span class="border-current border-solid border-l self-stretch"></span>
    <span class="material-symbols-outlined skiptranslate text-[1.25rem]">
      lock_open
    </span>
  </button>
  <button onclick={logout} class="secondary-button justify-between gap-10">
    <span class="flex-grow">
      Sign out ({secondsLeft}s)
    </span>

    <span class="border-current border-solid border-l self-stretch"></span>

    <span class="material-symbols-outlined skiptranslate text-[1.25rem]">
      lock
    </span>
  </button>
{/snippet}
