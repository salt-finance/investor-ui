<script lang="ts">
       interface Props {
              type?: string;
              listClasses?: string;
              children?: import('svelte').Snippet;
       }

       let { type = "", listClasses = "", children }: Props = $props();
</script>

<nav aria-label="breadcrumb">
       <ol class="{listClasses} bg-{type} breadcrumb">
              {@render children?.()}
       </ol>
</nav>