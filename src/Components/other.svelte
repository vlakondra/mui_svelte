<script>
    export let data;
    export let dialog;
    import { Button } from "svelma";
    import { Menu, Menuitem, Icon } from "svelte-mui";
    import { finded } from "./store.js";
    // import "bulma/css/bulma.css";

    const onMenuItemClick = (link) => {
        dialog(link);
    };

    let _finded;
    finded.subscribe((fnd) => {
        console.log("fnd", fnd);
        _finded = fnd;
    });
</script>

<div class="box content is-small" style="background-color:azure">
    {#each Object.entries({ ...data }) as [k, v]}
        {#if !Array.isArray(v)}
            <div class="columns is-desctop">
                <div class="column minify is-half ">
                    <strong>{k}</strong>
                </div>
                <div class="column minify is-half">{v}</div>
            </div>
        {/if}
    {/each}
    <hr />
    {#each Object.entries({ ...data }) as [k, v]}
        {#if Array.isArray(v)}
            <Menu origin="top left">
                <div slot="activator">
                    <button class="button is-info" style="margin-right:5px">
                        <span>{k}</span>
                    </button>
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

<style>
    :global(.minify) {
        padding: 3px !important;
        margin-bottom: 3px !important;
        word-break: break-all;
    }
</style>
