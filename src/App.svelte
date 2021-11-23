<script>
	export let name;
	import Api from "./Components/toapi.svelte";
	import { ExpansionPanel, Checkbox, Icon } from "svelte-mui";

	//http://svgicons.sparkk.fr/

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
	<div>
		<Icon color="Red">
			<svg class="svg-icon" viewBox="0 0 20 20">
				<path
					d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"
				/>
			</svg>
		</Icon>
	</div>

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
