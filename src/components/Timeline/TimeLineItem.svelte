<script lang="ts">
  interface Props {
    badgeType?: string;
    badgeIcon?: string;
    inverted?: boolean;
    badge?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let {
    badgeType = "success",
    badgeIcon = "",
    inverted,
    badge,
    children
  }: Props = $props();
 
</script>

<div class="timeline-block {inverted === true ? 'timeline-inverted' : ''}">
  {#if badge}{@render badge()}{:else}
    <span class="timeline-step {`badge-${badgeType}`}">
      <i class={badgeIcon}></i>
    </span>
  {/if}
  <div class="timeline-content">
    {@render children?.()}
  </div>
</div>
