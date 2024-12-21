<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<div class:selected="{$selectedTab === tab}" class="tab-pane" onclick={() => selectTab(tab)}>
	{@render children?.()}
</div>
