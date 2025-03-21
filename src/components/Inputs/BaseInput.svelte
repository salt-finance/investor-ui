<div class="form-group {baseClass} {large ? 'large-input' : ''}">
  {#if label !== undefined}
    <label
      class="block mb-2 {viewOnly ? 'body-text' : ''} {large
        ? 'text-lg lg:text-2xl font-semibold font-serif'
        : 'mb-2'}"
      for={id}>{label}</label
    >
  {/if}
  {#if !viewOnly}
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
        {disabled}
        {id}
        {type}
        {min}
        {max}
        {required}
        {placeholder}
        {onchange}
        {oninput}
        {onfocusout}
        class:large_input={large}
        class="bg-transparent {inputClass} {large
          ? 'large_input'
          : 'border-0 focus:outline-none w-full'}"
      />
      {#if appendIcon !== undefined}
        <i class="material-symbols-outlined skiptranslate">{appendIcon}</i>
      {/if}
    </div>
  {:else}
    {value ?? '--'}
  {/if}
</div>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  interface Props {
    required?: boolean;
    baseClass?: string;
    inputClass?: string;
    label?: string;
    value?: string | number;
    type?: string;
    min?: string;
    max?: string;
    appendIcon?: string;
    prependIcon?: string;
    placeholder?: string;
    onchange?: ChangeEventHandler<HTMLInputElement>;
    oninput?: ChangeEventHandler<HTMLInputElement>;
    onfocusout?: ChangeEventHandler<HTMLInputElement>;

    id?: string;
    large?: boolean;
    viewOnly?: boolean;
    disabled?: boolean | undefined | null;
  }

  let {
    required = false,
    baseClass,
    inputClass,
    label,
    value = $bindable(),
    type = 'text',
    min,
    max,
    appendIcon,
    prependIcon,
    placeholder,
    onchange,
    oninput,
    onfocusout,
    id,
    large,
    viewOnly,
    disabled = $bindable()
  }: Props = $props();
</script>
