import App from "./App.svelte";

import { mount } from 'svelte';

const app = mount(App, {
	target: document.querySelector('#app'),	
	props: {basepath: '/investor-ui'}
});

export default app;
