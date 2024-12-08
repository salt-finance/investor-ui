<script>
    import CardTable from "components/Cards/CardTable.svelte";
    import {blur, fly} from "svelte/transition";
    import {blurTransitionInConfig, blurTransitionOutConfig, staggerdTransition,} from "utils/animationTools.js";
</script>

<div in:fly={staggerdTransition(1)} class="w-full">
    <CardTable title={'Market'}/>
</div>

