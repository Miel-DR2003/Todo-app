<svelte:head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
</svelte:head>

<!-- add css with tailwind -->
<!-- margin:0 auto; padding: 20px; width:700px; -->
<div class="mx-auto, p-5, w-[700px]">
    <!-- text align center; -->
    <h2 class="text-center, text-red-700">Todo list</h2>
    <p>Enter new ToDo here</p>
    <!-- display: flex; -->
    <div class="flex">
        <input type="text" />
        <!-- width 200px; -->
        <button class="w-52">Add</button>
    </div>
</div>

<!-- display: flex; align-items: baseline; width: 700px; margin:0 auto; -->
<div class="flex, align-baseline, w-[700], mx-auto">
    <input type="checknox" />
    <!-- flex grow:1; -->
    <h4 class="flex-grow-1">Name of todo</h4>
    <!-- Display: flex -->
    <div class="flex">
        <button>Edit</button>
        <button>Delelte</button>
    </div>
</div>
