<script>
	export let name;
	import Api from "./Components/toapi.svelte";

	//https://svelte-mui.vercel.app/
	//Компонент DatePicker - для примера
	import { Datefield } from "svelte-mui";
	let format = "D.MM.YYYY";
	//let date = "21.01.2019"; // String or
	let date = new Date().toDateString(); // Date

	const onchange = ({ detail }) => {
		console.log("onchange", detail);
	};
	//Компонент DatePicker - end

	//Образец Промиса
	let lateVar;
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			// переведёт промис в состояние fulfilled с результатом "result"
			resolve("Результат");
		}, 5000);
		setTimeout(() => {
			// переведёт промис в состояние fulfilled с результатом "result"
			reject("Не Результат");
		}, 5500);
	});

	promise.then(
		(result) => {
			// первая функция-обработчик - запустится при вызове resolve
			lateVar = "Разрешенное значение: " + result;
		},
		(error) => {
			// вторая функция - запустится при вызове reject
			lateVar = "Rejected: " + error; // error - аргумент reject
		}
	);
</script>

<main>
	<h1>Hello {name}!</h1>

	{#await promise}
		<h1 style="color:darkblue">Подождите немного...</h1>
	{:then data}
		<h2>{data}</h2>
		<h3>{lateVar}</h3>
	{:catch}
		<h3>{lateVar}</h3>
	{/await}

	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>
	<p>
		<Api />
	</p>

	<p>
		<Datefield
			value={date}
			label="A Special Day"
			locale="ru"
			{format}
			message={format}
			on:date-change={onchange}
		/>
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
