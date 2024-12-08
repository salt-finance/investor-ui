<script lang="ts">
    import Router, {location} from "svelte-spa-router";
    // components for this layout
    import FooterAdmin from "../components/Footer.svelte";
    import HeaderStats from "../components/Headers/HeaderStats.svelte";
    // pages for this layout
    import Activity from "../views/dashboard/Activity.svelte";
    import Dashboard from "../views/dashboard/Dashboard.svelte";
    import Maps from "../views/dashboard/Maps.svelte";
    import Market from "../views/dashboard/Market.svelte";
    import Portfolio from "../views/dashboard/Portfolio.svelte";
    import Settings from "../views/dashboard/Settings.svelte";
    import Tables from "views/dashboard/Tables.svelte";
    import IndexNavbar from "components/IndexNavbar.svelte";
    import Holdings from "views/dashboard/Holdings.svelte";

    const routes = {
        "/holdings": Holdings,
        "/activity": Activity,
        "/market": Market,
        "/portfolio": Portfolio,
        "/settings": Settings,
        "/tables": Tables,
        "/maps": Maps,
        "*": Dashboard
    };

    let currentRouteTitle = $state();

    location.subscribe((val) => {
        var crumbs = val.split("/");
        currentRouteTitle = crumbs.at(crumbs.length - 1);
    });


</script>

<div
        class="flex h-screen w-screen flex-col lg:flex-row"
>
    <!-- <div class="w-full lg:w-3/12 z-10">
      <Sidebar />
    </div> -->

    <div class="h-full flex justify-center w-full
  relative items-center overflow-hidden overflow-y-scroll">
        <div
                class="h-3/5 fixed w-full top-0"
        ></div>
        <div
                class="flex flex-col w-full
      absolute
      top-0  
    min-h-screen 
    xl:max-w-screen-xl"
        >
            <div class="px-4 fixed top-4 w-full xl:max-w-screen-xl mb-4 z-10">
                <IndexNavbar isLoggedIn={true}/>
            </div>
            <div
                    class="flex flex-col mt-28 px-4"
            >
                <HeaderStats/>
                {#if currentRouteTitle !== undefined}
                                        <span class="capitalize my-6 text-3xl font-extralight">
                {currentRouteTitle}
                </span>
                {/if}
                <div class="flex flex-wrap">
                    <Router

                            prefix={"/dashboard"} {routes}/>
                </div>
                <FooterAdmin/>
            </div>
        </div>
    </div>
</div>
