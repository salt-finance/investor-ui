<script>
    // core components
    import CardStats from "components/Cards/CardStats.svelte";
</script>

<!-- Header -->
<div class="flex flex-wrap flex-row gap-4">
    <div class="w-full flex-1">
        <CardStats
                statSubtitle="Total value"
                statTitle="350,897.35 Birr"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="Since yesterday" statIconName="fa fa-line-chart"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
        />
    </div>
    <div class="w-full hidden md:block flex-1">
        <CardStats
                statSubtitle="holdings"
                statTitle="52,970.00 Birr"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="Since yesterday"
                statIconName="fa fa-pie-chart"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
        />
    </div>
    <div class="w-full hidden lg:block flex-1">
        <CardStats
                statSubtitle="Cash"
                statTitle="8,130.34 Birr"
                statIconName="fas fa-dollar"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
        />
    </div>
    <div class="w-full hidden lg:block flex-1">
        <CardStats
                statSubtitle="PERFORMANCE"
                statTitle="49.65%"
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="Since yesterday" statIconName="fas fa-percent"
                statIconColor="bg-blue-300 dark:bg-indigo-700 text-neutral-700 dark:text-neutral-300"
        />
    </div>
</div>
