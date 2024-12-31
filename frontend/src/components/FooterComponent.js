import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "../App.css";

const { Footer } = Layout;

function FooterComponent() {
    return (
        <Footer className="fixed-footer">
            <Menu theme="dark" mode="horizontal" className="center-menu">
                <Menu.Item key="github">
                    <Link to="https://github.com/praabindhp" style={{ color: "white" }}>
                        Copyrighted © 2025 | Praabindh Pradeep
                    </Link>
                </Menu.Item>
            </Menu>
        </Footer>
    );
}

export default FooterComponent;