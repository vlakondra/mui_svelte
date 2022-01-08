<script>
    import Menu from "./Components/menu.svelte";
    import Content from "./Components/app_content.svelte";
    let data = [
        {
            name: "ONE",
            items: [
                {
                    name: "ONE-1",
                    addr: "http://placebeard.it/640x480",
                },
                { name: "ONE-2", addr: "http://placebeard.it/640x481" },
            ],
        },
        {
            name: "TWO",
            items: [
                {
                    name: "TWO-1",
                    addr: "http://placeimg.com/640/480/any",
                },
                { name: "TWO-2", addr: "http://placeimg.com/640/481/any" },
            ],
        },
    ];
    let chldData;
    let addr = data[0].items[0].addr;

    const onTopSelect = (chld) => {
        console.log("chld", chld);
        chldData = chld;
        addr = chld[0].addr;
    };
    const onChildSelect = (seladdr) => {
        addr = seladdr;
    };
</script>

<div class="app">
    <div class="app-container">
        <div class="app-header">
            <Menu orient="H" {data} topSelectFunc={onTopSelect} />
        </div>
        <div class="article">
            <div class="left-bar">
                {#if chldData}
                    {#each chldData as item}
                        <p on:click={() => onChildSelect(item.addr)}>
                            {item.name}
                        </p>
                    {/each}
                {/if}
            </div>

            <div class="app-content">
                <Content {addr} />
            </div>
        </div>
        <div class="app-footer">foot</div>
    </div>
</div>

<style>
    :global(body) {
        height: 99%;
    }
    .app {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin: 5px;
        padding: 5px;
        border: 1px solid silver;
        box-sizing: border-box;
    }
    .app-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: rgb(218, 236, 236);
        width: 66%;
    }
    .article {
        display: flex;
        flex-direction: row;
        border-top: 1px solid silver;
    }
    .left-bar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 20%;
    }
    .app-footer,
    .app-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 60px;
        border-top: 1px solid silver;
        padding-left: 10px;
    }
</style>
