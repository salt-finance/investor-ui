<script lang="ts">
    import Router, {location} from "svelte-spa-router";
    // components for this layout
    import FooterAdmin from "components/Footer.svelte";
    import HeaderStats from "components/Headers/HeaderStats.svelte";
    // pages for this layout
    import IndexNavbar from "components/IndexNavbar.svelte";
    import Activity from "views/dashboard/Activity.svelte";
    import Dashboard from "views/dashboard/Dashboard.svelte";
    import Holdings from "views/dashboard/Holdings.svelte";
    import Market from "views/dashboard/Market.svelte";
    import Portfolio from "views/dashboard/Portfolio.svelte";
    import Settings from "views/dashboard/Settings.svelte";

    const routes = {
        "/holdings": Holdings,
        "/activity": Activity,
        "/market": Market,
        "/portfolio": Portfolio,
        "/settings": Settings,
        "*": Dashboard
    };

    let currentRouteTitle = $state();

    location.subscribe((val) => {
        currentRouteTitle = undefined;
        var crumbs = val.split("/");
        currentRouteTitle = crumbs.at(crumbs.length - 1);
    });


</script>

<div class="flex flex-col lg:flex-row content-center">

    <div class="flex justify-center w-full min-h-fit">
        <div class="fixed top-4 mb-4 z-20 xl:max-w-screen-xl max-w-full w-full px-4 xl:px-0">
            <IndexNavbar isLoggedIn={true}/>
        </div>

        <div class="xl:max-w-screen-xl max-w-full w-full px-4 xl:px-0 flex flex-col justify-between gap-4 py-20 min-h-screen">


            <div class="flex flex-col justify-end w-full gap-4 flex-grow pt-8">

                <HeaderStats/>
                {#if currentRouteTitle !== undefined}
                    <span class="capitalize text-3xl font-extralight motion-preset-blur-up-lg motion-duration-500">{currentRouteTitle}</span>
                {/if}
                <div class="flex flex-wrap z-10">
                    <Router

                            prefix={"/dashboard"} {routes}/>
                </div>
            </div>
            <FooterAdmin/>

        </div>
    </div>
</div>
