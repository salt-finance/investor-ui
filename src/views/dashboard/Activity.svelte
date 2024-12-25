<script lang="ts">
    import CardTable, { type TableColumn } from "components/Cards/CardTable.svelte";
    import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
    import { fly } from "svelte/transition";
    import { staggerdTransition } from "utils/animationTools";
    const columns: TableColumn<Record<string, any>>[] = [
    
    { key: "Date", header: "Date", sortable: true },
    { key: "Transaction", header: "Description", sortable: true },
    { key: "name", header: "Security | Ticker", sortable: true },
    { key: "Quantity", header: "Quantity (Shares)", sortable: true },
    { key: "Price", header: "Price (Etb)", sortable: true },
    { key: "netAmount", header: "Net Amount (Etb)", sortable: true },
    {
      key: "id",
      header: "",
      type: "action",
        action: (a) => console.table(a),
    },
  ];

    const data = [
        {
            "Date": "Nov 12-2024",
            "Transaction": "Bought 3 Shares ETC @ 400.00 Birr",
            "name": "Ethio Telecom | ETC",
            "Quantity": "3.00",
            "symbol": "ETC",
            "Price": "400.00",
            "netAmount": "-1,200.00"
        }, {
            "Date": "Dec 19-2024",
            "Transaction": "Sold 4 Shares CBE @ 890.00 Birr",
            "name": "Commercial Bank of Ethiopia | CBE",
            "Quantity": "4.00",
            "symbol": "CBE",
            "Price": "890.00",
            "netAmount": "3,560.00"
        }, {
            "Date": "Nov 22-2024",
            "Transaction": "Sold 8 Shares EIC @ 280.00 Birr",
            "name": "Ethiopian Insurance Corporation | EIC",
            "Quantity": "8.00",
            "symbol": "EIC",
            "Price": "280.00",
            "netAmount": "2,240.00"
        }
    ];
</script>
{#snippet actionSnippet(value:Record<string, any>)}
  <TableDropdown value={value}/>
{/snippet}
<div class="w-full z-3" in:fly|global={staggerdTransition(1)}>
    <CardTable {columns} {data} title={'Activity'} {actionSnippet}/>
</div>

