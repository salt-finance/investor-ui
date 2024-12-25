<script lang="ts">
    // core components
    import {replace} from "svelte-spa-router";

    const github =
        "https://salt-finance.github.io/investor-ui/assets/img/github.svg";
    const google =
        "https://salt-finance.github.io/investor-ui/assets/img/google.svg";
    export const location = "";

    function signIn() {
        replace("/dashboard");
    }
</script>

<div class="text-left flex content-center items-center w-full flex-col">
    <span class=" my-6 text-2xl lg:text-4xl lg:font-extralight w-1/3 motion-preset-blur-down-lg motion-duration-500">
        Login
      </span>

    <div class="relative flex flex-wrap gap-y-4 glass-effect w-1/3 px-8 py-6 font-normal min-h-500 motion-preset-blur-up-lg motion-duration-500">
        <form class="flex flex-col justify-between w-full">
            <div class="relative w-full mb-3">
                <label
                        class="block text-sm mb-2"
                        for="grid-email"
                >
                    Email
                </label>
                <input
                        class="border-0 px-3 py-3 w-full primary-input"
                        id="grid-email"
                        value="test@example.com"
                        placeholder="Email"
                        type="email"
                />
            </div>

            <div class="relative w-full mb-3">
                <label
                        class="block text-sm mb-2"
                        for="grid-password"
                >
                    Password
                </label>
                <input
                        class="border-0 px-3 py-3 w-full primary-input"
                        id="grid-password"
                        value="1234567"
                        placeholder="Password"
                        type="password"
                />
            </div>

            <div class="mt-6">
                <button
                        class="primary-button w-full"
                        onclick={signIn}
                        type="button"
                >
                    Log In
                </button>
            </div>
        </form>
        <div class="lg:w-1/3 flex flex-col w-full">

        </div>

    </div>
</div>
