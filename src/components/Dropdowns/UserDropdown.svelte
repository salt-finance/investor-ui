<div class="relative">
  <button class="block" bind:this={btnDropdownRef} onclick={toggleDropdown}>
    <span class="items-center flex">
      <RoundedImage src={image} fallBackText={userData?.firstName} />
    </span>
  </button>
  <div
    bind:this={popoverDropdownRef}
    class="z-50 py-2 list-none text-left rounded min-w-48 glass-effect dark:bg-opacity-90 bg-opacity-95 {dropdownPopoverShow
      ? 'block'
      : 'hidden'}"
  >
    <a
      use:link
      use:active
      href="/dashboard/settings"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
    >
      Settings
    </a>

    <div id="googleTranslateElement"></div>

    <button
      onclick={logout}
      class="text-sm py-2 px-4 font-normal flex justify-between items-center w-full whitespace-nowrap bg-transparent"
    >
      Logout <i class="fas fa-arrow-right-from-bracket"></i>
    </button>
  </div>
</div>

<script lang="ts">
  import { userStore } from '@/store/user';

  // library for creating dropdown menu appear on click
  import { createPopper } from '@popperjs/core';
  import { onDestroy } from 'svelte';
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
  import { logout } from '@/api/api_auth';
  import type { IUser } from 'models/user';
  import RoundedImage from 'components/RoundedImage.svelte';

  // core components

  let image: string | undefined = $state();

  let userData: IUser | undefined = $state();

  let dropdownPopoverShow = $state(false);

  let btnDropdownRef: Element | undefined = $state();
  let popoverDropdownRef: HTMLElement | undefined = $state();

  const unsubscribe = userStore.subscribe((user) => {
    if (user === undefined) {
      return;
    }
    userData = user;

    if (user.profilePicture) {
      image = user.profilePicture;
    }
  });

  onDestroy(unsubscribe);

  const toggleDropdown = (event: Event) => {
    event.preventDefault();
    if (dropdownPopoverShow) {
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      createPopper(btnDropdownRef!, popoverDropdownRef!, {
        placement: 'bottom-end'
      });
    }
  };
</script>
