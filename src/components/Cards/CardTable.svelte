<script lang="ts">
    // core components
    import TableDropdown from "../../components/Dropdowns/TableDropdown.svelte";

    // can be one of light or dark
    const security = {"Security Name | Ticker": "Ethio Telecom | ETC", "Price": "1200.00", "Market Cap": "300M"};

    let {data, title = "Table"}: {
        data: Record<string, any>[],
        title: string
    } = $props();


    const columns = data !== undefined ? Object.keys(data[0]) : [];
    const rows = data !== undefined ? data.map((element) => Object.values(element)) : [];

</script>

<div
        class="flex flex-col w-full rounded-lg glass-effect"
>
    <div class="rounded-t mb-0 border-0 p-6">
        <h3
                class="font-semibold text-lg capitalize"
        >
            {title}
            {#if rows.length > 0}
                ({rows.length})
            {/if}
        </h3>
    </div>
    <div class="block w-full overflow-x-auto pb-6">
        <!-- Projects table -->
        {#if columns.length > 0}
            <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr
                        class="glass-effect uppercase whitespace-nowrap font-semibold text-left"

                >
                    {#each columns as item, index}
                        <th class="py-4 pl-4 {index > 2 ? 'hidden lg:table-cell' : ''}">
                            {@html item}
                        </th>
                    {/each}
                    <th
                            class="whitespace-nowrap font-semibold text-left"
                    ></th>
                </tr>
                </thead>
                <tbody>


                {#each rows as row}
                    <tr class="hover:glass-effect cursor-pointer">
                        {#each row as item, index}
                            <td

                                    class="py-4 pl-4 {index > 2 ? 'hidden lg:table-cell' : ''}"
                            >
                                {@html item}
                            </td>
                        {/each}

                        <td
                                class="py-4 text-right px-4"
                        >
                            <TableDropdown/>
                        </td>
                    </tr>

                {/each}

                </tbody>
            </table>
        {:else }
            <span class="p-6">
            No results found.
            </span>

        {/if}
    </div>
</div>
