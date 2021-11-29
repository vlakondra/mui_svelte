<script>
    //https://github.com/metonym/svelte-typeahead
    //jsfiddle.net/vkondra/u9d01jtm/1/
    import { onMount } from "svelte";

    export let autofocus = false;
    export let data = [];

    let input = undefined;
    let value = "";

    onMount(() => {
        if (autofocus) input.focus();
        input.value = "Node.js";
    });
</script>

<input
    type="search"
    bind:this={input}
    on:change={(e) => {
        console.log("?!", e.target.value);
    }}
    bind={value}
    list="dl"
/>

<datalist id="dl">
    {#each data as item}
        <option value={item} />
    {/each}
</datalist>

<style>
</style>
