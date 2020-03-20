import React from "react";

const Book = React.lazy(() => import("../containers/Book"));
const NotFound = React.lazy(() => import("../containers/NotFound"));

export default [
  {
    path: "/book",
    component: Book,
    key: "Home",
    exact: true
  },
  {
    path: "/404",
    component: NotFound,
    key: "NotFound",
    exact: true
  }
];
