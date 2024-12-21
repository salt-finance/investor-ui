<script lang="ts">
       interface Props {
              type?: string;
              children?: import('svelte').Snippet;
       }

       let { type = '', children }: Props = $props();
</script>

<div class="timeline {type ? `timeline-${type}` : ""}">
       {@render children?.()}
</div>