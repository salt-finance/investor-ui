<script>
    // core components
    import CardStats from "@/components/Cards/CardStats.svelte";
</script>

<!-- Header -->
<div class="flex flex-wrap flex-row gap-4">
    <div class="w-full flex-1">
        <CardStats
                statArrow="down"
                statDescripiron="Since yesterday"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
                statIconName="monitoring"
                statPercent="3.48"
                statPercentColor="text-red-500" statSubtitle="Total value"
                statTitle="350,897.35 Birr"
        />
    </div>
    <div class="w-full hidden md:block flex-1">
        <CardStats
                statArrow="down"
                statDescripiron="Since yesterday"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
                statIconName="pie_chart"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statSubtitle="holdings"
                statTitle="52,970.00 Birr"
        />
    </div>
    <div class="w-full hidden lg:block flex-1">
        <CardStats
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
                statIconName="money"
                statSubtitle="Cash"
                statTitle="8,130.34 Birr"
        />
    </div>
    <div class="w-full hidden lg:block flex-1">
        <CardStats
                statArrow="up"
                statDescripiron="Since yesterday"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
                statIconName="speed"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statSubtitle="PERFORMANCE"
                statTitle="49.65%"
        />
    </div>
</div>
