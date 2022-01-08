<script>
	import { onMount } from "svelte";
	//import Api from "./Components/toapi.svelte";
	// import Search from "./Components/search.svelte";
	//import Typeahead from "svelte-typeahead";
	import Sections from "./Components/section_select.svelte";
	import Content from "./Components/section_content.svelte";
	import Search from "./Components/section_search.svelte";
	import { section_url } from "./Components/store.js";

	import { ExpansionPanel, Checkbox, Icon } from "svelte-mui";

	import "bulma/css/bulma.css";

	//https://github.com/metonym/svelte-typeahead
	//http://svgicons.sparkk.fr/
	//https://svelte-mui.vercel.app/
	//https://svelte-recipes.netlify.app/testing/

	//https://gridbyexample.com/
	//https://tproger.ru/articles/7-osnovnyh-ponjatij-css-grid-layout-s-primerami-kotorye-pomogut-nachat-rabotu-s-gridami/
	//https://grid.layoutit.com/

	// let section_link;

	// section_url.subscribe((value) => {
	// 	section_link = value;
	// });

	let selected = "https://swapi.dev/api/vehicles/";
	section_url.update((n) => selected);
</script>

<main>
	<div class="container">
		<div class="controls">
			<div>
				<Sections def={selected} />
			</div>

			<Search />
			<!-- <div>
				<input type="search" />
			</div> -->
		</div>

		<article id="sections">
			<Content />
		</article>
	</div>

	<!-- <Api /> -->
</main>

<style>
	.container {
		display: grid;
		grid-template-areas:
			"gap1 head gap2"
			"off1 content off"
			"footer footer footer";
		grid-template-rows: 80px 1fr 100px;
		grid-template-columns: 3% 1fr 3%;
		grid-gap: 5px;
		height: 600px;
		overflow: auto;
	}

	.controls {
		grid-area: head;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20px;
		align-items: center;
		background-color: coral;
	}

	#sections {
		grid-area: content;
		/* display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap; */
	}

	main {
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
		border: 1px solid gray;
	}
</style>
