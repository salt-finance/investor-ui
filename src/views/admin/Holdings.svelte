<script lang="ts">
    import CardTable from "../../components/Cards/CardTable.svelte";
    import {fly} from "svelte/transition";
    import {staggerdTransition} from "../../utils/animationTools.js";

    import {Security} from "../../models/security";

    const d: Security[] = [];


    d.push(new Security("Ethio Telecom", "ETC", "id", "description", "sector", "ECMA", 5300, 5000, 5230, 5200, 30, 0.4, 5200, 5300, 5241, 400, 400000, 12, 0.12, "#"));

    console.table(d);

    const data = [{
        "Security Name | Ticker <br /> Security Type": "Ethio Telecom | <strong>ETC</strong> <br /> Common Stock",
        "Market Value (Birr) <br/> Cost Basis": "9,660.00 <br /> 8,130.00",
        "Quantity": "23",
        "Price (Birr)": "420.00",
        "Day Change (Birr)": "<span class='text-emerald-500'>+172.80 (+1.8%)</span>",
        "Gain/Loss (Birr)": "<span class='text-emerald-500'>+1,530.00 (+18.8%)</span>",
        "Weight": "18.2%"
    }, {
        "Security Name | Ticker <br /> Security Type": "Commercial Bank of Ethiopia | <strong>CBE</strong> <br /> Common Stock",
        "Market Value (Birr) <br/> Cost Basis": "38,270.00 <br /> 42,430.00",
        "Quantity": "42",
        "Price (Birr)": "890.00",
        "Day Change (Birr)": "<span class='text-red-500'>-972.45 (-2.5%)</span>",
        "Gain/Loss (Birr)": "<span class='text-red-500'>-4,160.00 (-11.1%)</span>",
        "Weight": "72.2%"
    }, {
        "Security Name | Ticker <br /> Security Type": "Ethiopian Insurance Corporation | <strong>EIC</strong> <br /> Common Stock",
        "Market Value (Birr) <br/> Cost Basis": "5,040.00 <br /> 4,620.00",
        "Quantity": "18",
        "Price (Birr)": "280.00",
        "Day Change (Birr)": "<span class='text-emerald-500'>+141.12 (+2.8%)</span>",
        "Gain/Loss (Birr)": "<span class='text-emerald-500'>+420.00 (+9.1%)</span>",
        "Weight": "9.6%"
    }];
</script>

<div class="w-full" in:fly={staggerdTransition(1)}>
    <CardTable {data} title={'holdings'}/>
</div>

