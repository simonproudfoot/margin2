export default async ({ store}) => {
   await store.dispatch('nav/getNav');
   await store.dispatch('nav/getFooter');
};