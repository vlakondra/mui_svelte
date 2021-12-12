<script>
    export let data;
</script>

<div style="width:30%;height:auto;background:yellow;margin:1px">
    {#each Object.entries({ ...data }) as [k, v]}
        <div>
            <div style="display:inline-block">{k}</div>
            <div style="display:inline-block">{v}</div>
        </div>
    {/each}
</div>
