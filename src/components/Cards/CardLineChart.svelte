<div class="relative h-inherit">
  <canvas bind:this={chartCanvas} class="absolute top-0"></canvas>
</div>

<script lang="ts">
  import type { Chart, ChartConfiguration } from 'chart.js'
  import { onDestroy, onMount } from 'svelte'

  import { theme } from '@/store/theme'
  import { Color, rgbParse } from '@kurkle/color'
  import {
      chartColors,
      createLinearGradient,
      defaultConfigs,
      type AnyObject
  } from 'utils/chartTools'
  import { currencyFormat, dateTimeFormat } from 'utils/formatTools'
  import { formatCurrencyWithNotation } from 'utils/formatTools.js'
  // init chart

  let {
    dataLength = 190,
    range = 100,
    startingValue = 1000,
    disabled = false,
    smooth = false
  } = $props<{
    dataLength?: number;
    range?: number;
    startingValue?: number;
    disabled?: boolean;
    smooth?:boolean;
  }>();

  export function latest() {
    return latestValue;
  }

  let isDark = $state(false);

  let chart: Chart | undefined;

  const startDate = Date.now();
  let latestValue = $state(0);

  const generateData = (length: number) => {
    return [...Array(length).keys()].map(() => {
      let factor: number = Math.sin(100000 * Math.random() * Math.random());
      let value = latestValue;

      value = Math.floor(latestValue + factor * range * 5);
      latestValue = value;

      return value;
    });
  };

  let data: number[] = [];

  let labels = [...Array(dataLength).keys()]
    .map((i) => dateTimeFormat(startDate - dataLength * range * i,))
    .reverse();


    const colors = (gainColor? : boolean): string => {
    let style = window.getComputedStyle(document.body)
    let gain:string | undefined = style.getPropertyValue('--gain');
    let loss : string | undefined = style.getPropertyValue('--loss');
    let accent : string | undefined = style.getPropertyValue('--accent');
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

    if(accent !== ''){
     accent  = new Color(rgbParse(`rgb(${accent})`)).hexString();
    }else{
      accent = undefined;
    }
    
    // gain = new Color(rgbParse(gain)).hexString();
    gain ??= chartColors.gain;
    loss ??= chartColors.loss;
    if(disabled ){
      accent = chartColors.grey;
    }
    accent ??= chartColors.grey;
    

    return gainColor === false ? loss : gainColor === true ? gain : accent;
  }

  let chartColorBase = colors(); 

  let borderFill: string | undefined;
  let backgroundFill: CanvasGradient | undefined;

  const options = (baseConfig: any) => {
    return {
      ...baseConfig,

      scales: {
        ...baseConfig?.scales,

        x: {
          ...baseConfig?.scales?.x,

          grid: {
            display: false
          }
        },
        y: {
          ...baseConfig?.scales?.y,

          ticks: {
            ...baseConfig?.scales?.y?.ticks,
            // Include a dollar sign in the ticks
            callback: function (value: any) {
              value = value as number;
              return formatCurrencyWithNotation(value);
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
           ...baseConfig?.plugins?.tooltip,
           enabled:!disabled,
          callbacks: {
            ...baseConfig?.plugins?.tooltip?.callbacks,
            label: function (context: any) {
              let label = '';

              if (context.parsed.y !== null) {
                label += currencyFormat({
                  currencyDisplay: 'name',
                  signDisplay: 'negative'
                })(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
  };
  const unsubscribe = theme.subscribe((theme) => {
  isDark = theme.includes('dark')
     updateDarkLight();
  });

  function updateDarkLight() {
    if (!chart) {
      // This case happens on initial chart load
      return;
    }

    chart.options = options(defaultConfigs(isDark));
    chart.update();
  }

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Account 1',

          fill: true,
          pointStyle: false,
          // cubicInterpolationMode: "monotone",
          tension: smooth ? 0.4 : 0,
          data: data,
          // animation: false,
          animation: defaultConfigs().animation,
          backgroundColor: function (context: AnyObject) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            if (backgroundFill === undefined) {
              backgroundFill = createLinearGradient(
                ctx,
                chartArea,
                chartColorBase
              );
            }
            return backgroundFill;
          },
          borderColor: function () {
            if (borderFill == null) {
              borderFill = chartColorBase;
            }
            return borderFill;
          }
        }
      ]
    }
  };



  const setData = (date: Date) => {
    let values = generateData(2);

    let value = values[1];

    let label = dateTimeFormat(date.getTime(),);
    labels.push(label);
    data.push(value);

    borderFill = undefined;
    backgroundFill = undefined;
    chartColorBase =
      data[data.length - 1] >= data[data.length - 2]
        ? colors(true)
        : colors(false);
    chart?.update();
  };

  let a: NodeJS.Timeout | undefined;

  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
    show(startingValue);
  });

  export async function show(startingValue: number) {
    if (startingValue === undefined) {
      return;
    }
    latestValue = startingValue;

    let values = generateData(dataLength);

    data.push(...values);

    let { Chart } = await import('chart.js/auto');
    chart = new Chart(chartCanvas, config);

    chart.options = options(defaultConfigs(isDark));
    chart.update();
    updateDarkLight();
    if (!disabled) {
      a = setInterval(() => setData(new Date(Date.now())), 1500);
    }
  }

  export async function destroy() {
    unsubscribe();
    if (a !== undefined) {
      clearInterval(a);
      a = undefined;
    }
    chart?.destroy();
    chart = undefined;
  }

  onDestroy(() => {
    destroy();
  });
</script>
