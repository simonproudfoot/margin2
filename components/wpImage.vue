<template>
<img @load="$emit('imageLoaded')" :src="fullSize" :sizes="`(max-width: 600px) ${srcset.sizes}`" :srcset="srcset.imgSrc" :alt="$store.state.page.pageFeatures.featuredImage.alt" :class="classList" />
</template>

<script>
export default {
    props: ['classList'],
    computed: {
        fullSize() {

            const img = Object.keys(this.$store.state.page.pageFeatures.featuredImage.sizes).map(e => this.$store.state.page.pageFeatures.featuredImage.sizes[e])
            const size = Object.keys(img).length - 1
            return img[size]?.source_url
        },
        srcset() {
            let srcsetValues = []
            let sizes = []
            const img = Object.keys(this.$store.state.page.pageFeatures.featuredImage.sizes).map(e => this.$store.state.page.pageFeatures.featuredImage.sizes[e])
            img.forEach(size => {
                srcsetValues.push(size.source_url + ' ' + size.width + 'w')
                sizes.push(size.width + 'px')
            });
            return { imgSrc: srcsetValues.join(', '), sizes: sizes.join(', ') }
        }
    }
}
</script>
