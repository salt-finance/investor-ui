<script>
  import Router from "svelte-spa-router";
  // components for this layout
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  import HeaderStats from "components/Headers/HeaderStats.svelte";
  import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
// pages for this layout
  import Dashboard from "views/admin/Dashboard.svelte";
  import Maps from "views/admin/Maps.svelte";
  import Settings from "views/admin/Settings.svelte";
  import Tables from "views/admin/Tables.svelte";

  const routes = {
    "/dashboard": Dashboard,
    "/settings": Settings,
    "/tables": Tables,
    "/maps": Maps,
    "*": Dashboard,
  };
</script>

<AdminNavbar />

<div class="h-full flex justify-center">
  <div
    class="w-full h-1/3 fixed top-0 bg-gradient-to-br from-blue-700 to-indigo-300"
  ></div>
  <Sidebar />
  <div
    class="min-h-screen w-11/12 sm:w-10/12 md:w-9/12 max-w-screen-xl flex flex-col top-40 relative"
  >
    <HeaderStats />
    <div class="flex flex-wrap mt-8">
      <Router prefix={"/admin"} {routes} />
    </div>
    <FooterAdmin />
  </div>
</div>
