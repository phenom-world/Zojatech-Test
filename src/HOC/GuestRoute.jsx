import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const GuestRoute = (props) => {
  const { children } = props;
  const location = useLocation();

  const { token } = useSelector((state) => state.authStore);
  if (!isEmpty(token)) {
    return <Navigate to="/organization" state={{ from: location }} />;
  }

  return children;
};

export default GuestRoute;
