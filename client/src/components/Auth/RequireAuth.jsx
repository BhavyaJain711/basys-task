import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
    const role=useSelector((state)=>state.role);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    console.log(role);

    return (
        role && allowedRoles.includes(role)
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace  />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;