<script>
    import { fade, fly } from "svelte/transition";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";
    import PrevNext from "./prev_next.svelte";
    import Man from './man.svelte'

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

    $: res_people = [];

    onMount(async () => {
        //1-й вариант
        try {
            // await getPeople("https://swapi.dev/api/people");

            const resp = await fetch("https://swapi.dev/api/people");
            console.log("Resp", resp);
            jdata = await resp.json();
            next_link = await jdata["next"];
            prev_link = await jdata["previous"];
            console.log(
                "111",
                jdata,
                (next_link = jdata["next"]),
                (prev_link = jdata["previous"])
            );
            console.log("NP", next_link, prev_link);
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

    const GetName = async (link) => {
        let json = await fetch(link).then((obj) => obj.json());
        if (json.hasOwnProperty("name")) {
            return await json.name;
        } else {
            return await json.title;
        }
    };

    const getPeople = async (req) => {
        return await fetch(req)
            .then(async (resp) => {
                let json = await resp.json();
                if (resp.ok) {
                    for (let obj of json.results) {
                        for (let prop in obj) {
                            if (Array.isArray(obj[prop])) {
                                if (obj[prop].length > 0) {
                                    for (let i = 0; i < obj[prop].length; i++) {
                                        let res_name = await GetName(
                                            obj[prop][i]
                                        );
                                        obj[prop][i] = {
                                            link: obj[prop][i],
                                            name: res_name,
                                        };
                                    }
                                }
                            }
                        }
                    }

                    // console.log("!!!-???", json.results[0]);
                    res_people.push(...json.results);
                    res_people = res_people;
                    if (json.next) {
                        return await getPeople(json.next);
                    }
                }
            })
            .then(() => 123);
    };

    async function get_People() {
        await getPeople("https://swapi.dev/api/people").then((x) => {
            console.log("RP??", res_people);
        });
        // console.log("rr", rr, res_people);
    }
</script>

<div>
    <button on:click={get_People}>All People</button>
</div>
<div
    style="display:flex; justify-content:center;item-align:stretch;width:90%;margin:0 auto;min-height:500px"
>
    <div style="background:cornsilk;flex-grow:0.5; ">
        {#if !jdata}
            <!-- ///!jdata -->
            <p>Ждите!!!</p>
        {:else}
            <div>
                <PrevNext getPage={getPeoplePage} {prev_link} {next_link} />
            </div>

            <div>Страница {curr_page}</div>
            {#each jdata.results as m (m.name)}
                {#key m.name}
                   <Man data={m} />
                    <!-- <h6 transition:slide>
                        <span
                            on:click={() => getPlanet(m.homeworld)}
                            style="cursor:pointer">{m.name} -- Планета</span
                        >
                    </h6> -->
                {/key}
            {/each}

            <!-- <PrevNext getPage={getPeoplePage} {prev_link} {next_link} /> -->
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
