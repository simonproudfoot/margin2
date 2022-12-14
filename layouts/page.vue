<template>
<div>
    <TopNav :frontpage="false" />
    <div class="min-h-screen md:flex ">
        <sideNav />
        <Nuxt />
    </div>
    <footerNav />
</div>
</template>

<script>
export default {
    name: 'page',
}
</script>
