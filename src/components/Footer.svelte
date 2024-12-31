<footer class="bg-transparent w-full">
  <div
    class="mx-auto px-4 flex
 flex-wrap flex-col items-center glass-effect p-8 gap-8"
  >
    <div class="w-11/12 lg:w-8/12 px-10 text-center">
      <ul
        class="list-unstyled flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between gap-4"
      >
        <li>
          <a class="font-semibold block pb-2 text-sm" href="/">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a class="font-semibold block pb-2 text-sm" href="/">
            Privacy Policy
          </a>
        </li>
        <li>
          <a class="font-semibold block pb-2 text-sm" href="/"> Contact Us </a>
        </li>
      </ul>
    </div>
    <hr class="block border-neutral-700 w-11/12 lg:w-8/12" />
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="text-sm font-semibold skiptranslate">
        Copyright © {date} Salt Finance @ {version}
      </div>
    </div>
  </div>
</footer>

<script lang="ts">
  // make dynamic date to be added to footer
  let date = new Date().getFullYear();
  import { version } from '../../package.json';
</script>
