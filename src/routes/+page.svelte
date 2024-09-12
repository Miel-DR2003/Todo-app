<script>
    import { Todo } from "$lib";
    import { NewForm } from "$lib";
    import { Collapsible } from "$lib";

    export let data;
    const { todoList } = data;
    // Group todo items by category
    let groupedTodos = [];
    let currentGroup = [];

    for (let i = 0; i < todoList.length; i++) {
        if (i === 0 || todoList[i].categorie !== todoList[i - 1].categorie) {
            if (currentGroup.length > 0) {
                groupedTodos.push(currentGroup);
            }
            currentGroup = [];
        }
        currentGroup.push(todoList[i]);
    }
    if (currentGroup.length > 0) {
        groupedTodos.push(currentGroup);
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
</svelte:head>

<div>
    <NewForm />
    {#if todoList.error}
        <p>Error loading items: {todoList.error}</p>
    {/if}

    {#if todoList.length == 0}
        <p>Geen todo's</p>
    {/if}

    {#each groupedTodos as group}
        <Collapsible categorieName={group[0].categorie}>
            <ul>
                {#each group as todoItem}
                    <Todo todo={todoItem} />
                {/each}
            </ul>
        </Collapsible>
    {/each}
</div>
