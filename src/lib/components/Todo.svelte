<script>
    export let todo;
    function setEditing(isEditing) {
        todo.editing = isEditing;
    }
    //update this code
    function deleteTodo(i) {
        todoList.splice(i, 1);
        todoList = todoList;
    }
</script>

<!-- display: flex; align-items: baseline; width: 700px; margin:0 auto; -->
<div class="flex items-baseline p-5 w-[700] mx-auto gap-2">
    {#if todo.endDate === null}
        <h4 class="flex-grow-1">Niet van toepassing</h4>
    {:else}
        <h4 class="flex-grow-1">Deadline:{todo.endDate}</h4>
    {/if}
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
            <button on:click={() => setEditing(false)}>Save</button>
        {:else}
            <button on:click={() => setEditing(true)}>Edit</button>
        {/if}
        <button on:click={deleteTodo}>Delete</button>
    </div>
</div>
