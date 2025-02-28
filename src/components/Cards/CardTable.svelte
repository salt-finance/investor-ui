<div class="flex flex-col w-full overflow-hidden">
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
    <table class="items-center w-full">
      <thead class="overflow-hidden bg-accent/20 dark:bg-accent-dark/20">
        <tr class="whitespace-nowrap text-left">
          {#each columns as column}
            <th
              class="py-4 font-normal {column.headerClasses} {column.type ===
              'image'
                ? 'flex'
                : ' px-3 '}"
              class:sortable={column.sortable}
              onclick={() => column.sortable && sortData(column.key)}
            >
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
        {#each data as row}
          <tr
            onclick={onRowTap !== undefined ? () => onRowTap(row) : () => {}}
            class="hover:bg-accent/30 dark:hover:bg-accent-dark/30 hover:cursor-pointer"
          >
            {#each columns as column}
              <td class="px-3 py-4 {columnClass(column, row)}">
                {#if column.type === 'image'}
                  <div class="items-center justify-center flex h-full">
                    <RoundedImage
                      src={row[column.key]}
                      fallBackText={row[column.imageFallBackProp]}
                    />
                  </div>
                {:else if column.type === 'action' && actionSnippet}
                  {@render actionSnippet(row)}
                {:else if row[column.key] !== undefined}
                  {#if column.format === 'currency'}
                    {currencyFormat()(row[column.key])}
                  {:else if column.format === 'currencyChange'}
                    {currencyFormat({
                      signDisplay: 'exceptZero',
                      style: 'currency'
                    })(row[column.key] ?? 0)}
                  {:else if column.format === 'percentage'}
                    {formatPercentage(row[column.key])}
                  {:else}
                    {row[column.key] ?? '--'}
                  {/if}
                  {#if column.childColumn !== undefined}
                    <br />
                    {#if row[column.childColumn.key] !== undefined}
                      {#if column.childColumn.format === 'currency'}
                        {currencyFormat()(row[column.childColumn.key])}
                      {:else if column.childColumn.format === 'currencyChange'}
                        {currencyFormat({ signDisplay: 'exceptZero' })(
                          row[column.childColumn.key]
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
    <span class="p-6"> No results found. </span>
  {/if}
</div>

<script lang="ts" module>
  export type TableColumn<T> = {
    key: keyof T;
    header: string;
    sortable?: boolean;
    headerClasses?: string;
    bodyClasses?: string;
    type?: 'image' | 'action' | 'gainLoss';
    format?: 'currency' | 'number' | 'date' | 'percentage' | 'currencyChange';
    action?: (event: Event) => any;
    imageFallBackProp?: string;
    childColumn?: TableColumn<T>;
  };
</script>

<script generics="T" lang="ts">
  import type { Snippet } from 'svelte';
  import {
    currencyFormat,
    formatPercentage,
    styleForValue
  } from 'utils/formatTools';
  import RoundedImage from 'components/RoundedImage.svelte';

  // Props
  let {
    data = $bindable(),
    columns,
    title,
    actionSnippet,
    sortIndex = 0,
    sortDirection = 'desc',
    onRowTap
  } = $props<{
    data: any[];
    columns: TableColumn<T>[];
    title?: string;
    actionSnippet?: Snippet<TableColumn<T>[]>;
    sortIndex?: number;
    sortDirection?: string;
    onRowTap?: (data: T) => void;
  }>();

  // State
  let sortedColumn = $state<keyof any | null>(null);

  // Sort function
  function sortData(column: keyof any, direction?: string) {
    if (sortedColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortedColumn = column;
      sortDirection = direction ?? 'asc';
    }

    data = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  function columnClass(column: TableColumn<any>, row: any) {
    return [
      column.bodyClasses,
      column.type === 'image' ? 'h-24 align-baseline' : '',
      column.type === 'gainLoss' ? styleForValue(row[column.key]) : '',
      column.format === 'number' ||
      column.format?.includes('currency') ||
      column.format === 'percentage'
        ? 'loose-spacing'
        : ''
    ].join(' ');
  }

  sortData(columns[sortIndex]?.key, sortDirection);
</script>
