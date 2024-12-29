import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "18px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
        fontFamily: "Unbounded, cursive",
        textAlign: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/home">
        <NavLink to="/home">
          <font style={{ fontFamily: "Unbounded, cursive" }} color="white">
            HOME
          </font>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/newstaking">
        <NavLink to="/newstaking">
          <font style={{ fontFamily: "Unbounded, cursive" }} color="white">
            NEW STAKING
          </font>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/mousestake">
        <NavLink to="/mousestake">
          <font style={{ fontFamily: "Unbounded, cursive" }} color="white">
            STAKING
          </font>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
