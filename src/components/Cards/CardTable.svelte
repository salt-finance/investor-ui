<script lang="ts" module>
  export type TableColumn<T> = {
    key: keyof T
    header: string
    sortable?: boolean
    headerClasses?: string
    bodyClasses?: string
    type?: 'image' | 'action' | 'gainLoss'
    format?: 'currency' | 'number' | 'date' | 'percentage' | 'currencyChange'
    action?: (event: Event) => any
    imageFallBackProp?: string
    imageFallBackFunc?: (item: T) => string
    childColumn?: TableColumn<T>
  }
</script>

<script generics="T" lang="ts">
  import RoundedImage from 'components/RoundedImage.svelte'
  import type { Snippet } from 'svelte'
  import {
      currencyFormat,
      formatCurrencyWithNotation,
      formatPercentage,
      parsedDate,
      styleForValue,
  } from 'utils/formatTools'

  // Props
  let {
    data = $bindable(),
    columns,
    title,
    actionSnippet,
    sortIndex = 0,
    sortDirection = 'desc',
    onRowTap,
    sticky = false,
  } = $props<{
    data: any[]
    columns: TableColumn<T>[]
    title?: string
    actionSnippet?: Snippet<TableColumn<T>[]>
    sortIndex?: number
    sortDirection?: string
    onRowTap?: (data: T) => void
    sticky?: boolean
  }>()

  // State
  let sortedColumn = $state<keyof any | null>(null)

  // Sort function
  function sortData(column: keyof any, direction?: string) {
    if (sortedColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortedColumn = column
      sortDirection = direction ?? 'asc'
    }

    data = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (a[column] > b[column]) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  function columnClass(column: TableColumn<any>, row: any) {
    return [
      column.bodyClasses,
      column.type === 'image' ? 'h-24 align-baseline' : '',
      column.type === 'gainLoss' ? styleForValue(row[column.key]) : '',
      column.format === 'number' ||
      column.format?.includes('currency') ||
      column.format === 'percentage'
        ? 'loose-spacing whitespace-nowrap'
        : '',
    ].join(' ')
  }

  sortData(columns[sortIndex]?.key, sortDirection)
</script>

<div class="flex flex-col w-full pt-4">
  {#if title !== undefined}
    <div class="rounded-t mb-0 border-0 p-6">
      <h3 class="font-semibold text-lg capitalize">
        {title}
        {#if data.length > 0}
          ({data.length})
        {/if}
      </h3>
    </div>
  {/if}
  {#if data.length > 0}
    <table>
      <thead
        class="shadow-md shadow-foreground/5 border-b border-solid border-foreground/20 border-0 {sticky
          ? 'z-40 sticky top-0 dark:shadow-foreground/5 dark:shadow-xl'
          : ''}">
        <tr class="whitespace-nowrap bg-opacity-100 bg-background">
          {#each columns as column, index}
            <th
              class=" font-normal {column.headerClasses}
              {sticky ? 'pt-4 pb-8' : 'pb-8 pt-4'}
              {column.type === 'image' ? 'flex' : ''}
              {index === columns.length - 1 ? 'text-right pr-8' : column.type !== 'image' ? 'text-left px-3' : ""}"
              class:sortable={column.sortable}
              title={column.sortable ? `Click to sort` : ''}
              onclick={() => column.sortable && sortData(column.key)}>
              {#if column.sortable && sortedColumn === column.key}
                <span class="sort-indicator">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              {/if}
              {@html column.header}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row, index}
          <tr
            onclick={onRowTap !== undefined ? () => onRowTap(row) : () => {}}
            class:border-b={index !== data.length - 1}
            class="hover:bg-accent/30 dark:hover:bg-accent-dark/30 hover:cursor-pointer border-foreground/30">
            {#each columns as column, index}
              <td
                class="px-3 py-4 {columnClass(column, row)}               {index === columns.length - 1 ? 'text-right pr-8' : column.type !== 'image' ? 'text-left px-3' : ""}">
                {#if column.type === 'image'}
                  <div class="items-center justify-center flex h-full">
                    <RoundedImage
                      src={row[column.key]}
                      fallBackText={column.imageFallBackFunc
                        ? column.imageFallBackFunc(row)
                        : 'item'} />
                  </div>
                {:else if column.type === 'action' && actionSnippet}
                  {@render actionSnippet(row)}
                {:else if row[column.key] !== undefined}
                  {#if column.format === 'currency'}
                    {formatCurrencyWithNotation(row[column.key])}
                  {:else if column.format === 'currencyChange'}
                    {currencyFormat({
                      signDisplay: 'exceptZero',
                      style: 'currency',
                    })(row[column.key] ?? 0)}
                  {:else if column.format === 'percentage'}
                    {formatPercentage(row[column.key])}
                  {:else if column.format === 'date'}
                    {parsedDate(row[column.key])}
                  {:else}
                    {@html row[column.key] ?? '--'}
                  {/if}
                  {#if column.childColumn !== undefined}
                    <br />
                    {#if row[column.childColumn.key] !== undefined}
                      {#if column.childColumn.format === 'currency'}
                        {currencyFormat()(row[column.childColumn.key])}
                      {:else if column.childColumn.format === 'currencyChange'}
                        {currencyFormat({ signDisplay: 'exceptZero' })(
                          row[column.childColumn.key],
                        )}
                      {:else if column.childColumn.format === 'percentage'}
                        {formatPercentage(row[column.childColumn.key])}
                      {:else}
                        {row[column.childColumn.key]}
                      {/if}
                    {:else}
                      --
                    {/if}
                  {/if}
                {:else}
                  --
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <span class="p-6">No results found.</span>
  {/if}
</div>
