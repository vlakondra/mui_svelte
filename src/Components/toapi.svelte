<script>
    import { fade, fly } from "svelte/transition";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";
    import PrevNext from "./prev_next.svelte";

    async function getPeoplePage(lnk) {
        console.log("PP", lnk);
        try {
            loadPage = true;
            const resp = await fetch(lnk);
            jdata = await resp.json();

            next_link = await jdata["next"];
            prev_link = await jdata["previous"];
            curr_page = await lnk.split("=")[1];
            loadPage = await false;
        } catch (e) {
            console.log("Ошибка", e);
        }
    }
    let loadPage = false;
    let jdata;
    let next_link;
    let prev_link;
    let curr_page = 1;

    let res_people = [];

    onMount(async () => {
        //1-й вариант
        try {
            await getPeople("https://swapi.dev/api/people");
            // const resp = await fetch("https://swapi.dev/api/people");
            // console.log("Resp", resp);
            // jdata = await resp.json();
            // next_link = await jdata["next"];
            // prev_link = await jdata["previous"];
            // console.log(
            //     "111",
            //     jdata,
            //     (next_link = jdata["next"]),
            //     (prev_link = jdata["previous"])
            // );
            // console.log("NP", next_link, prev_link);
        } catch (e) {
            console.log("e", e);
        }

        //2-й вариант
        // jdata = await fetch("https://swapi.dev/api/people")
        //.then((x) => x.json()
        // );
    });

    let planet;
    function getPlanet(link) {
        // console.log("LINK", link);
        const handleClick = async () => {
            planet = await fetch(link).then((x) => x.json());
        };
        handleClick();
    }

    const getPeople = async (req) => {
        return await fetch(req)
            .then(async (resp) => {
                let json = await resp.json();
                if (resp.ok) {
                    console.log("json?", json.next);
                    console.log("?", json.results);
                    res_people.push(...json.results);
                    if (json.next) {
                        return await getPeople(json.next);
                    }
                }
            })
            .then(() => 123);
    };

    async function get_People() {
        let rr = await getPeople("https://swapi.dev/api/people");
        console.log("rr", rr, res_people);
    }
</script>

<div
    style="display:flex; justify-content:center;item-align:stretch;width:450px;margin:0 auto;min-height:500px"
>
    <div>
        <button on:click={get_People}>Recursion</button>
    </div>

    <div style="background:cornsilk;flex-grow:0.5; ">
        {#if !jdata}
            <p>Ждите!!!</p>
        {:else}
            <div>
                <PrevNext getPage={getPeoplePage} {prev_link} {next_link} />
            </div>

            <div>Страница {curr_page}</div>
            {#each jdata.results as m (m.name)}
                {#key m.name}
                    <h6 transition:slide>
                        <!-- transition:slide in:fly={{ y: 100 }} -->
                        <span
                            on:click={() => getPlanet(m.homeworld)}
                            style="cursor:pointer">{m.name} -- Планета</span
                        >
                    </h6>
                {/key}
            {/each}

            <PrevNext getPage={getPeoplePage} {prev_link} {next_link} />
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
