<script>
    import { Todo } from "$lib";
    import { NewForm } from "$lib";
    import { Collapsible } from "$lib";

    export let data;
    const { todoList } = data;
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

    {#if todoList && todoList.length > 0}
        {#each todoList as todoItem (todoItem.id)}
            <Collapsible categorieName={todoItem.categorie}>
                <ul>
                    <Todo todo={todoItem} />
                </ul>
            </Collapsible>
        {/each}
    {/if}
</div>
