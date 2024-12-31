<div
  class="{className}
  {gradient !== '' ? `bg-gradient-${gradient}` : ''}
  {shadow ? `shadow` : ''}
  {type !== '' ? `bg-${type}` : ''}
  {shadowSize !== '' ? `shadow-${shadowSize}` : ''}
  {hover ? `card-lift--hover` : ''} {background === 'true'
    ? 'bg-candy'
    : ''} card"
>
  {#if imgTop === false && imgBottom === false}
    {#if imgSrc !== ''}
      <img src={imgSrc} {alt} class="card-img" />
    {/if}
  {/if}
  {#if imgTop !== false}
    {#if image}{@render image()}{:else}
      <img {alt} src={imgSrc} class="card-img-top" />
    {/if}
  {/if}
  {#if slots.header}
    <div class="card-header {headerClasses}">
      {@render header?.()}
    </div>
  {/if}
  {#if !noBody}
    <div class="card-body {bodyClasses}">
      {@render children?.()}
    </div>
  {/if}
  {#if noBody}
    {@render children?.()}
  {/if}
  {#if slots.footer}
    <div class="card-footer {footerClasses}">
      {@render footer?.()}
    </div>
  {/if}
  {#if imgBottom !== false}
    {#if image}{@render image()}{:else}
      <img {alt} src={imgSrc} class="card-img-bottom" />
    {/if}
  {/if}
</div>

<script lang="ts">
  interface Props {
    className?: string;
    headerClasses?: string;
    bodyClasses?: string;
    footerClasses?: string;
    gradient?: string;
    shadow?: string;
    shadowSize?: string;
    type?: string;
    hover?: boolean;
    imgTop?: boolean;
    imgBottom?: boolean;
    imgSrc?: string;
    alt?: string;
    background?: string;
    noBody?: boolean; //Whether card should have wrapper body class
    slots: any;
    image?: import('svelte').Snippet;
    header?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  }

  let {
    className = '',
    headerClasses = '',
    bodyClasses = '',
    footerClasses = '',
    gradient = '',
    shadow = '',
    shadowSize = '',
    type = '',
    hover = false,
    imgTop = false,
    imgBottom = false,
    imgSrc = '',
    alt = '',
    background = '',
    noBody = false,
    slots,
    image,
    header,
    children,
    footer
  }: Props = $props();
</script>

<style>
  .bg-candy {
    background: #262a33 !important;
  }
</style>
