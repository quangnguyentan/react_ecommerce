import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../utils/icons";
const { MdKeyboardArrowRight } = icons;
const Breadcrumbs = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:id/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center">
      {breadcrumbs
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex gap-1 items-center hover:text-main"
          >
            <span className="capitalize">{breadcrumb}</span>

            {index !== self.length - 1 && <MdKeyboardArrowRight />}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumbs;
