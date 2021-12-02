<script>
    import { onMount } from "svelte";
    import { ExpansionPanel } from "svelte-mui";
    import { slide, fade, fly } from "svelte/transition";

    export let data;
    let manfilms = [];

    onMount(async () => {
        for (let film_link of data.films) {
            await GetName(film_link).then((x) => {
                manfilms.push({ link: film_link, name: x });
            });
        }
        manfilms = manfilms;
    });

    const GetName = async (link) => {
        let json = await fetch(link).then((obj) => obj.json());
        if (json.hasOwnProperty("name")) {
            return await json.name;
        } else {
            return await json.title;
        }
    };
    const onchage = ({ detail }) => {
        console.log(detail);
    };
</script>

<div transition:fade>
    <ExpansionPanel name={data.name} on:change={onchage}>
        Films
        {#each manfilms as mf}
            <h6 transition:fade>{mf.name}</h6>
        {/each}
    </ExpansionPanel>
</div>
