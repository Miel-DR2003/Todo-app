<script>
    import { Todo } from "$lib";
    import { NewForm } from "$lib";
    import { Collapsible } from "$lib";

    let todoList = [
        {
            id: 1,
            content: "description of todo",
            categorie: "testCategorie",
            endDate: new Date(),
            editing: false,
            checked: false,
        },
    ]; //array of todo's
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
</svelte:head>

<NewForm />

{#each todoList as todoItem}
    <Collapsible categorieName={todoItem.categorie}>
        <ul>
            <Todo todo={todoItem} />
        </ul>
    </Collapsible>
{/each}
