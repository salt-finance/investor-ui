<script>
  // core components
  import Footer from "components/Footers/Footer.svelte";
  import IndexNavbar from "../components/Navbars/IndexNavbar.svelte";

  const patternVue =
    "https://salt-finance.github.io/investor-ui/assets/img/pattern.svg";
</script>

<IndexNavbar />

<!-- svelte-ignore a11y-missing-attribute -->
<section class="header relative pt-16 items-center flex h-screen max-h-860-px">
  <div class="container mx-auto items-center flex flex-wrap">
    <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
      <div class="pt-32 sm:pt-0">
        <h2 class="font-semibold text-4xl text-slate-600 skiptranslate">
          Salt Finance
        </h2>
      </div>
    </div>
  </div>

  <img
    width="500px"
    height="500px"
    class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
    src={patternVue}
    alt="..."
  />
</section>

<Footer />
