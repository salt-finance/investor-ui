<script>
  import Router from 'svelte-spa-router';
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
    '/dashboard': Dashboard,
    '/settings': Settings,
    '/tables': Tables,
    '/maps': Maps,
    '*': Dashboard,   
}
 </script>

<div>
  <Sidebar/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar />
    <HeaderStats />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router prefix={'/admin'} {routes} />
      <FooterAdmin />
    </div>
  </div>
</div>
