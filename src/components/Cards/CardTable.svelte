<script module lang="ts">
    export type TableColumn<T> = {
        key: keyof T;
        header: string;
        sortable?: boolean;
        type?: "image" | "action";
        action?: (event: Event) => any;
    };
</script>

<script lang="ts" generics="T">
    import type {Snippet} from "svelte";

    // Props
    let {data, columns, title, actionSnippet, sortIndex = 0} = $props<{
        data: any[];
        columns: TableColumn<T>[];
        title: string;

        actionSnippet?: Snippet<TableColumn<T>[]>;
        sortIndex?: number;
    }>();


    // State
    let sortedColumn = $state<keyof any | null>(null);
    let sortDirection = $state<"asc" | "desc">("asc");

    // Sort function
    function sortData(column: keyof any) {
        if (sortedColumn === column) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        }
        else {
            sortedColumn = column;
            sortDirection = "asc";
        }

        data = [...data].sort((a, b) => {
            if (a[column] < b[column]) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });

    }

    sortData(columns[sortIndex]?.key);
</script>

<div class="flex flex-col w-full glass-effect">
    <div class="rounded-t mb-0 border-0 p-6">
        <h3 class="font-semibold text-lg capitalize">
            {title}
            {#if data.length > 0}
                ({data.length})
            {/if}
        </h3>
    </div>
    {#if data.length > 0}
        <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr
                    class="glass-effect uppercase whitespace-nowrap font-semibold text-left"
            >
                {#each columns as column}
                    <th
                            class="py-4 pl-4"
                            class:sortable={column.sortable}
                            onclick={(e) => column.sortable && sortData(column.key)}
                    >
                        {column.header}
                        {#if column.sortable && sortedColumn === column.key}
                <span class="sort-indicator">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
                        {/if}
                    </th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each data as row}
                <tr class="cursor-pointer">
                    {#each columns as column}
                        <td class="py-4 pl-4">
                            {#if column.type === "image"}
                                <img
                                        width="48"
                                        height="48"
                                        class="rounded-full align-middle border-none"
                                        src={row[column.key]}
                                        alt="logo"
                                />
                            {:else if column.type === "action" && actionSnippet}
                                {@render actionSnippet(row)}
                            {:else}
                                {row[column.key] ?? "--"}
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
