<script>
    import { onMount } from "svelte";
    export let data;
    export let orient = "H";
    export let topSelectFunc;

    onMount(() => {
        topSelectFunc(data[0].items);
    });
</script>

<ul style="display: {orient == 'H' ? 'flex' : 'block'}">
    {#each data as item}
        <li on:click={() => topSelectFunc(item.items)}>{item.name}</li>
    {/each}
</ul>

<style>
    ul {
        padding-left: 20px;
        list-style: none;
    }
    ul li {
        margin-right: 10px;
    }
</style>
