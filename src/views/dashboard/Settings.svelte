<script lang="ts">
  // core components
  import { accountStore } from '@/store/account'
  import { userStore } from '@/store/user'
  import CardFunding from 'components/Cards/CardFunding.svelte'
  import CardSettings from 'components/Cards/CardSettings.svelte'
  import type { IAccount } from 'models/account'
  import type { IUser } from 'models/user'
  import { onDestroy } from 'svelte'
  import { circOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

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

<span class="page-title my-4 flex gap-2 items-centerd" 
in:fly|global={{
  y: 50,
  easing: circOut,
  opacity: 0,
  delay: 100,
  duration: 500,
}}
>
  <span class="material-symbols-outlined skiptranslate thin">settings</span>
  Settings
</span>
<div class="w-full block">
  {#if account !== undefined}
    <span class="text-lg font-light my-4 flex gap-2 items-center" in:fly|global={{
      y: 50,
      easing: circOut,
      opacity: 0,
      delay: 200,
      duration: 500,
    }}>
      <span class="material-symbols-outlined skiptranslate">money</span>
      Funding
    </span>
    <div class="w-full lg:w-1/2" in:fly|global={{
      y: 50,
      easing: circOut,
      opacity: 0,
      duration: 500,
    }}>
      <CardFunding {account} />
    </div>
  {/if}
  {#if user !== undefined}
    <span class="text-lg font-light my-4 flex gap-2 items-center" in:fly|global={{
      y: 50,
      easing: circOut,
      opacity: 0,
      delay: 600,
      duration: 500,
    }}>
      <span class="material-symbols-outlined skiptranslate thin">person</span>
      Profile
    </span>
    <div class="w-full lg:w-1/2" in:fly|global={{
      y: 50,
      easing: circOut,
      opacity: 0,
      delay: 400,
      duration: 500,
    }}>
      <CardSettings {user} />
    </div>
  {/if}
</div>
