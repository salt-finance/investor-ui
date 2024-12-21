<script lang="ts">
  interface Props {
    type?: string;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let { type = "danger", className = "", children }: Props = $props();
</script>

<div class="header {type !== "" && type !== "light" ? `bg-${type}` : ""} {className}">
  <div class="container-fluid">
    <div class="header-body">
      {@render children?.()}
    </div>
  </div>
</div>
