<script>
    let todoList = [
        {
            id: 1,
            content: "description of todo",
            editing: false,
            checked: false,
        },
    ]; //array of todo's
    let textInput = "";
    function setEditing(i, isEditing) {
        todoList[i].editing = isEditing;
    }
    function deleteTodo(i) {
        todoList.splice(i, 1);
        todoList = todoList;
    }
    function addTodo() {
        todoList = [
            ...todoList,
            { content: textInput, editing: false, checked: false },
        ];
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
</svelte:head>

<!-- add css with tailwind -->
<!-- margin:0 auto; padding: 20px; width:700px; -->
<div class="mx-auto p-5 w-[700px]">
    <!-- text align center; -->
    <h2 class="text-center">Todo list</h2>
    <p>Enter new ToDo here</p>
    <!-- display: flex; -->
    <div class="flex gap-2">
        <input type="text" bind:value={textInput} />
        <!-- width 200px; -->
        <button class="w-52" on:click={addTodo}>Add</button>
    </div>
</div>

{#each todoList as todo, i}
    <!-- display: flex; align-items: baseline; width: 700px; margin:0 auto; -->
    <div class="flex items-baseline p-5 w-[700] mx-auto gap-2">
        {#if todo.editing}
            <input type="text" bind:value={todo.content} />
        {:else}
            <input type="checkbox" bind:checked={todo.checked} />
            <!-- flex grow:1; -->
            <h4 class="flex-grow-1">{todo.content}</h4>
        {/if}
        <!-- Display: flex -->
        <div class="flex gap-2">
            {#if todo.editing}
                <button on:click={() => setEditing(i, false)}>Save</button>
            {:else}
                <button on:click={() => setEditing(i, true)}>Edit</button>
            {/if}
            <button on:click={deleteTodo}>Delete</button>
        </div>
    </div>
{/each}
