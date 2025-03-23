<script lang="ts">
  // core components
  import CardSettings from 'components/Cards/CardSettings.svelte'
  import { userStore } from '@/store/user'
  import { onDestroy } from 'svelte'
  import type { IUser } from 'models/user'
  import { accountStore } from '@/store/account'
  import CardFunding from 'components/Cards/CardFunding.svelte'
  import type { IAccount } from 'models/account'

  let user: IUser | undefined = $state()
  let account: IAccount | undefined = $state()

  const userSubscription = userStore.subscribe((value) => {
    user = value
  })

  const accountSubscription = accountStore.subscribe((value) => {
    account = value
  })

  onDestroy(() => {
    userSubscription
    accountSubscription
  })
</script>

<span class="page-title my-4 flex gap-2 items-center">
  <span class="material-symbols-outlined skiptranslate thin">settings</span>
  Settings
</span>
<div class="motion-preset-fade w-full block">
  {#if account !== undefined}
    <span class="text-lg font-light my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate">money</span>
      Funding
    </span>
    <div class="w-full lg:w-1/2">
      <CardFunding {account} />
    </div>
  {/if}
  {#if user !== undefined}
    <span class="text-lg font-light my-4 flex gap-2 items-center">
      <span class="material-symbols-outlined skiptranslate thin">person</span>
      Profile
    </span>
    <div class="w-full lg:w-1/2">
      <CardSettings {user} />
    </div>
  {/if}
</div>
