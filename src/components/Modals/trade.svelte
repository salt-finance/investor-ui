<script lang="ts">
    import {currencyFormat, decimalFormat} from "utils/formatTools";

    let {value, buy} = $props();
    let dialogRef: HTMLDialogElement | undefined = $state();

    let quantity = $state(0);

    let total = $derived(quantity * (value?.price ?? 0));

    export function show() {
        dialogRef?.showModal();
        quantity = 0;
    }
</script>

<dialog bind:this={dialogRef}>
    <div
            class="w-full max-w-96 glass-effect bg-opacity-80 flex flex-col border-0 overflow-hidden mx-auto"
    >
        <!--      HEADER-->
        <div
                class="p-4 text-white flex justify-between items-center {buy
        ? 'bg-lime-600'
        : 'bg-yellow-600'}"
        >
            <div class="flex flex-col">
                <span class="uppercase font-semibold">{buy ? "Buy" : "Sell"}</span>
                <span class="text-2xl font-black">{value?.name}</span>
            </div>

            <button
                    class="close-icon"
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
                <span> {currencyFormat()(value?.price ?? 0)}</span>
            </div>
            <div class="flex justify-between">
                <span>Cash available</span>
                <span>{currencyFormat()(50400.22)}</span>
            </div>
        </div>
        <div class="py-12 px-4 text-center flex flex-col justify-center">
            <div class="flex gap-4 justify-center mb-2">
                <button
                        class="text-base btn-icon"

                        onclick={() => quantity ++}


                > +
                </button>

                <input class="text-3xl select-none bg-transparent text-center max-w-16" bind:value="{quantity}"
                       type="text"
                       inputmode="numeric" size="3" pattern="\d*">

                <button
                        disabled={quantity === 0}
                        class="text-base  btn-icon"

                        onclick={() => quantity > 0 ? quantity-- : null}


                > -
                </button>
            </div>

            Shares to {buy ? "buy" : "sell"}
        </div>
        <div class="p-4 flex flex-col gap-4">
            <div class="flex justify-between">
                <span>Total price</span>
                <span class="text-xl">{currencyFormat(
                    {currencyDisplay: "name", notation: Math.abs(total) >= 1000000 ? "compact" : "standard"})(
                    total ?? 0)}</span>
            </div>

            <button
                    class="{buy
          ? 'btn-buy'
          : 'btn-sell'}"
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
