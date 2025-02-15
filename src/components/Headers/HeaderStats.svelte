<!-- Header -->
<div class="grid grid-cols-2 lg:grid-cols-4 flex-wrap gap-4">
  {#each getStats() as stat}
    <div
      class="motion-translate-x-in-[20%] motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.44s]/opacity motion-ease-spring-bouncier"
    >
      <CardStats
        statDown={stat.statDown}
        statDescripiron={stat.statDescription}
        statIconName={stat.statIcon}
        statPercent={stat.statPercent}
        statSubtitle={stat.statTitle}
        statTitle={stat.statText}
      />
    </div>
  {/each}
</div>

<script lang="ts">
  // core components
  import CardStats from '@/components/Cards/CardStats.svelte';
  import type { IAccount } from 'models/account';
  import { onDestroy } from 'svelte';
  import { accountStore } from '@/store/account';
  import {
    formatCurrencyWithNotation,
    formatPercentage
  } from 'utils/formatTools';

  let account: IAccount | undefined = $state();

  const getStats = () => {
    return [
      {
        statTitle: 'Total Value',
        statText: `${formatCurrencyWithNotation(account?.balance?.total)}`,
        statDescription: 'Since yesterday',
        statPercent: formatPercentage(),
        statIcon: 'leaderboard',
        statDown: false
      },
      {
        statTitle: 'Holdings',
        statText: formatCurrencyWithNotation(account?.balance?.holdings),
        statDescription: 'Since yesterday',
        statPercent: formatPercentage(),
        statIcon: 'category',
        statDown: false
      },

      {
        statTitle: 'Cash',
        statText: formatCurrencyWithNotation(account?.balance?.cash),
        statDescription: 'Since yesterday',
        statIcon: 'money',
        statDown: true
      },
      {
        statTitle: 'Performance',
        statText: formatPercentage(account?.balance?.roi),
        statDescription: 'Since yesterday',
        statIcon: 'speed',
        statDown: true
      }
    ];
  };

  const unsubscribe = accountStore.subscribe((userAccount) => {
    if (userAccount) {
      account = userAccount;
    }
  });

  onDestroy(unsubscribe);
</script>
