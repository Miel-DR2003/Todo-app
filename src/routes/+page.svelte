<script>
    import { Todo } from "$lib";
    import { NewForm } from "$lib";
    import { Collapsible } from "$lib";

    export let data;
    const { todoList } = data;
    // Group todo items by category
    function groupByCategory(todos) {
        const grouped = {};
        todos.forEach((todo) => {
            if (!grouped[todo.categorie]) {
                grouped[todo.categorie] = [];
            }
            grouped[todo.categorie].push(todo);
        });
        return Object.values(grouped);
    }

    function checkDate(todos) {
        const now = new Date();
        const fiveDaysBeforeNow = new Date();
        fiveDaysBeforeNow.setDate(now.getDate() - 5);
        const deadlineIsNear = [];
        todos.forEach((todo) => {
            if (todo.endDate > fiveDaysBeforeNow) {
                deadlineIsNear.push(todo);
            }
        });
        return deadlineIsNear;
    }

    function showAlert(content) {
        if (typeof window !== "undefined") {
            alert(`The deadline for ${content} is almost near`);
        }
    }

    const deadlineIsNear = checkDate(todoList);
    const groupedTodos = groupByCategory(todoList);
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
</svelte:head>

<div>
    {#each deadlineIsNear as todo}
        {showAlert(todo.content)}
    {/each}

    <NewForm />
    {#if todoList.error}
        <p class="px-2">Error loading items: {todoList.error}</p>
    {/if}

    {#if todoList.length == 0}
        <p class="px-2">Geen todo's</p>
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
