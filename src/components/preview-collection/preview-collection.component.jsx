import React from "react";
import "./preview-collection.styles.scss";
import CollectionItem from "../collection-item/collection-item.comonent";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          ? items
              .filter((item, idx) => idx < 4)
              .map((item) => <CollectionItem key={item.id} item={item} />)
          : null}
      </div>
    </div>
  );
};

export default CollectionPreview;
