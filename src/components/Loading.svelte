<div class="lds-circle">
  <div></div>
</div>

<script lang="ts"></script>

<style>
  .lds-circle,
  .lds-circle div {
    box-sizing: border-box;
  }

  .lds-circle {
    height: 80%;
    display: inline-flex;
    transform: translateZ(1px);
  }

  .lds-circle > div {
    display: inline-block;
    aspect-ratio: 1;
    height: 100%;
    background: currentColor;
    padding: 5px;
    border-radius: 50%;
    animation: lds-circle 0.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(180deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
</style>
