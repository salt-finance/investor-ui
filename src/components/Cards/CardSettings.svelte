<div class="flex flex-col card bg-opacity-40">
  <div class="flex-auto p-4 lg:py-10 lg:px-8">
    <h6
      class="text-neutral-500 text-sm mb-6 gap-4 font-bold flex-wrap uppercase flex items-center justify-between"
    >
      Personal Information
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 gap-2 flex flex-col">
        <BaseInput viewOnly value={user.firstName} label="First Name" />
        <BaseInput viewOnly value={user.lastName} label="Last Name" />
      </div>
    </div>
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
