<script lang="ts">
  interface Props {
    target?: string; //'Close button target element'
    expanded?: string; //'Whether button is expanded (aria-expanded attribute)'
  }

  let { target = "", expanded = "" }: Props = $props();
  function handleClick(evt) {
    this.$emit("click", evt);
  }
</script>

<button
  type="button"
  class="navbar-toggler"
  data-toggle="collapse"
  onclick={handleClick}
  data-target="#{target}"
  aria-controls="target"
  aria-expanded="expanded"
  aria-label="Toggle navigation">
  <span></span>
  <span></span>
</button>
