<script>
    import { section_url } from "./store.js";

    const sections = [
        { kind: "films", url: "https://swapi.dev/api/films/" },
        { kind: "people", url: "https://swapi.dev/api/people/" },
        { kind: "planets", url: "https://swapi.dev/api/planets/" },
        { kind: "species", url: "https://swapi.dev/api/species/" },
        { kind: "starships", url: "https://swapi.dev/api/starships/" },
        { kind: "vehicles", url: "https://swapi.dev/api/vehicles/" },
    ];

    export let def;
    let selected;
    const onSelect = () => {
        section_url.update((n) => selected);
    };
</script>

<select bind:value={selected} on:change={onSelect} on:blur={null}>
    {#each sections as section}
        <option value={section.url} selected={section.kind == def}>
            {section.kind}
        </option>
    {/each}
</select>
