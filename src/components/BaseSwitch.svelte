<script lang="ts">
  
  let baseClass = $state("custom-toggle-");
  interface Props {
    // export let value = [];
    type?: string;
    onText?: string;
    offText?: string;
    model?: string;
  }

  let {
    type = "",
    onText = "Yes",
    offText = "No",
    model = ""
  }: Props = $props();
  if (type) {
    baseClass = baseClass + type;
  }

  function triggerToggle() {
    model != model;
  }
</script>

<label class="custom-toggle {baseClass}">
  <input type="checkbox" checked={model} />
  <span
    class="custom-toggle-slider rounded-circle"
    data-label-off={offText}
    data-label-on={onText}></span>
</label>
