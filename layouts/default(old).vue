<template>
<div>
    <div class="min-h-screen flex">
        <sideNav :frontpage="false" />
        <main class="w-9/12 px-12 py-24 contentArea">
            <slot />
        </main>
    </div>
    <footerNav />
</div>
</template>

<script>
export default {
    name: 'default',
}
</script>
