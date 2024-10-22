<script>
  import Router from 'svelte-spa-router';    // components for this layout
    import FooterSmall from "components/Footers/FooterSmall.svelte";
    import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
// pages for this layout
    import Login from "views/auth/Login.svelte";
    import Register from "views/auth/Register.svelte";

    const registerBg2 = "/assets/img/register_bg_2.png";

    const routes = {
    // Exact path
    '/login': Login,

    // Using named parameters, with last being optional
    '/register': Register,
    '*': Login,
    
    
}
</script>

<div>
    <AuthNavbar />
    <main>
        <section class="relative w-full h-full py-40 min-h-screen">
            <div
                class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                style="background-image: url({registerBg2});"
            ></div>
            <Router prefix={'/auth'} {routes}>
        
            </Router>
            <FooterSmall absolute="true" />
        </section>
    </main>
</div>
