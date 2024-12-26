<script lang="ts">
  let { value, buy } = $props();
  let dialogRef: HTMLDialogElement | undefined = $state();

  export function show() {
    dialogRef?.showModal();
  }
</script>

<dialog bind:this={dialogRef}>
  <div
    class="w-full max-w-96 glass-effect bg-opacity-80 flex flex-col border-0 overflow-hidden mx-auto"
  >
    <!--      HEADER-->
    <div
      class="p-4 text-white flex justify-between items-center {buy
        ? 'bg-lime-500'
        : 'bg-yellow-600'}"
    >
      <div class="flex flex-col">
        <span class="uppercase font-semibold">{buy ? "Buy" : "Sell"}</span>
        <span class="text-2xl font-black">{value?.symbol}</span>
      </div>

      <button
        class="icon-btn"
        id="cancel"
        onclick={(e) => {
          e.preventDefault();
          dialogRef?.close();
        }}
        type="reset"
      >
        <span class="material-symbols-outlined skiptranslate">
          cancel
        </span></button
      >
    </div>
    <div class="p-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <span>Unit price</span>
        <span>{value?.price}ETB</span>
      </div>
      <div class="flex justify-between">
        <span>Cash available</span>
        <span>50,400.22 ETB</span>
      </div>
    </div>
    <div class="py-12 px-4 text-center flex flex-col justify-center">
      <div class="flex gap-4 justify-center">
        + <span class="text-3xl">10.00</span> -
      </div>

      Shares to {buy ? "buy" : "sell"}
    </div>
    <div class="p-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <span>Total price</span>
        <span>34,200.22 ETB</span>
      </div>

      <button
        class="{buy
          ? 'bg-lime-500'
          : 'bg-yellow-600'} py-4 rounded-lg font-bold uppercase text-center text-white"
        onclick={(e) => {
          e.preventDefault();
          dialogRef?.close();
        }}
      >
        Place {buy ? "buy" : "sell"} order
      </button>
    </div>
  </div>
</dialog>
