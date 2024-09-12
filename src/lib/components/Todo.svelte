<script>
    export let todo;
    function setEditing(isEditing) {
        todo.editing = isEditing;
    }
    //update this code
    function deleteTodo(i) {}
</script>

<div class="flex items-baseline p-5 w-[700] mx-auto gap-2">
    {#if todo.editing}
        <input type="text" bind:value={todo.content} />
    {:else}
        <input type="checkbox" bind:checked={todo.checked} />
        <h4 class="flex-grow-1">{todo.content}</h4>
    {/if}
    {#if todo.endDate === null}
        <h4 class="flex-grow-1">|Geen deadline|</h4>
    {:else}
        <h4 class="flex-grow-1">Deadline:{todo.endDate}</h4>
    {/if}
    <div class="flex gap-2">
        {#if todo.editing}
            <button on:click={() => setEditing(false)}>Save</button>
        {:else}
            <button on:click={() => setEditing(true)}>Edit</button>
        {/if}
        <form method="post" action="?/delete">
            <input type="hidden" name="todoId" value={todo.todoId} />
            <button type="submit">Delete</button>
        </form>
    </div>
</div>
