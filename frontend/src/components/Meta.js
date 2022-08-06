import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to Techie Shop",
  description: "Buy top tech products at great discounts",
  keywords: "Electronics, discount, mobile,phone,laptop,earphones",
};

export default Meta;
