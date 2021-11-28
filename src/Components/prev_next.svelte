<script>
    import { Icon } from "svelte-mui";
    import Dart from "../svgs/dart.svelte";
    export let prev_link;
    export let next_link;
    export let getPage;

    let col = "green";
</script>

<!-- https://mothereff.in/html-entities -->
<!-- http://svgicons.sparkk.fr/ -->
<div />

<div>
    <Icon pulse spin="True">
        <svelte:component this={Dart} />
    </Icon>
    <Icon size="86" color={col}>
        <svelte:component this={Dart} />
    </Icon>

    <span style="font-size:0.95em;">
        <button
            style="cursor:pointer; margin:0"
            disabled={prev_link == null}
            on:click={() => getPage(prev_link)}
        >
            &#x3C;
        </button>
        <button
            style="cursor:pointer"
            disabled={next_link == null}
            on:click={() => getPage(next_link)}>&#x3E;</button
        >
    </span>
</div>

<style>
    /* :global(svg) {
        width: 3.2em;
        height: 3.2em;
        fill: rgb(34, 165, 30);
    } */

    :global(.svg-icon) {
        width: 3em;
        height: 3em;
        fill: rgb(141, 110, 25);
        stroke-width: 0;
        background: black;
    }

    /* .svg-icon path,
    .svg-icon polygon,
    .svg-icon rect {
        fill: #95b8c9;
    }

    .svg-icon circle {
        stroke: #4691f6;
        stroke-width: 1;
    } */
</style>
