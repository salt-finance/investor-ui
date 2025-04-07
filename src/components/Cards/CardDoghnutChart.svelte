<script lang="ts">
  import { theme } from '@/store/theme'
  import { Color, rgbParse } from '@kurkle/color'
  import type { Chart, ChartConfiguration, ScriptableContext } from 'chart.js'
  import { onDestroy, onMount } from 'svelte'
  import { MediaQuery } from 'svelte/reactivity'
  import { chartColors, createLinearGradientTwo } from 'utils/chartTools'
  import { styleForValue } from 'utils/formatTools'

  const labels = ['Profit', 'Loss']

  let { value } = $props<{
    value: number
  }>()

  let chart: Chart<'doughnut'>
  let canvas: HTMLCanvasElement | undefined

  let mobile = new MediaQuery('max-width: 639px')

  const unsubscribe = theme.subscribe(() => {
    if (!chart) {
      // This case happens on initial chart load
      return
    }
    chart.update()
  })

  const createOptions = (m: MediaQuery, baseConfig?:any) => {
    return {
      ...baseConfig,
      maintainAspectRatio: false,
      responsive: true,
      rotation: m.current ? -90 : 0,
      aspectRatio: m.current ? 2 : 1,
      circumference: m.current ? 180 : 360,

      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    }
  }

  const colors = (): string[] => {
    let style = window.getComputedStyle(document.body)
    let gain:string | undefined = style.getPropertyValue('--gain');
    let loss : string | undefined = style.getPropertyValue('--loss');
    if(gain !== '') {
      gain = new Color(rgbParse(`rgb(${gain})`)).hexString();
    }else{
      gain = undefined;
    }

    if(loss !== ''){
     loss  = new Color(rgbParse(`rgb(${loss})`)).hexString();
    }else{
      loss = undefined;
    }
    
    // gain = new Color(rgbParse(gain)).hexString();
    gain ??= chartColors.gain;
    loss ??= chartColors.loss;

    return [value > 0 ? gain : loss, '#fff0']
  }

  const isDark = () => document.body.classList.contains('dark')

  const createConfig = (
    data: number[],
  ): ChartConfiguration<'doughnut'> | undefined => {
    if (data === undefined || colors === undefined) {
      return
    }

    return {
      type: 'doughnut',
      options: {
        normalized: true,
        radius: '0%',
        clip: 50,
        cutout: 100,
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: '% of Trades',
            data: data,
            borderColor: function (context: ScriptableContext<'doughnut'>) {
              if (context.dataIndex === 1) {
                return isDark() ? '#fff5' : '#0005'
              }
              return '#0000'
            },
            borderAlign: 'inner',
            borderWidth: 1,

            backgroundColor: function (context: ScriptableContext<'doughnut'>) {
              let c = colors()[context.dataIndex]
              if (!c) {
                return
              }

              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) {
                // This case happens on initial chart load
                return
              } 
              return createLinearGradientTwo(
                ctx,
                chartArea,
                c,
                undefined,
                false,
              )
            },
            // animation: undefined,
            animation: {
              duration: 500,
              easing: 'easeInSine',
            },
            hoverOffset: 0,
          },
        ],
      },
    }
  }

  onMount(() => {
    show();
  });


  export async function show() {
    const { Chart } = await import('chart.js/auto')

    const absolute = Math.abs(value)
    const data = [absolute, absolute > 100 ? 0 : 100 - absolute]

    

    const config = createConfig(data)
    if (!config || !canvas) {
      return
    }
    chart?.destroy()

    chart = new Chart<'doughnut'>(canvas, config)
    chart.options = createOptions(mobile)
    chart.update()
  }

  $effect(() => {
    mobile.current

    if (!chart) {
      // This case happens on initial chart load
      return
    }
    chart.options = createOptions(mobile)

    chart.update()
  })
  onDestroy(unsubscribe)
</script>

<div
  class="relative flex justify-center items-end sm:place-items-center h-inherit">
  <h3
    class="text-2xl sm:text-3xl md:text-4xl md:font-extralight text-center select-none mb-2 w-full -motion-translate-y-out-50 translate-y-1/2 motion-opacity-out-100 opacity-0 duration-500 motion-delay-500 {styleForValue(
      value,
    )}">
    {value}%
  </h3>
  <canvas bind:this={canvas} class="bottom-0 md:top-0 absolute"></canvas>
</div>
