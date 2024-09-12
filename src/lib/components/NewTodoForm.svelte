<script>
    import { Dropdown } from "$lib";
    import { enhance } from "$app/forms";
    let textInput = "";
    let selectedDate = "";
    let form;
    let creating = false;
</script>

<div>
    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <form
        method="POST"
        action="?/create"
        use:enhance={() => {
            creating = true;
            return async ({ update }) => {
                await update();
                creating = false;
            };
        }}
    >
        <div class="mx-auto p-5 w-[700px]">
            <h2 class="text-center">Todo list</h2>
            <p>Enter new ToDo here</p>
            <div class="flex gap-2">
                <input disabled={creating} type="text" bind:value={textInput} />
                <input
                    disabled={creating}
                    type="datetime-local"
                    bind:value={selectedDate}
                />
                <Dropdown />
                <button class="w-52" type="submit">Add</button>
            </div>
            {#if creating}
                <span class="saving">saving...</span>
            {/if}
        </div>
    </form>
</div>
