<template>
<main id="scrollTo" v-if="post" class="md:w-9/12  px-12 pb-24 contentArea z-10 bg-white max-w-[800px]" :class="!$store.state.page.pageFeatures.featuredImage ? 'pt-4 mt-1' : 'contentMargin'">
    <h1 v-if="!$store.state.page.pageFeatures.featuredImage" ref="header" class="pb-12 text-4xl" v-html="title"></h1>
    <div class="page-content" v-html="content"></div>
    <ContactForm v-if="hasContactForm" />
</main>
</template>
<script>
export default {
    layout: "page",
    async asyncData({ params, $axios, store }) {
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
      
        let feauredVideo =  post.data[0].acf.header_video ? post.data[0].acf.header_video : '' 
        let featuredImage = post.data[0].featured_media ? post.data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.full.source_url : ''
       

        const dark = post.data[0].acf.dark_background ? true : false
        const pageData = { post: post.data[0], title: title, content: post.data[0].content.rendered, excerpt: excerpt, slug: params.slug, hasContactForm: post.data[0].acf.page_has_contact_form  }
        store.commit('page/SET_FEATURED', { title: title, featuredImage: featuredImage, darkMode: dark,  featured_video: feauredVideo })
        return pageData
    },
}
</script>


<style>

  .contentMargin {
    margin-top: 100vh;
  }


@media (min-width: 768px) {
  .contentMargin {
    margin-top: 80vh;
  }
}



</style>