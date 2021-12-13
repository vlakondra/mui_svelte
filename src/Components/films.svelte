<script>
    export let data;
    export let dialog;
    import { Menu, Menuitem, Button, Icon } from "svelte-mui";

    let fields = ["title", "opening_crawl", "producer", "release_date"];

    const onMenuItemClick = (link) => {
        dialog(link);
    };
    let _finded = "A New Hope";
</script>

<div
    style="width:45%;min-height:220px;font:menu;padding:1em;background:#99ffd5;margin:3px;border:1px solid gray"
>
    {#each Object.entries({ ...data }) as [k, v]}
        {#if !Array.isArray(v) & fields.includes(k)}
            <div style="display:flex">
                <div style="width:90px; font-weight:600">
                    {k}:
                </div>
                <div
                    class={v === _finded ? "finded" : ""}
                    style="width:390px;max-height:360px;margin-left:10px"
                >
                    {v}
                </div>
            </div>
        {/if}
    {/each}
    <hr />
    <div style="display:flex;justify-content:center; margin-top:10px">
        {#each Object.entries({ ...data }) as [k, v]}
            {#if Array.isArray(v)}
                <Menu origin="top left" style="background:beige">
                    <div slot="activator">
                        <Button
                            color="brown"
                            ripple={false}
                            style="padding: 0 3px;margin:2px;color:crimson; font-size:0.75em"
                        >
                            <span>{k}</span>
                        </Button>
                    </div>

                    {#each v as item}
                        <Menuitem on:click={() => onMenuItemClick(item.link)}
                            >{item.name}</Menuitem
                        >
                    {/each}
                </Menu>
            {/if}
        {/each}
    </div>
</div>

<style>
    .finded {
        background-color: red;
        color: rgb(244, 244, 250);
        font-weight: 900;
        letter-spacing: 3px;
    }
</style>
