<div class="h-full flex justify-center flex-col w-full items-center relative">
  <div
    class="flex flex-col w-full
xl:max-w-screen-xl"
  >
    <div class="px-4 fixed top-4 w-full xl:max-w-screen-xl mb-4 z-10">
      <IndexNavbar />
    </div>
    <div class="h-screen justify-between flex flex-col px-4">
      <div class="w-full justify-center flex text-center lg:text-left">
        <section class="relative flex flex-wrap gap-4 flex-row mt-24">
          <!-- light card -->
          <div
            class="justify-between flex flex-col gap-4 flex-wrap text-neutral-100
      bg-opacity-80 glass-effect bg-blue-900 rounded-lg py-20 min-h-500 px-10 w-full flex-1 flex-auto lg:flex-1"
          >
            <h2 class="font-bold text-4xl skiptranslate">
              Create your account
            </h2>
            <h4 class="text-lg text-neutral-200">
              Get started with your investment journey
            </h4>
            <p>
              Quas quidem at quisquam aspernatur ipsam tempora, eligendi
              veritatis, ea suscipit excepturi, illo facilis! Nihil animi,
              dignissimos ea optio sequi, non eum pariatur, reprehenderit
              laboriosam inventore fuga nostrum eius!
            </p>
            <button
              class="bg-white active:bg-blue-600 py-4 rounded-lg font-bold uppercase outline-none border-2 text-blue-500 border-blue-500 focus:outline-none mt-4 ease-linear transition-all duration-150 hover:bg-blue-500
        text-center hover:text-white"
              onclick={() => signUp()}
              type="button"
            >
              Create an Investment account
            </button>
          </div>
          <div
            class="justify-between flex-wrap flex flex-col bg-blue-200 rounded-lg py-20 min-h-500 px-10 flex-auto lg:flex-1 w-full gap-4 glass-effect bg-opacity-80 text-neutral-800"
          >
            <h2 class="font-bold text-4xl skiptranslate">
              Already have an account?
            </h2>
            <h4 class="text-neutral-600 text-lg">Manage your investments</h4>
            <p>
              Quod atque, ea, ab maiores delectus vel unde voluptate illum
              eligendi omnis tempora natus temporibus possimus perferendis nihil
              odio eos! Suscipit sequi nobis quam numquam sapiente totam
              dolorem?
            </p>
            <button
              class="bg-blue-500 text-white active:bg-blue-600 py-4 uppercase font-bold rounded-lg outline-none text-center focus:outline-none mt-4 ease-in-out
         hover:bg-blue-800 transition-all duration-150"
              onclick={() => signIn()}
              type="button"
            >
              Login
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  </div>
</div>

<script lang="ts">
  // core components
  import Footer from 'components/Footer.svelte';
  import IndexNavbar from 'components/IndexNavbar.svelte';
  import { push } from 'svelte-spa-router';

  function signIn() {
    push('/auth/login');
  }

  function signUp() {
    push('/auth/register');
  }
</script>
