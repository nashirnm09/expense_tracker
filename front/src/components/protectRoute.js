import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS } from "../redux/constants/userConstants";

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, getError } = useSelector((state) => state.user);

  useEffect(() => {
    if (getError && !loading) {
      dispatch({ type: CLEAR_ERRORS });
      navigate("/login");
      return;
    }

    if (!user && !loading) {
      navigate("/login");
      return;
    }
  }, [loading, getError, user]);
  return <>{!loading && user ? <>{children}</> : <></>}</>;
}

export default ProtectRoute;
