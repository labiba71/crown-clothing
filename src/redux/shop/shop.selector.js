import { createSelector } from "reselect";

const selectShop = (state) => {
  return state.shop;
};

export const selectCollections = createSelector([selectShop], (shop) => {
  return shop.collections;
});

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) => {
    console.log(collectionUrlParam);
    return collections[collectionUrlParam];
  });
// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector([selectCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   ));
