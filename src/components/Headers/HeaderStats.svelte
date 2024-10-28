<script>
  // core components
  import CardStats from "components/Cards/CardStats.svelte";
</script>

<!-- Header -->
<div class="flex flex-wrap flex-row gap-4">
  <div class="w-full lg:w-6/12 flex-shrink ">
    <CardStats
      statSubtitle="Portfolio value"
      statTitle="350,897"
      statArrow="up"
      statPercent="3.48"
      statPercentColor="text-emerald-500"
      statDescripiron="Since last month"
      statIconName="fa fa-line-chart"
      statIconColor="bg-indigo-600 text-white"
    />
  </div>
  <div class="w-full flex-1 hidden md:block ">
    <CardStats
      statSubtitle="Portfolio diversity"
      statTitle="2,356"
      statArrow="down"
      statPercent="3.48"
      statPercentColor="text-red-500"
      statDescripiron="Since last week"
      statIconName="fa fa-pie-chart"
      statIconColor="bg-indigo-600 text-white"
    />
  </div>
  <div class="w-full hidden lg:block  lg:w-6/12 flex-shrink ">
    <CardStats
      statSubtitle="SALES"
      statTitle="924"
      statArrow="down"
      statPercent="1.10"
      statPercentColor="text-orange-500"
      statDescripiron="Since yesterday"
      statIconName="fas fa-users"
      statIconColor="bg-indigo-600 text-white"
    />
  </div>
  <div class="w-full flex-1 hidden lg:block ">
    <CardStats
      statSubtitle="PERFORMANCE"
      statTitle="49.65%"
      statArrow="up"
      statPercent="12"
      statPercentColor="text-emerald-500"
      statDescripiron="Since last month"
      statIconName="fas fa-percent"
      statIconColor="bg-indigo-600 text-white"
    />
  </div>
</div>
