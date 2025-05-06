import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

const Layout = () => {
	return (
		<div style={{ display: "flex" }}>
			<SideMenu />
			<div style={{ flexGrow: 1, marginLeft: 30, marginTop: 60 }}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
