<div class="form-group {baseClass} {large ? 'large-input' : ''}">
  {#if label !== undefined}
    <label
      class="block mb-2 {large
        ? 'text-lg lg:text-2xl font-semibold font-serif'
        : 'mb-2'}"
      for={id}>{label}</label
    >
  {/if}
  <div
    class="flex w-full gap-2 justify-start items-center md:justify-center {large
      ? ''
      : 'card bg-opacity-50 px-3'}"
  >
    {#if prependIcon !== undefined}
      <i class="material-symbols-outlined skiptranslate">{prependIcon}</i>
    {/if}
    <input
      bind:value
      {id}
      {type}
      {required}
      {placeholder}
      {onchange}
      class:large_input={large}
      class="py-3 bg-transparent {large
        ? 'large_input'
        : 'border-0 focus:outline-none w-full'}"
    />
    {#if appendIcon !== undefined}
      <i class="material-symbols-outlined skiptranslate">{appendIcon}</i>
    {/if}
  </div>
</div>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  interface Props {
    required?: boolean;
    baseClass?: string;
    label?: string;
    value?: string;
    type?: string;
    appendIcon?: string;
    prependIcon?: string;
    placeholder?: string;
    onchange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    large?: boolean;
  }

  let {
    required = false,
    baseClass,
    label,
    value = $bindable(),
    type = 'text',
    appendIcon,
    prependIcon,
    placeholder,
    onchange,
    id,
    large
  }: Props = $props();
</script>
