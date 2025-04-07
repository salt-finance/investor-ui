<div class="form-group {baseClass} {large ? 'large-input' : ''}">





  {#if label !== undefined}
    <label
    class="card flex cursor-pointer rounded-lg items-center border-accent border border-opacity-0 has-[input:checked]:border-opacity-50 transition-all hover:border-opacity-50 justify-between p-4">
    <span>{label}</span>
  
    <input
    {disabled}
  bind:checked
  {onchange}
      class="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-accent checked:ring-accent transition-all"
      type="checkbox" />
  </label>
  {/if}
</div>

<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements'

  interface Props {
    required?: boolean;
    baseClass?: string;
    inputClass?: string;
    label: string;
    checked: boolean;
    value?: any;
    group?: string;
    type?: string;
    min?: string;
    max?: string;
    appendIcon?: string;
    prependIcon?: string;
    pattern?: string;
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
    baseClass,
    label,
    checked = $bindable(),
    onchange, 
    large,
    disabled = $bindable()
  }: Props = $props();
</script>
