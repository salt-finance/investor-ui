<script lang="ts">
    import CardTable from "../../components/Cards/CardTable.svelte";
    import {fly} from "svelte/transition";
    import {staggerdTransition} from "../../utils/animationTools.js";


    const data = [{
        "Date": "12-Nov-2024",
        "Transaction": "Bought 3 Shares ETC @ 400.00 Birr",
        "Security Name | Ticker": "Ethio Telecom | ETC",
        "Quantity": "3",
        "Price (Birr)": "400.00",
        "Net Amount (Birr)": "<span class='text-red-500'>-1,200.00</span>"
    }, {
        "Date": "11-Nov-2024",
        "Transaction": "Sold 4 Shares CBE @ 890.00 Birr",
        "Security Name | Ticker": "Commercial Bank of Ethiopia | CBE",
        "Quantity": "4",
        "Price (Birr)": "890.00",
        "Net Amount (Birr)": "3,560.00"
    }, {
        "Date": "10-Nov-2024",
        "Transaction": "Sold 8 Shares EIC @ 280.00 Birr",
        "Security Name | Ticker": "Ethiopian Insurance Corporation | EIC",
        "Quantity": "8",
        "Price (Birr)": "280.00",
        "Net Amount (Birr)": "2,240.00"
    }];
</script>

<div class="w-full" in:fly={staggerdTransition(1)}>
    <CardTable {data} title={'Activity'}/>
</div>

