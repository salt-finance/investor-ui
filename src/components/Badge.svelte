<script lang="ts">
  
  interface Props {
    // export let tag = "span";
    pill?: boolean;
    circle?: boolean;
    icon?: string;
    variant?: string;
    size?: string;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let {
    pill = false,
    circle = false,
    icon = "",
    variant = "default",
    size = "",
    className = "",
    children
  }: Props = $props();
</script>

<span
  class="{className} {circle === true ? 'badge-circle' : ''}
  {pill === true ? 'badge-pill' : ''}
  {variant !== 'default' ? `badge-${variant}` : ""} badge"
  {size}>
  {#if children}{@render children()}{:else}
    {#if icon}
      <i class={icon}></i>
    {/if}
  {/if}
</span>
