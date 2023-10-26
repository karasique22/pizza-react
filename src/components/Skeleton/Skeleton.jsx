import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block"
  >
    <circle cx="140" cy="130" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="433" rx="10" ry="10" width="90" height="25" />
    <rect x="125" y="423" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
