export default async ({ store}) => {
   await store.dispatch('nav/getNav');
};