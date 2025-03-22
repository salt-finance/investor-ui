<dialog bind:this={dialogRef}>
  {#if dialogVisible}
    <div
      class="w-full max-w-96 h-fit max-h-full rounded-xl card flex flex-col sm:mx-16 overflow-hidden p-6 {closing
        ? 'motion-hide'
        : 'motion-preset-expand motion-duration-300'}"
    >
      <!--      HEADER-->
      <div class="pb-4 flex justify-between w-auto items-center">
        <div class="flex flex-col">
          <span class="text-xl font-semibold">Signing Out</span>
        </div>

        <button
          class="close-icon text-2xl"
          id="cancel"
          onclick={hide}
          type="reset"
        >
          <span class="material-symbols-outlined skiptranslate">
            cancel
          </span></button
        >
      </div>
      <p>
        You have been inactive for a while. For security reasons you will be
        logged out in
      </p>
      <p>
        <strong> {secondsLeft} </strong> seconds.
      </p>

      <button class="primary-button my-3" onclick={hide}>
        Stay signed in
      </button>
      <button onclick={logout} class="secondary-button">
        Sign out ({secondsLeft}s)
      </button>
    </div>
  {/if}
</dialog>

<script lang="ts">
  import { expiryTimeout, logout, tokenTest } from '@/api/api_auth';
  import { onDestroy } from 'svelte';

  const timeout = 60;

  let dialogRef: HTMLDialogElement | undefined = $state();

  let secondsLeft = $state(timeout);

  let closing = $state(false);

  let dialogVisible = $state(false);

  let countdown: NodeJS.Timeout;

  function getTimeLeft() {
    secondsLeft = expiryTimeout()?.secondsLeft ?? timeout;
    if (secondsLeft < timeout) {
      show();
    }
  }

  // Start listening;
  resetTimer();

  window.onpointerover = resetTimer; // catches mouse movements

  async function resetTimer() {
    if (secondsLeft < timeout) {
      // Ignore events if modal is visible;
      return;
    }
    // Set seconds left to inital state, stop interval timer.
    clearInterval(countdown);
    secondsLeft = timeout;

    // Ensure token is valid and / or refresh it.
    await revalidateToken();
    // Check time left every 1s until canceled by resetTimer();
    countdown = setInterval(getTimeLeft, 1000);
  }

  async function hide(e?: Event) {
    e?.preventDefault();
    closing = true;
    // Clear interval set by show(); Revalidate token;
    clearInterval(countdown);
    await revalidateToken();
    // Check timeleft every 1s
    countdown = setInterval(getTimeLeft, 1000);
    // close modal
    setTimeout(() => {
      dialogRef?.close();
      closing = false;
      dialogVisible = false;
    }, 500);
  }

  function show() {
    dialogVisible = true;
    dialogRef?.showModal();
    // clear interval for getTimeLeft
    clearInterval(countdown);

    // Set countdown interval to countdown from secondsLeft to 0
    // if secondsLeft <= 0 call refresh();
    countdown = setInterval(async () => {
      if (secondsLeft > 0) {
        secondsLeft--;
        return;
      }

      if (secondsLeft <= 0) {
        await revalidateToken();
      }
    }, 1000);
  }

  async function revalidateToken() {
    const result = await tokenTest();
    // If token has expired, trigger logout.
    if (result.error) {
      await logout();
      return result;
    }
    return result;
  }

  onDestroy(() => {
    clearInterval(countdown);
  });
</script>
