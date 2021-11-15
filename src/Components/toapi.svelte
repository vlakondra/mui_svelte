<script>
    import { onMount } from "svelte";

    let jdata;
    onMount(async () => {
        //1-й вариант
        const resp = await fetch("https://swapi.dev/api/people");
        jdata = await resp.json();

        //2-й вариант
        // jdata = await fetch("https://swapi.dev/api/people")
        //.then((x) => x.json()
        // );
    });

    let planet;
    function getPlanet(link) {
        console.log("LINK", link);
        const handleClick = async () => {
            planet = await fetch(link).then((x) => x.json());
        };
        handleClick();
    }
</script>

<div
    style="display:flex; justify-content:center;item-align:stretch;width:450px;margin:0 auto;"
>
    <div style="background:cornsilk;flex-grow:0.5">
        {#if !jdata}
            <p>Ждите!!!</p>
        {:else}
            {#each jdata.results as m}
                {console.log("jdata", jdata)}
                <h6>
                    <!-- {console.log(m)} -->
                    <span
                        on:click={() => getPlanet(m.homeworld)}
                        style="cursor:pointer">{m.name} -- Планета</span
                    >
                </h6>
            {/each}
        {/if}
    </div>
    <div style="background:coral;flex-grow:1">
        {#await planet}
            <h5>Wait!!!</h5>
        {:then data}
            {#if data}
                <h5>{data.name}</h5>
            {/if}

            {console.log(data)}
        {/await}
    </div>
</div>
