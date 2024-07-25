import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const Header = () => {
  const nevigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    nevigate("/login");
  };

  return (
    <>
      <div className="header">
        <div className="left text-xl font-bold">
          <h3>Expense Management App</h3>
        </div>
        <div className="right">
          <UserOutlined className="user-logo" />
          <button onClick={logout} className="mx-2 btn btn-primary logout">
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
