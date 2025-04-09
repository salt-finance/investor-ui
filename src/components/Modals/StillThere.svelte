<script lang="ts">
  import { expiry, expiryTimeout, logout, tokenTest } from '@/api/api_auth'
  import ModalDialog from 'components/Modals/ModalDialog.svelte'
  import { mount, onDestroy, unmount } from 'svelte'



  let secondsLeft = $state(expiry)
  let refreshing = $state(false)

  // let countdown: NodeJS.Timeout
  let timeLeftCountDown: NodeJS.Timeout

  let refreshTimeout: NodeJS.Timeout

  async function getTimeLeft() {
    if(refreshing){
      return;
    }
    secondsLeft = expiryTimeout()?.secondsLeft ?? expiry
    
    if (secondsLeft < expiry) {
      show()
    }
     if(secondsLeft === 0){
      hide();
    }
   
  }

  // Start listening;

  timeLeftCountDown = setInterval(getTimeLeft, 1000)

  window.onpointerover = resetTimer // catches mouse movements

  async function resetTimer() {
    // Called on interaction.
    if (modal) {
      // Ignore events if modal is visible;
      return
    }
    clearTimeout(refreshTimeout)
    await getTimeLeft()
    // Call revalidate after :
    let refreshAfter = secondsLeft - expiry
    // Revalidate token after `refreshAfter` seconds to refresh the token from api;
    refreshTimeout = setTimeout(async () => {
      await revalidateToken()
      // check updateSecondsLeft every 1s until reset by validateTimeout;
    }, refreshAfter * 1000)
  }

  // Modal functions
  let target: HTMLElement

  let modal: Record<string, any> | undefined

  async function hide() {
    // close modal then revalidate only if visible
    if (modal) {
      await unmount(modal, { outro: true })
      await revalidateToken()
      modal = undefined
    }
  }

  function show() {
    if (modal) {
      return
    }
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
    refreshing = true;
    const result = await tokenTest()
    // If token has expired, trigger logout.
    if (result.error) {
      await logout()
      return
    }
    await getTimeLeft();
    refreshing = false;
  }

  onDestroy(() => {
    clearInterval(timeLeftCountDown)
    clearTimeout(refreshTimeout)
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
    onclick={hide}>
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
