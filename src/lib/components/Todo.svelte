<script>
    export let todo;

    function setEditing(isEditing) {
        todo.editing = isEditing;
    }
</script>

<div class="flex items-baseline p-5 w-[700] mx-auto gap-2">
    {#if todo.editing}
        <input type="text" name="newContent" bind:value={todo.content} />
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
        <form method="post">
            <input type="hidden" name="todoId" value={todo.todoId} />
            <input type="hidden" name="newContent" value={todo.content} />
            {#if todo.editing}
                <button type="submit" formaction="?/update">Save</button>
            {:else}
                <button type="button" on:click={() => setEditing(true)}
                    >Edit</button
                >
            {/if}
            <button type="submit" formaction="?/delete">Delete</button>
        </form>
    </div>
</div>
