<script lang="ts">
  import { onMount } from 'svelte'

  import Loading from 'components/Loading.svelte'
  import { expoOut, sineOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  let dialogRef: HTMLDialogElement

  let {
    hide,
    loading = true,
    body,
    title,
    modalClass = 'w-full h-fit max-h-full lg:max-w-screen-lg rounded-xl card flex flex-col sm:mx-16 overflow-hidden',
    headerClass = 'py-4 mx-4 flex justify-between w-auto items-center',
  } = $props<{
    hide: () => void
    loading?: boolean
  }>()

  onMount(() => {
    dialogRef.showModal()
  })
</script>

<dialog
  bind:this={dialogRef}
  class="tearsheet"
  out:fly|global={{
    y: 50,
    easing: sineOut,
    opacity: 0,
    duration: 300,
  }}
  in:fly|global={{
    y: 50,
    easing: expoOut,
    opacity: 0,
    duration: 300,
  }}>
  <div class={modalClass}>
    <div class={headerClass}>
      <div class="flex flex-col">
        <span class="font-semibold text-lg">
          {@render title?.()}
        </span>
      </div>

      <button
        class="close-icon text-2xl"
        id="cancel"
        onclick={hide}
        type="reset">
        <span class="material-symbols-outlined skiptranslate">cancel</span>
      </button>
    </div>

    {#if loading}
      <Loading />
    {:else}
      {@render body?.()}
    {/if}
  </div>
</dialog>
