<script lang="ts">
  interface Props {
    target?: string; // 'Button target element'
    toggled?: boolean; // 'Whether button is toggled'
  }

  let { target = "", toggled = false }: Props = $props();
</script>

<button
  class="navbar-toggler"
  type="button"
  data-toggle="collapse"
  data-target="target"
  aria-controls="target"
  aria-expanded="toggled"
  aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
