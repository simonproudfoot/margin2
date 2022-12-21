
export default async function getPageData(data) {

  function removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/ig, '');
  }

  data.store.commit('nav/CLOSE_MENU')
  const post = await data.$axios.get(
    data.url
  );
  let title = removeTags(post.data[0].title.rendered)
  let darkMode = post.data[0].acf.dark_background ? true : false
  let hasContactForm = post.data[0].acf.hasContactForm ? true : false

  let excerpt = removeTags(post.data[0].excerpt.rendered);
  let feauredVideo = post.data[0].acf.header_video ? post.data[0].acf.header_video : ''
  let featuredImage = post.data[0].featured_media ? { src: '', sizes: post.data[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes, alt: post.data[0]['_embedded']['wp:featuredmedia'][0].media_details.alt_text } : null
  const pageData = { post: post.data[0], title: title, content: post.data[0].content.rendered, excerpt: excerpt, slug: data.params.slug, hasContactForm: hasContactForm }
  data.store.commit('page/SET_FEATURED', { title: title, featuredImage: featuredImage, darkMode: darkMode, featured_video: feauredVideo, yoast_head_json: post.data[0].yoast_head_json, hasContactForm: hasContactForm })
  return pageData
}
