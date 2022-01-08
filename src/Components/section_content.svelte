<script>
    import Films from "./films.svelte";
    import Other from "./other.svelte";
    import { Dialog, Icon } from "svelte-mui";
    import { section_url, is_run, section_data } from "./store.js";

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
    var reqCount = 0;

    let item_portion = 3;

    const GetName = async (link) => {
        let json = await fetch(link).then((obj) => obj.json());
        reqCount += 1;
        if (json.hasOwnProperty("name")) {
            return await json.name;
        } else {
            return await json.title;
        }
    };
    const getSection = async (req) => {
        is_run.set(true);
        reqCount = 0;

        return await fetch(req)
            .then(async (resp) => {
                reqCount += 1;
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
                    section_data.set(curr_data);

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
        section_data.set(curr_data);

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
        console.log("D", d, typeof d);
        if (d && !Number.isInteger(d)) {
            if (d.includes("http")) {
                return `<a href=${d}>${d}</a>`;
            } else {
                return `<span>${d}</span`;
            }
        }
    };
</script>

<Dialog width="500" bind:visible>
    <div slot="title">
        {dial_data.hasOwnProperty("name") ? dial_data.name : dial_data.title}
    </div>
    <div class="box content is-small">
        <div style="display:flex; flex-direction:column">
            {#each Object.entries({ ...dial_data }) as [k, v]}
                {#if !Array.isArray(v)}
                    <div class="columns">
                        <div class="column is-half minify">
                            <strong>{k}</strong>
                        </div>
                        <div class="column is-half minify">{@html ttt(v)}</div>
                    </div>

                    <!-- <div style="display:flex">
                    <div style="width:130px"><strong>{k}</strong></div>
                    <div style="">{@html ttt(v)}</div>
                </div> -->
                {/if}
            {/each}
        </div>
    </div>
</Dialog>

{#if curr_data.length}
    {#each { length: Math.ceil(curr_data.length / item_portion) } as x, j}
        <div class="columns is-desctop">
            {#each curr_data.slice(j * item_portion, j * item_portion + item_portion) as item, i}
                <div class="column is-one-third">
                    <svelte:component
                        this={curr_comp}
                        data={item}
                        dialog={openDialog}
                    />
                </div>
            {/each}
        </div>
    {/each}

    <!-- {#each curr_data as item, i}
        <svelte:component this={curr_comp} data={item} dialog={openDialog} />
    {/each} -->
{:else}
    <h3>Wait{reqCount}</h3>
{/if}
