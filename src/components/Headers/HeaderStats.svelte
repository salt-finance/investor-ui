<script lang="ts">
  // core components
  import CardStats from '@/components/Cards/CardStats.svelte'
  import { accountStore } from '@/store/account'
  import type { IAccount } from 'models/account'
  import { onDestroy } from 'svelte'
  import { circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import {
      currencyFormat,
      formatCurrencyWithNotation,
      formatPercentage,
      styleForValue,
  } from 'utils/formatTools'
  let account: IAccount | undefined = $state()

  const getStats = () => {
    return [
      {
        statTitle: 'Total Value',
        statText: `${formatCurrencyWithNotation(account?.balance?.total)}`,
        statDescription:
          account?.balance?.total !== undefined
            ? account.balance.total > 100000
              ? currencyFormat({ currencyDisplay: 'name' })(
                  account?.balance?.total,
                )
              : undefined
            : undefined,
        statIcon: 'leaderboard',
        statDown: false,
      },
      {
        statTitle: 'Holdings',
        statText: formatCurrencyWithNotation(account?.balance?.holdings),
        statDescription:
          account?.balance?.holdings !== undefined
            ? account.balance.holdings > 100000
              ? currencyFormat({ currencyDisplay: 'name' })(
                  account.balance.holdings,
                )
              : undefined
            : undefined,
        statIcon: 'category',
        statDown: false,
      },

      {
        statTitle: 'Cash',
        statText: formatCurrencyWithNotation(account?.balance?.cash),
        statDescription:
          account?.balance?.cash !== undefined
            ? account.balance.cash > 100000
              ? currencyFormat({ currencyDisplay: 'name' })(
                  account.balance.cash,
                )
              : undefined
            : undefined,
        statIcon: 'money',
        statDown: true,
      },
      {
        statTitle: 'Performance',
        statText: formatPercentage(account?.balance?.roi),
        statIcon: 'speed',
        statDown: true,
        titleClass: styleForValue(account?.balance?.roi),
      },
    ]
  }

  const unsubscribe = accountStore.subscribe((userAccount) => {
    if (userAccount) {
      account = userAccount
    }
  })

  onDestroy(unsubscribe)
</script>

<!-- Header -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-wrap gap-4">
  {#each getStats() as stat, index}
    <div   in:fly|global={{
     easing: circOut,
          duration:500,
          delay: index * 100,
          y: -100,
    }}>
      <CardStats
        statDescripiron={stat.statDescription}
        statIconName={stat.statIcon}
        statSubtitle={stat.statTitle}
        statTitle={stat.statText}
        titleClass={stat.titleClass} />
    </div>
  {/each}
</div>
