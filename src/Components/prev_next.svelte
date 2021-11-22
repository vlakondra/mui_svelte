<script>
    export let prev_link;
    export let next_link;
    export let getPage;
</script>

<!-- https://mothereff.in/html-entities -->
<span style="font-size:0.95em;">
    <button
        style="cursor:pointer"
        disabled={prev_link == null}
        on:click={() => getPage(prev_link)}>&#x3C;</button
    >
    <button
        style="cursor:pointer"
        disabled={next_link == null}
        on:click={() => getPage(next_link)}>&#x3E;</button
    >
</span>
