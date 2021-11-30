<script>
    import { onMount } from "svelte";
    import { slide,fade, fly } from "svelte/transition";

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
</script>

<div transition:fade>
    {data.name}
    {#each manfilms as mf}
        <h6 transition:fade>{mf.name}</h6>
    {/each}
</div>
