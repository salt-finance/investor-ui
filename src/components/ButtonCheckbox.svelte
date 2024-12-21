<script lang="ts">
  interface Props {
    value?: string; //'Checked value'
    buttonClasses?: string; //'Inner button css classes'
    children?: import('svelte').Snippet;
  }

  let { value = "", buttonClasses = "", children }: Props = $props();
  let model = {
    prop: "value",
    event: "change"
  };
  function get() {
    return value;
  }

  function set(val) {
    this.$emit("change", val);
  }
</script>

<div class="btn-group-toggle" data-toggle="buttons">
       <label for="" class="btn {value ? "active" : ''} {buttonClasses}">
              <input type="checkbox" checked="" autocomplete="off" model="model">
              {@render children?.()}
       </label>
</div>
