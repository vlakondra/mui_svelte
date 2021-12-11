<script>
    import { section_url } from "./store.js";
    let res_people = [];

    const GetName = async (link) => {
        let json = await fetch(link).then((obj) => obj.json());
        if (json.hasOwnProperty("name")) {
            return await json.name;
        } else {
            return await json.title;
        }
    };

    const getSection = async (req) => {
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

                    res_people.push(...json.results);
                    res_people = res_people;
                    console.log("!!!-???", res_people);
                    if (json.next) {
                        return await getSection(json.next);
                    }
                }
            })
            .then(() => res_people);
    };

    section_url.subscribe(async (url) => {
        res_people.length = 0;
        if (url) {
            await getSection(url);
        }
    });
</script>

{#if res_people.length}
    {#each res_people as item, i}
        <div style="width:300px;height:200px;background:aqua;margin:1px">
            {#each Object.entries(item) as [k, v]}
                <div>
                    <div style="display:inline-block">{k}</div>
                    <div style="display:inline-block">{v}</div>
                </div>
            {/each}
        </div>
    {/each}
{:else}
    <h3>Wait</h3>
{/if}
