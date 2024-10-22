import App from "./App.svelte";

import { mount } from 'svelte';

let basePath ='';
basePath = process?.env?.BASE_URL ?? '/';
if (basePath !== undefined && basePath !== null){
	basePath.startsWith('/') ? null : basePath = '/'+basePath;
}
const app = mount(App, {
	target: document.querySelector('#app'),	
	props: {url: basePath}
});

 
export default app;
