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
        const now = new Date(); // Current date and time in local time zone
        const tenDaysAfterNow = new Date(now.getTime()); // Clone 'now' to avoid mutation
        tenDaysAfterNow.setDate(now.getDate() + 10); // Add 10 days instead of subtracting

        // Convert 'now' and 'tenDaysAfterNow' to UTC
        const nowUTC = new Date(now.toISOString());
        const tenDaysAfterNowUTC = new Date(tenDaysAfterNow.toISOString());

        return todos.filter((todo) => {
            const todoEndDate = new Date(todo.endDate); // Parse the todo's endDate
            const todoEndDateUTC = new Date(todoEndDate.toISOString()); // Convert to UTC
            return (
                todoEndDateUTC >= nowUTC && todoEndDateUTC <= tenDaysAfterNowUTC
            );
        });
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
