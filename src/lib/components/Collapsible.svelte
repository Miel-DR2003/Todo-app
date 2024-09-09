<script>
    export let categorieName;
    let isOpen = false;

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="collapsible">
    <div class="header" on:click={toggle}>
        {categorieName}
        <span>{isOpen ? "▲" : "▼"}</span>
    </div>
    {#if isOpen}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>
