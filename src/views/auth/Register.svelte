<script lang="ts">
    import {replace} from "svelte-spa-router";


    const pages = [
        {
            title: "Get started", subtitle: "Confirm your email address to continue",
            questions: [
                {
                    title: "Your email address",
                    value: "email@example.com"

                }, {
                    title: "Confirm your email address",
                    value: "email@example.com"
                }
            ]
        },
        {
            title: "About you", subtitle: "Tell us about you",
            questions: [
                {
                    title: "First name"

                }, {
                    title: "Last name"

                }, {
                    title: "Date of birth",
                    placeholder: "You need to be at least 18 years old"
                },
                {
                    title: "Maritial status"
                },
                {
                    title: "Tax Id number (TIN)"
                }

            ]
        },
        {
            title: "Contact info",
            subtitle: "We’ll send all your investment documents and disclosures to this address.",
            questions: [
                {
                    title: "Phone number"

                }, {
                    title: "Country",
                    placeholder: "Ethiopia"

                }, {
                    title: "City",
                    placeholder: "Addis Ababa"
                },
                {
                    title: "State / Zone",
                    placeholder: "Addis Ababa"
                },
                {
                    title: "Post code"
                }

            ]
        },
        {
            title: "Financial information",
            subtitle: "Tell us about your financial situation and experience with investing.",
            questions: [
                {
                    title: "Annual income"

                }, {
                    title: "Total net worth"

                },
                {
                    title: "Liquid net worth"

                },
                {
                    title: "Investment experience"
                }
            ]
        },
        {
            title: "Affiliations", subtitle: "Tell us about your industry affiliations.",
            questions: [
                {
                    title: "Do you work for, or are you related to someone who works for, a financial services company, a stock exchange, a registered securities broker-dealer?",
                    placeholder: "Yes / No"

                }, {
                    title: "Are you, or someone who will benefit from this account a director or major owner (10% or more shares) of a publicly traded company?",
                    placeholder: "Yes / No"

                }
            ]
        },
        {
            title: "Review and confirm", subtitle: "Confirm your personal information",
            questions: []
        }
    ];


    let currentPage = $state(0);
    let confirmed = $state(false);


    function isLastPage() {
        return currentPage === pages.length - 1;
    }

    function changePage(increase: boolean = true) {
        if (increase) {
            if (currentPage + 1 < pages.length) {
                currentPage++;
            }
            else if (isLastPage()) {
                replace("/dashboard");
            }
        }
        else if (!increase) {
            if (currentPage > 0) {
                currentPage--;
            }
            else {
                replace("/");
            }
        }


    }

    function changeValue(pageIndex: number, questionIndex: number, event: any) {
        pages[pageIndex].questions[questionIndex].value = event.target.value;
    }


</script>

<div
        class="text-left flex content-center justify-center w-full flex-col"
>
        <span class=" mt-6 mb-2 text-2xl lg:text-4xl lg:font-extralight">
        Create an investment account
      </span>
    <span class="lg:text-xl mb-6">
        Please answer a few questions to create your account
      </span>
    <div class="relative flex flex-wrap gap-y-4 glass-effect px-8 py-6 font-normal min-h-500">


        <div class="{isLastPage() ? 'lg:w-1/3' : 'lg:w-1/2'} flex flex-col w-full">
            <h1 class="text-3xl">{pages[currentPage].title}</h1>
            <h4 class="text-lg">{pages[currentPage].subtitle}</h4>
        </div>
        <form class="{isLastPage() ? 'lg:w-2/3' : 'lg:w-1/2'} flex flex-col justify-between w-full">
            <div class="relative gap-4 flex flex-col">
                {#each pages[currentPage].questions as question, index }
                    <div>
                        <label
                                class="block text-sm mb-2"
                                for="grid-name"
                        >
                            {question.title}
                        </label>
                        <input
                                class="border-0 px-3 py-3 w-full primary-input"
                                id="grid-name"
                                value={question.value ?? ''}
                                onchange="{(event) => changeValue(currentPage, index, event)}"
                                placeholder={question.placeholder ?? question.title}
                                type="text"
                        />
                    </div>
                {/each}

                {#if isLastPage()}
                    <div class="flex flex-wrap gap-y-4">
                        {#each pages as page, index }

                            {#if (index > 0) && (index < pages.length - 1)}
                                <div class="w-full lg:w-1/2">
                                    <h3 class="text-2xl mb-2">{page.title}</h3>
                                    {#each page.questions as question, index }
                                        <div class="mb-2">
                                            <span
                                                    class="block text-sm mb-2 font-bold"
                                            >
                                                {question.title}
                                            </span>
                                            {question.value ?? '--'}
                                        </div>
                                    {/each}
                                </div>
                            {/if}

                        {/each}
                    </div>


                    <div>
                        <label class="inline-flex items-center cursor-pointer">
                            <input
                                    class="form-checkbox"
                                    id="customCheckLogin"
                                    type="checkbox"
                            />
                            <span class="ml-2 text-sm">
                            I have reviewed and confirm that the information I provided is correct.
                            </span>
                        </label>
                    </div>
                    <div>
                        <label class="inline-flex items-center cursor-pointer">
                            <input
                                    class="form-checkbox"
                                    id="customCheckLogin"
                                    type="checkbox"
                            />
                            <span class="ml-2 text-sm">
                            I have read and agree with the
                                    <a
                                            class="text-blue-500"
                                            href="#pablo"
                                            onclick={(e) => e.preventDefault()}
                                    >
                                    Terms and Conditions
                                    </a>
                            </span>
                        </label>
                    </div>
                {/if}
            </div>
            <div class="text-center mt-6 flex gap-2 justify-between flex-wrap-reverse">
                <button
                        class="secondary-button w-full md:w-auto"
                        onclick={() => changePage(false)}
                        type="button"
                >
                    Back
                </button>
                <button
                        class="primary-button w-full md:w-auto"
                        disabled="{confirmed}"
                        onclick={() => changePage(true)}
                        type="button"
                >
                    {#if isLastPage()}
                        Create your account

                    {:else }
                        Next
                    {/if}
                </button>
            </div>
        </form>


    </div>
</div>
