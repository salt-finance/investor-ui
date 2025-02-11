<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg card border-0"
>
  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
    <form>
      <h6 class="text-neutral-500 text-sm mt-3 mb-6 font-bold uppercase">
        Personal Information
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 gap-2 flex flex-col">
          <BaseInput viewOnly value={user.firstName} label="First Name" />
          <BaseInput viewOnly value={user.lastName} label="Last Name" />
        </div>
      </div>
    </form>
  </div>
</div>

<script lang="ts">
  import type { IUser } from 'models/user';
  import BaseInput from 'components/Inputs/BaseInput.svelte';

  interface Props {
    // core components
    user: IUser;
  }

  let { user }: Props = $props();
</script>
