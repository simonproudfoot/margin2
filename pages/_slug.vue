<template>
    <div>
        <div v-if="hasFeaturedImage" class="bg-black absolute top-0 left-0 h-screen w-full flex">
            <nuxt-img :src="shasFeaturedImage" alt="" class="backImage w-full h-full object-cover opacity-80" />
        </div>
        <div v-if="hasFeaturedImage" class="absolute top-0 left-0 h-screen w-full flex justify-items-end ">
            <div class="flex items-end w-full">
                <div class="md:w-9/12 w-full md:push-1/4 py-12 px-12 justify-between z-10 bg-white font-bold max-w-[800px] h-fit bottom-0 right-0 flex">
                    <h1 ref="header" class="pb- text-4xl" v-html="title"></h1>

                    <svg class="svg-icon h-12 rotate-90 cursor-pointer" viewBox="0 0 20 20" @click="scrollToContent()">
                        <path fill="currentColor" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <main ref="contentArea" v-if="post" class="md:w-9/12 px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="!hasFeaturedImage && 'pt-4 mt-1'" :style="(hasFeaturedImage && 'margin-top:90vh')">
            <h1 v-if="!hasFeaturedImage" ref="header" class="pb-12 text-4xl" v-html="title"></h1>
            <div v-html="content"></div>
            <ContactForm :hasContactForm="hasContactForm" />
        </main>
    </div>

</template>

<script>
export default {
    layout: "default",
    async asyncData({ params, $axios }) {
        const post = await $axios.get(
            `wp/v2/pages?slug=${params.slug}&_embed`
        );
        let title = post.data[0].title.rendered
            .replace(/–/g, '-')
            .replace(/“/g, '"')
            .replace(/”/g, '"')
            .replace(/’/g, "'");

        function removeTags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();
            return str.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/ig, '');
        }

        let excerpt = removeTags(post.data[0].excerpt.rendered);
    
        return { post: post.data[0], title: title, content: post.data[0].content.rendered, excerpt: excerpt, slug: params.slug, hasFeaturedImage: post.data[0]?.featured_media, hasContactForm: post.data[0].acf.page_has_contact_form};
    },
    methods: {
        scrollToContent() {
            const selected = this.$refs.contentArea
            selected.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    },


}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
