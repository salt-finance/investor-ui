<div class="form-group {baseClass}">
  {#if label !== ''}
    <label class="mb-2 block" for={id}>{label}</label>
  {/if}
  <div
    class="flex w-full gap-2 max-w-fit card px-3 items-center justify-center content-center"
  >
    {#if prependIcon !== undefined}
      <i
        class="material-symbols-outlined skiptranslate text-opacity-80 dark-light-text"
        >{prependIcon}</i
      >
    {/if}
    <input
      {value}
      {id}
      {type}
      {required}
      {placeholder}
      class="border-0 py-3 bg-transparent focus:outline-none"
    />
    {#if appendIcon !== undefined}
      <i class="material-symbols-outlined skiptranslate">{appendIcon}</i>
    {/if}
  </div>
</div>

<script lang="ts">
  interface Props {
    required?: boolean;
    baseClass?: string;
    label?: string;
    value?: string;
    type?: string;
    appendIcon?: string;
    prependIcon?: string;
    placeholder?: string;
    id?: string;
  }

  let {
    required = false,
    baseClass,
    label,
    value,
    type = 'text',
    appendIcon,
    prependIcon,
    placeholder,
    id
  }: Props = $props();
</script>
