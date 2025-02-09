<div
  class="flex flex-col body-colors bg-gradient-to-bl from-0% to-60% dark:to-40% p-5 lg:p-8 content-center items-center w-screen flex-wrap h-screen overflow-hidden justify-center"
>
  <div
    class="xl:max-w-screen-2xl xl:max-h-[1400px] w-full h-full aspect-square"
  >
    <div
      class="h-full w-full md:justify-stretch justify-between gap-4 relative"
    >
      <div
        class="flex items-center z-10 absolute mx-5 lg:mx-10 mt-10 top-0 left-0 right-0 justify-between"
      >
        <div
          class="text-2xl tracking-wide font-extralight leading-relaxed inline-block whitespace-nowrap uppercase skiptranslate hover:no-underline"
        >
          <div class="logo"></div>
        </div>
        <DarkModeToggle />
      </div>
      <div class="flex flex-col justify-end w-full gap-4 h-full">
        <div
          class="text-left flex w-full flex-col glass-effect h-full max-h-full overflow-auto lg:overflow-hidden"
        >
          <div
            class="flex flex-wrap h-full lg:gap-y-4 font-normal transition-all duration-1000"
          >
            {#if loading || loadingError}
              <div
                class="flex flex-col justify-center items-center gap-4 p-5 w-full h-full"
              >
                {#if loadingError}
                  Unable to verify your email address, {loadingError}
                  <button
                    class="primary-button"
                    onclick={() => continueRegistration()}
                    >Retry
                  </button>
                {:else}
                  Processing
                {/if}
              </div>
            {:else}
              <div
                class="{isLastPage()
                  ? 'lg:w-1/2'
                  : 'lg:w-1/2'} sticky lg:static top-0 z-10 lg:z-0 pt-28 p-5 flex flex-col w-full lg:h-full max-h-full rounded-none card shadow-none border-0 bg-opacity-100 lg:bg-opacity-30 gap-4 justify-end lg:justify-center lg:p-14"
              >
                <h1
                  class="page-title lg:text-4xl font-semibold font-serif dark-light-text"
                >
                  {pages[currentPageIndex].title}
                </h1>
                <h4 class="page-subtitle text-sm lg:text-xl body-text lg:w-3/4">
                  {pages[currentPageIndex].subtitle}
                </h4>
              </div>

              <div
                class="flex flex-col justify-between p-5 pb-0 lg:p-14 w-full lg:w-1/2 max-h-full lg:h-full"
              >
                <form class="flex-2 h-full content-center">
                  <div class="gap-4 flex flex-col justify-center lg:h-full">
                    {#each pages[currentPageIndex].questions as question, index}
                      <div>
                        <BaseInput
                          label={question.title}
                          large={true}
                          id={index.toString()}
                          min={question.min}
                          max={question.max}
                          bind:value={question.value}
                          type={question.type}
                          required={true}
                          appendIcon={question.prependIcon}
                          onchange={() => changeValue(question)}
                          placeholder={question.placeholder ?? question.title}
                        />
                      </div>
                    {/each}

                    {#if isLastPage()}
                      <div class="flex flex-wrap gap-y-4">
                        {#each pages as page, index}
                          {#if index < pages.length - 1}
                            <div class="w-full lg:w-1/2">
                              {#each page.questions as question}
                                <div class="mb-2">
                                  <span class="block text-sm mb-2 font-bold">
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
                            value={attested}
                            onchange={(e) => {
                              attested = e?.currentTarget.checked;
                            }}
                          />
                          <span class="ml-2 text-sm">
                            I have reviewed and confirm that the information I
                            provided is correct.
                          </span>
                        </label>
                      </div>
                      <div>
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            class="form-checkbox"
                            id="customCheckLogin"
                            type="checkbox"
                            value={agreed}
                            onchange={(e) =>
                              (agreed = e?.currentTarget?.checked)}
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

                    {#if submitError}
                      <span class="alert alert-error my-4">{submitError}</span>
                    {/if}
                  </div>
                </form>

                <!--      Show Error -->
                <div
                  class="py-6 lg:pb-0 lg:fixed lg:bottom-20 lg:right-14 lg:left-14"
                >
                  <div
                    class="text-center flex gap-2 self-end justify-between flex-wrap-reverse lg:flex-nowrap"
                  >
                    <button
                      class="secondary-button w-full md:w-auto"
                      tabindex={1}
                      disabled={processing}
                      onclick={() => changePage(false)}
                      type="button"
                    >
                      Back
                    </button>
                    <button
                      class="primary-button w-full md:w-auto"
                      tabIndex={0}
                      class:cursor-wait={processing}
                      class:cursor-not-allowed={!valid()}
                      disabled={processing || !valid()}
                      onclick={() => changePage(true)}
                      type="button"
                    >
                      {#if isLastPage()}
                        {#if processing}
                          Creating your account...
                        {:else}
                          Create your account
                        {/if}
                      {:else if currentPageIndex === 0}
                        Continue
                      {:else}
                        Next
                      {/if}
                    </button>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import { replace, querystring } from 'svelte-spa-router';
  import { type IUser } from 'models/user';
  import { createUser, continueRegister } from '@/api/api_user';
  import type { IApiResponse } from 'utils/http_client';
  import {
    setupQuestionPages,
    type IQuestion
  } from 'models/modelSetupQuestionPage';
  import BaseInput from 'components/Inputs/BaseInput.svelte';
  import DarkModeToggle from 'components/DarkModeToggle.svelte';
  import { onDestroy } from 'svelte';

  let data: IUser | undefined = $state();
  let token: string | undefined = $state();

  let loading: boolean = $state(true);
  let loadingError: string | undefined = $state();

  const pages = $state(setupQuestionPages());

  let currentPageIndex = $state(0);
  let agreed = $state(false);
  let attested = $state(false);

  let processing = $state(false);
  let submitError: string | undefined = $state();

  function valid() {
    return !isLastPage() || (agreed && attested && !submitError);
  }

  function changeValue(question: IQuestion<IUser>) {
    if (question.changeHandler) {
      question.changeHandler(data!, question.value);
    }
  }

  function isLastPage() {
    return currentPageIndex === pages.length - 1;
  }

  function changePage(increase: boolean = true) {
    submitError = undefined;
    if (increase) {
      if (currentPageIndex + 1 < pages.length) {
        currentPageIndex++;
      } else if (isLastPage()) {
        submit();
      }
    } else if (!increase) {
      if (currentPageIndex > 0) {
        currentPageIndex--;
      } else {
        replace('/auth/login');
      }
    }
  }

  async function submit() {
    processing = true;
    submitError = undefined;
    await createUser(data!)
      .then((response) => {
        if (response.response['redirectUrl'] !== undefined) {
          replace(response.response['redirectUrl']);
        }
      })
      .catch((error: IApiResponse<any>) => {
        submitError = error.error?.message;
      });
    processing = false;
  }

  function continueRegistration() {
    loading = true;
    loadingError = undefined;
    if (!token) {
      loading = false;
      replace('/');
      return;
    }
    continueRegister(token)
      .then((user) => {
        data = user.response;
      })
      .catch((e: IApiResponse<IUser>) => {
        loadingError = e.error?.message ?? 'Something went wrong';
      })
      .finally(() => {
        loading = false;
      });
  }

  const unsubscribe = querystring.subscribe((value) => {
    if (value !== undefined && value !== '') {
      token = value.split('get-started=')[1];

      continueRegistration();
    }
  });
  onDestroy(unsubscribe);
</script>
