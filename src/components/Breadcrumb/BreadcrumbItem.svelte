<script lang="ts">
       interface Props {
              active?: boolean;
              children?: import('svelte').Snippet;
       }

       let { active = false, children }: Props = $props();
</script>

<li class="breadcrumb-item {active === true ? "active" : ""}">
       {@render children?.()}
</li>