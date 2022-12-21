
export default function headMeta(yoast) {
  let metaArray = []
  Object.entries(yoast).map(ele => {
    if (ele[0] == 'robots') {
      let meta = Object.values(ele[1])
      metaArray.push({
        name: 'robots',
        content: meta
      })
    } else if (ele[0] == 'og_image') {
      let meta = Object.values(ele[1])
      metaArray.push({
        name: 'og_image',
        content: meta[0].url
      })
    } else if (ele[0] == 'og_image') {
      let meta = Object.values(ele[1])
      metaArray.push({
        name: 'og_image',
        content: meta[0].url.replace(/[^\w\s]/gi, '')
      })
    } else if (ele[0] == 'twitter_misc') {

    } else if (ele[0] == 'schema') {
      // SKIP FOR NOW
    } else {
      metaArray.push({
        name: ele[0], content: ele[1]
      });
    }
  })

  return metaArray
}
