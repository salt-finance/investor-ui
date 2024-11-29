<script>
  // core components
  import CardStats from "components/Cards/CardStats.svelte";
</script>

<!-- Header -->
<div class="flex flex-wrap flex-row gap-4">
  <div class="w-full flex-1">
    <CardStats
      statSubtitle="value"
      statTitle="350,897 Birr"
      statArrow="up"
      statPercent="3.48"
      statPercentColor="text-emerald-500"
      statDescripiron="Since last month"
      statIconName="fa fa-line-chart"
      statIconColor="bg-primary-600 text-white"
    />
  </div>
  <div class="w-full hidden md:block flex-1">
    <CardStats
      statSubtitle="Spread"
      statTitle="2,356"
      statArrow="down"
      statPercent="3.48"
      statPercentColor="text-red-500"
      statDescripiron="Since last week"
      statIconName="fa fa-pie-chart"
      statIconColor="bg-primary-600 text-white"
    />
  </div>
  <div class="w-full hidden lg:block flex-1">
    <CardStats
      statSubtitle="SALES"
      statTitle="924"
      statArrow="down"
      statPercent="1.10"
      statPercentColor="text-red-500"
      statDescripiron="Since last year"
      statIconName="fas fa-users"
      statIconColor="bg-primary-600 text-white"
    />
  </div>
  <div class="w-full hidden lg:block flex-1">
    <CardStats
      statSubtitle="PERFORMANCE"
      statTitle="49.65%"
      statArrow="up"
      statPercent="12"
      statPercentColor="text-emerald-500"
      statDescripiron="Since last month"
      statIconName="fas fa-percent"
      statIconColor="bg-primary-600 text-white"
    />
  </div>
</div>
