<script lang="ts">
  import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
  import CardTable, {
    type TableColumn,
  } from "../../components/Cards/CardTable.svelte";

  import holdings from "data/holdings.json";
  import { Security, type iSecurity } from "models/security";
  import { fly } from "svelte/transition";
  import { staggerdTransition } from "utils/animationTools";

  const data: iSecurity[] = [];

  const sec = Security.fromJsonList(holdings);
  //   console.log(sec);

  data.push(...sec);



  // Column definitions
  const columns: TableColumn<iSecurity>[] = [
    { key: "logoUrl", header: "", sortable: false, type: "image" },
    { key: "name", header: "Security Name", sortable: true },
    { key: "symbol", header: "Ticker", sortable: true },
    { key: "price", header: "Price", sortable: true },
    { key: "yearHigh", header: "52W High", sortable: true },
    { key: "dayChange", header: "Gain/Loss(Etb)", sortable: true },
    { key: "dayChangePercent", header: "Gain/Loss(%)", sortable: true },
    { key: "type", header: "Type", sortable: true },
    { key: "sector", header: "Sector", sortable: true },
    {
      key: "id",
      header: "",
      type: "action",
        action: (a) => console.table(a),
    },
  ];
</script>

{#snippet actionSnippet(value:iSecurity)}
  <TableDropdown value={value}/>
{/snippet}
<div class="w-full z-3" in:fly|global={staggerdTransition(1)}>
<CardTable title="Holdings" {data} {columns} {actionSnippet} sortIndex={2} />
</div>
