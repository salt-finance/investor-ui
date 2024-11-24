<script>
  import Router from "svelte-spa-router";
  // components for this layout
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  import HeaderStats from "components/Headers/HeaderStats.svelte";
// pages for this layout
  import Activity from "views/admin/Activity.svelte";
  import Dashboard from "views/admin/Dashboard.svelte";
  import Holdings from "views/admin/Holdings.svelte";
  import Maps from "views/admin/Maps.svelte";
  import Market from "views/admin/Market.svelte";
  import Portfolio from "views/admin/Portfolio.svelte";
  import Settings from "views/admin/Settings.svelte";
  import Tables from "views/admin/Tables.svelte";
  import IndexNavbar from "../components/Navbars/IndexNavbar.svelte";

  const routes = {
    "/dashboard": Dashboard,
    "/holdings": Holdings,
    "/activity": Activity,
    "/market": Market,
    "/portfolio": Portfolio,
    "/settings": Settings,
    "/tables": Tables,
    "/maps": Maps,
    "*": Dashboard,
  };
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
      class="h-2/5 fixed w-full top-0 bg-gradient-to-b from-blue-600 to-transparent"
    ></div>
    <div
      class="flex flex-col w-full
      absolute
      top-0  
    min-h-screen 
    xl:max-w-screen-xl"
    >
    <div class="px-4 fixed top-4 w-full xl:max-w-screen-xl mb-4 z-10">
      <IndexNavbar isLoggedIn={true} />
    </div>
      <div
        class="flex flex-col mt-28 px-4"
      >
        <HeaderStats />
        <div class="flex flex-wrap mt-4">
          <Router prefix={"/admin"} {routes} />
        </div>
        <FooterAdmin />
      </div>
    </div>
  </div>
</div>
