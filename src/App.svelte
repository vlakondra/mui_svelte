<script>
	import Api from "./Components/toapi.svelte";
	import Search from "./Components/search.svelte";
	import Typeahead from "svelte-typeahead";

	import { ExpansionPanel, Checkbox, Icon } from "svelte-mui";

	//https://github.com/metonym/svelte-typeahead
	//http://svgicons.sparkk.fr/
	//https://svelte-mui.vercel.app/
	//https://svelte-recipes.netlify.app/testing/

	const data = [
		"Bare Metal Server",
		"Blockchain Platform",
		"Db2 Warehouse",
		"Db2",
		"Metrics Server",
		"Node.js",
		"Virtual Machine",
		"Virtual Private Server",
	];

	const data2 = [
		{ state: "California" },
		{ state: "North Carolina" },
		{ state: "North Dakota" },
		{ state: "South Carolina" },
		{ state: "South Dakota" },
		{ state: "Michigan" },
		{ state: "Tennessee" },
		{ state: "Nevada" },
		{ state: "New Hampshire" },
		{ state: "New Jersey" },
	];

	const extract = (item) => item.state;
</script>

<main>
	<div>
		<Typeahead data={data2} {extract} let:value let:result let:index>
			<div style="color: red; font-weight: bold;">
				{@html result.string}
				{index}
			</div>
			<svelte:fragment slot="no-results">
				No results found for {value}
			</svelte:fragment>
		</Typeahead>
	</div>

	<div>
		<Search autofocus={true} {data} />
	</div>
	<p>
		<Api />
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
	}
</style>
