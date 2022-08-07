import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="d-flex justify-content-center gap-2" >
        {[...Array(pages).keys()].map((i) => (
          <LinkContainer 
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i + 1}`
                  : `/page/${i + 1}`
                : `/admin/productlist/${i + 1}`
            }
            key={i + 1}
          >
            <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
