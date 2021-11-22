<script>
	export let name;
	import Api from "./Components/toapi.svelte";
	import { ExpansionPanel, Checkbox, Icon } from "svelte-mui";

	//https://svelte-mui.vercel.app/
	//Компонент DatePicker - для примера
	import { Datefield } from "svelte-mui";
	let format = "DD.MM.YYYY";
	//let date = "21.01.2019"; // Строка или дата
	let date = new Date().toLocaleDateString(); //  .toDateString(); // Date

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
			//reject("Нет результата");
			//или вызвать ошибку
			reject(new Error("Ошибка. Нет результата."));
		}, 4500);
	});

	//Раскоментируйте это
	// promise.then(
	// 	(result) => {
	// 		// первая функция-обработчик - запустится при вызове resolve
	// 		lateVar = "Разрешенное значение: " + result;
	// 	},
	// 	(error) => {
	// 		// вторая функция - запустится при вызове reject
	// 		lateVar = "Rejected: " + error; // error - аргумент reject
	// 	}
	// );
	function onchage() {}
</script>

<main>
	<h1>Hello {name}!</h1>

	<ExpansionPanel name="Luke Skywalker " on:change={onchage}>
		<div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
			quod culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil
			molestiae molestias tenetur delectus velit! Inventore laborum rerum
			at id?
		</div>
	</ExpansionPanel>

	{#await promise}
		<h1 style="color:darkblue">Подождите немного...</h1>
	{:then data}
		<h2>{data}</h2>
		<h3>{lateVar}</h3>
	{:catch data}
		<h2>{data}</h2>
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
			label="Выберите дату:"
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
