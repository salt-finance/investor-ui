<script>
  // make dynamic date to be added to footer
  let date = new Date().getFullYear();
</script>

<footer class="bg-transparent w-full mt-10 pb-4">
  <div
    class="mx-auto px-4 flex 
 flex-wrap flex-col items-center shadow glass-effect bg-opacity-80 bg-white rounded-lg p-8 gap-8"
  >
    <div class="w-11/12 lg:w-8/12 px-10 text-center">
      <ul class="list-unstyled flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between gap-4">
        <li>
          <a
            class="text-neutral-700 hover:text-neutral-800 font-semibold block pb-2 text-sm"
            href="https://creative-tim.com/terms?ref=ns-footer"
          >
            Terms & Conditions
          </a>
        </li>
        <li>
          <a
            class="text-neutral-700 hover:text-neutral-800 font-semibold block pb-2 text-sm"
            href="https://creative-tim.com/privacy?ref=ns-footer"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            class="text-neutral-700 hover:text-neutral-800 font-semibold block pb-2 text-sm"
            href="https://creative-tim.com/contact-us?ref=ns-footer"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </div>
    <hr class="block border-neutral-700 w-11/12 lg:w-8/12" />
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="text-sm text-neutral-700 font-semibold skiptranslate">
        Copyright © {date} Salt Finance
      </div>
    </div>
  </div>
</footer>
