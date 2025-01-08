<!-- Header -->
<div class="flex flex-wrap flex-row gap-4">
  <div
    class="w-full flex-1 motion-translate-x-in-[20%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.44s]/opacity motion-ease-spring-bouncier"
  >
    <CardStats
      statArrow="down"
      statDescripiron="Since yesterday"
      statIconColor="icon-bg"
      statIconName="leaderboard"
      statPercent="3.48"
      statPercentColor="text-red-500"
      statSubtitle="Total value"
      statTitle="350,897.35 Birr"
    />
  </div>
  <div
    class="w-full hidden md:block flex-1 motion-translate-x-in-[20%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.44s]/opacity motion-ease-spring-bouncier motion-delay-100"
  >
    <CardStats
      statArrow="down"
      statDescripiron="Since yesterday"
      statIconColor="icon-bg"
      statIconName="category"
      statPercent="3.48"
      statPercentColor="text-red-500"
      statSubtitle="holdings"
      statTitle="52,970.00 Birr"
    />
  </div>
  <div
    class="w-full hidden lg:block flex-1 motion-translate-x-in-[20%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.44s]/opacity motion-ease-spring-bouncier motion-delay-200"
  >
    <CardStats
      statIconColor="icon-bg"
      statIconName="money"
      statSubtitle="Cash"
      statTitle="8,130.34 Birr"
    />
  </div>
  <div
    class="w-full hidden lg:block flex-1 motion-translate-x-in-[20%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.44s]/opacity motion-ease-spring-bouncier motion-delay-300"
  >
    <CardStats
      statArrow="up"
      statDescripiron="Since yesterday"
      statIconColor="icon-bg"
      statIconName="speed"
      statPercent="12"
      statPercentColor="text-emerald-500"
      statSubtitle="PERFORMANCE"
      statTitle="49.65%"
    />
  </div>
</div>

<script lang="ts">
  // core components
  import CardStats from '@/components/Cards/CardStats.svelte';
</script>
