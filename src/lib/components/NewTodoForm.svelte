<script>
    let textInput = "";
    function addTodo() {
        //todo
    }
</script>

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
