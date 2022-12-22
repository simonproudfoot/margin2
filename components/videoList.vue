<template>
<div>
    <video controls loop class="backImage aspect-video w-full h-full object-cover bg-black border">
        <source :src="$store.state.page.pageFeatures.featured_video" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
