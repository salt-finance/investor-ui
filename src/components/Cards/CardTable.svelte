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
        <tr class="uppercase whitespace-nowrap font-semibold text-left">
          {#each columns as column}
            <th
              class="py-4 pl-4 {column.headerClasses}"
              class:sortable={column.sortable}
              onclick={() => column.sortable && sortData(column.key)}
            >
              {column.header}
              {#if column.sortable && sortedColumn === column.key}
                <span class="sort-indicator">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              {/if}
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
              <td class="py-4 pl-4 {column.bodyClasses}">
                {#if column.type === 'image'}
                  <img
                    class="rounded-full align-middle border-none max-w-fit aspect-square h-12"
                    src={row[column.key]}
                    alt="logo"
                  />
                {:else if column.type === 'action' && actionSnippet}
                  {@render actionSnippet(row)}
                {:else if column.format === 'currency'}
                  {currencyFormat()(row[column.key] ?? 0)}
                {:else}
                  {row[column.key] ?? '--'}
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
    type?: 'image' | 'action';
    format?: 'currency' | 'number' | 'date';
    action?: (event: Event) => any;
  };
</script>

<script generics="T" lang="ts">
  import type { Snippet } from 'svelte';
  import { currencyFormat } from 'utils/formatTools';

  // Props
  let {
    data,
    columns,
    title,
    actionSnippet,
    sortIndex = 0,
    onRowTap
  } = $props<{
    data: any[];
    columns: TableColumn<T>[];
    title?: string;
    actionSnippet?: Snippet<TableColumn<T>[]>;
    sortIndex?: number;
    onRowTap?: (data: T) => void;
  }>();

  // State
  let sortedColumn = $state<keyof any | null>(null);
  let sortDirection = $state<'asc' | 'desc'>('asc');

  // Sort function
  function sortData(column: keyof any) {
    if (sortedColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortedColumn = column;
      sortDirection = 'asc';
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

  sortData(columns[sortIndex]?.key);
</script>
