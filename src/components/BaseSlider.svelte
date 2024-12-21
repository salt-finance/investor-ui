<script lang="ts">
  interface Props {
    value?: number; //'slider value'
    disabled?: boolean; //'whether the slider is disabled'
    start?: number; //'[noUi Slider start](https://refreshless.com/nouislider/slider-options/#section-start)'
    connect?: any; //'[noUi Slider connect](https://refreshless.com/nouislider/slider-options/#section-connect)'
    min?: number;
    max?: number;
    className?: string;
  }

  let {
    value = 10,
    disabled = false,
    start = 0,
    connect = [true, false],
    min = 0,
    max = 100,
    className = ""
  }: Props = $props();
</script>

<style>
  /* button range start */
  .custom-range::-webkit-slider-thumb {
    background-color: #5e72e4 !important;
    box-shadow: none;
  }

  .custom-range::-webkit-slider-thumb:active {
    background-color: #5e72e4 !important;
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
  }
  /* button range end */

  .custom-range::-webkit-slider-runnable-track{
    border-radius: 0px;
    background-color: #EBEEEF!important; 
  }

  .custom-range::-moz-range-thumb{
    border-radius: 0px;
  }


  .custom-range::-ms-thumb {
    border-radius: 0px;
  }

  .custom-range::-ms-track {
    border-radius: 0px;
  }

  .custon-radius::-ms-fill-lower {
    border-radius: 0px;
    background-color: #5e72e4!important;
  }

  .custom-range::-ms-fill-uper {
    border-radius: 0px;
    background-color: #E8EAEB!important; 
  }
</style>

<div class="slider {disabled ? 'disabled' : ''} {className}">
  <input
    type="range"
    class="custom-range"
    {min}
    {max}
    {value}
    step="0.01"
    style="height: 5px;" />
</div>
