<script>
  import Router from "svelte-spa-router"; // components for this layout
  // pages for this layout
  import Login from "views/auth/Login.svelte";
  import Register from "views/auth/Register.svelte";
  import IndexNavbar from "../components/Navbars/IndexNavbar.svelte";

  import Footer from "components/Footers/Footer.svelte";
  const patternVue =
    "https://salt-finance.github.io/investor-ui/assets/img/pattern.svg";
  const routes = {
    // Exact path
    "/login": Login,

    // Using named parameters, with last being optional
    "/register": Register,
    "*": Login,
  };
</script>

<div>
  <img
    width="500px"
    height="500px"
    class="h-screen w-screen fixed object-cover top-0 bg-no-repeat"
    src={patternVue}
    alt="..."
  />
  <div class="h-full flex justify-center flex-col w-full items-center relative">
    <div
      class="flex flex-col w-full
min-h-screen
    xl:max-w-screen-xl"
    >
      <div class="px-4 fixed top-4 w-full xl:max-w-screen-xl mb-4 z-10">
        <IndexNavbar />
      </div>
      <div class="h-screen justify-between flex flex-col px-4">
        <div class="w-full justify-center flex text-center lg:text-left mt-24">
          <Router prefix={"/auth"} {routes}></Router>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</div>
