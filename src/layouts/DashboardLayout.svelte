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

<div
        class="flex h-screen w-screen flex-col lg:flex-row content-center"
>
    <!-- <div class="w-full lg:w-3/12 z-10">
      <Sidebar />
    </div> -->

    <div class="flex justify-center w-full min-h-fit px-4">
        <div class="fixed top-4 mb-4 z-20 xl:max-w-screen-xl max-w-full w-full px-4 xl:px-0">
            <IndexNavbar isLoggedIn={true}/>
        </div>

        <div class="flex flex-col xl:max-w-screen-xl pt-28 w-full min-h-fit">


            <div
                    class="flex flex-col mt-4">
                <HeaderStats/>
                {#if currentRouteTitle !== undefined}
                                        <span class="capitalize my-6 text-3xl font-extralight motion-preset-blur-up-lg motion-duration-500">
                {currentRouteTitle}
                </span>
                {/if}
                <div class="flex flex-wrap z-10">
                    <Router

                            prefix={"/dashboard"} {routes}/>
                </div>
                <FooterAdmin/>
            </div>
        </div>
    </div>
</div>
