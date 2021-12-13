<script>
    import Films from "./films.svelte";
    import Other from "./other.svelte";
    import { Dialog, Icon } from "svelte-mui";
    import { section_url, is_run } from "./store.js";

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

                    curr_data.push(...json.results);
                    //console.log("!!!-???", curr_data, datas);
                    curr_data = curr_data;

                    if (json.next) {
                        return await getSection(json.next);
                    }
                }
            })
            .then(() => true);
    };

    section_url.subscribe(async (url) => {
        let section = url.split("/")[4];
        curr_data = datas[section]["data"];
        curr_comp = datas[section]["comp"];

        if (url && curr_data.length == 0) {
            await getSection(url).then((r) => {
                console.log("END?", r);
                is_run.set(false);
            });
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
            });
    };

    const ttt = (d) => {
        console.log(typeof d);
        if (d) {
            if (d.includes("http")) {
                return `<a href=${d}>${d}</a>`;
            } else {
                return `<span>${d}</span`;
            }
        }
    };
</script>

<Dialog width="450" bind:visible>
    <div slot="title">{dial_data.name}</div>
    <div style="display:flex; flex-direction:column">
        {#each Object.entries({ ...dial_data }) as [k, v]}
            {#if !Array.isArray(v)}
                <div style="display:flex">
                    <div style="width:130px"><strong>{k}</strong></div>
                    <div style="">{@html ttt(v)}</div>
                </div>
            {/if}
        {/each}
    </div>
</Dialog>

{#if curr_data.length}
    {#each curr_data as item, i}
        <svelte:component this={curr_comp} data={item} dialog={openDialog} />
    {/each}
{:else}
    <h3>Wait</h3>
{/if}
