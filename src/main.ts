import App from './App.svelte';

import { mount } from 'svelte';

// let basePath = "";
// basePath = process?.env?.BASE_URL ?? "/";
// if (basePath !== undefined && basePath !== null) {
//     basePath.startsWith("/") ? null : (basePath = "/" + basePath);
// }
const app = mount(App, {
  target: document.getElementById('app')!
});

export default app;

// Google translate configs;

// Set the class `skiptranslate` to skip elements form being translated.

// After page is translated, ensure the title is reset to english version.
const targetNode = document.body;
const config = {
  subtree: true,
  characterDataOldValue: true
};
const callback = (
  _: any,
  observer: {
    observe: (
      arg0: HTMLElement,
      arg1: { subtree: boolean; characterDataOldValue: boolean }
    ) => void;
    disconnect: () => void;
  }
) => {
  const googleTranslateElement = document.getElementById(
    'google_translate_element'
  );
  document.title = 'Salt finance investor';

  if (googleTranslateElement != null) {
    function translateOnClick() {
      observer.observe(targetNode, config);
    }

    observer.disconnect();
    googleTranslateElement.removeEventListener('click', () =>
      translateOnClick()
    );
    googleTranslateElement.addEventListener('click', () => translateOnClick());
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

window.onload = () => {
  const elements = Array.from(document.querySelectorAll('svg').values());
  const elem = elements?.filter((e) =>
    e?.classList?.value?.toLowerCase()?.includes('vip')
  );

  elem?.map((e) => {
    if (e.parentElement == null) {
      return;
    }
    e.parentElement.style.visibility = 'hidden';
  });
};
