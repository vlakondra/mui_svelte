<script>
    import { section_data, finded, is_run } from "./store.js";

    let input;
    let search_data;

    section_data.subscribe((data) => {
        console.log("section_data?? ", data);
        console.log("input ", input);
        search_data = data;
        if(input){
          input.focus()
          input.value=null
        }
    });

    const onChange =(e)=>{
        console.log(e)
        console.log(input.value)
        finded.set(input.value)
    }
</script>

<div>
    <input on:change={onChange} bind:this={input} type="search" list="search_data" />
</div>

<datalist id="search_data">
    {#if search_data}
        {#each search_data as sd}
            {#if sd.hasOwnProperty("title")}
                <option value={sd.title}> {sd.title}</option>
            {:else}
                <option value={sd.name}> {sd.name}</option>
            {/if}
        {/each}
    {/if}
</datalist>
