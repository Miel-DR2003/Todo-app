<script>
    import { Todo } from "$lib";
    import { NewForm } from "$lib";
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
    <h3 class="p-2">{todoItem.categorie}</h3>
    <ul>
        <Todo todo={todoItem} />
    </ul>
{/each}
