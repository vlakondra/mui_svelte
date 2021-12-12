<script>
    import Films from "./films.svelte";
    import Other from "./other.svelte";
    import { Dialog, Icon } from "svelte-mui";
    import { section_url, is_run } from "./store.js";
    // let res_people = [];

    let datas = {
        films: { data: [], comp: Films },
        people: { data: [], comp: Other },
        planets: { data: [], comp: Other },
        species: { data: [], comp: Other },
        starships: { data: [], comp: Other },
        vehicles: { data: [], comp: Other },
    };
    let curr_data;
    let curr_comp;

    const GetName = async (link) => {
        let json = await fetch(link).then((obj) => obj.json());
        if (json.hasOwnProperty("name")) {
            return await json.name;
        } else {
            return await json.title;
        }
    };
    //{ mode: "no-cors" }
    const getSection = async (req) => {
        is_run.set(true);
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

                    // res_people.push(...json.results);
                    curr_data.push(...json.results);

                    // res_people = res_people;
                    console.log("!!!-???", curr_data, datas);
                    curr_data = curr_data;

                    if (json.next) {
                        return await getSection(json.next);
                    }
                }
                //  else {
                //     throw new Error("We have a problem");
                // }
            })
            .then(() => true);
        // .catch((err) => {
        //     console.log(err);
        // });
    };

    section_url.subscribe(async (url) => {
        // res_people.length = 0;
        let section = url.split("/")[4];
        curr_data = datas[section]["data"];
        curr_comp = datas[section]["comp"];

        if (url && curr_data.length == 0) {
            await getSection(url);
            // .then((r) => {
            //     console.log("END?", r);
            // });
        }
    });

    let visible = false;
    let dial_data;

    const openDialog = async (url) => {
        await fetch(url)
            .then((obj) => {
                let json = obj.json();
                return json;
            })
            .then((res) => {
                dial_data = res;
                visible = true;
                console.log("RES ", res);
            });

        // await getLink(url).then((res) => {
        //     console.log("RES", res);
        // });
    };
</script>

<Dialog width="450" bind:visible>
    <div slot="title">{dial_data.name}</div>
    <div style="display:flex;justify-content:center; flex-direction:column">
        {#each Object.entries({ ...dial_data }) as [k, v]}
            {#if !Array.isArray(v)}
                <div style="display:flex;justify-content:flex-start">
                    <div style="margin-right:10px"><strong>{k}</strong></div>
                    <div style="margin-left:10px">{v}</div>
                </div>
            {/if}
        {/each}
    </div>
</Dialog>

<!-- {#if res_people.length} -->
{#if curr_data.length}
    <!-- {#each res_people as item, i} -->
    {#each curr_data as item, i}
        <svelte:component this={curr_comp} data={item} dialog={openDialog} />

        <!-- <div style="width:300px;height:200px;background:aqua;margin:1px">
            {#each Object.entries(item) as [k, v]}
                <div>
                    <div style="display:inline-block">{k}</div>
                    <div style="display:inline-block">{v}</div>
                </div>
            {/each}
        </div> -->
    {/each}
{:else}
    <h3>Wait</h3>
{/if}
