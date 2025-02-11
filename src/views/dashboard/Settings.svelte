<div class="motion-preset-fade w-full block">
  {#if user !== undefined}
    <span class="page-title m-4 block">Profile </span>
    <CardSettings {user} />
  {/if}
  {#if account !== undefined}
    <span class="page-title m-4 block">Funding </span>
    <CardFunding {account} />
  {/if}
</div>

<script lang="ts">
  // core components
  import CardSettings from 'components/Cards/CardSettings.svelte';
  import { userStore } from '@/store/user';
  import { onDestroy } from 'svelte';
  import type { IUser } from 'models/user';
  import { accountStore } from '@/store/account';
  import CardFunding from 'components/Cards/CardFunding.svelte';
  import type { IAccount } from 'models/account';

  let user: IUser | undefined = $state();
  let account: IAccount | undefined = $state();

  const userSubscription = userStore.subscribe((value) => {
    user = value;
  });

  const accountSubscription = accountStore.subscribe((value) => {
    account = value;
  });

  onDestroy(() => {
    userSubscription;
    accountSubscription;
  });
</script>
