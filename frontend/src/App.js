import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import Home from "./Home";
import About from "./About";
import Statistics from "./Statistics";
import FooterComponent from "./components/FooterComponent";
import "./App.css";

const { Header, Content } = Layout;

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="center-menu"
        >
          <Menu.Item key="/">
            <Link to="/" style={{ color: "white" }}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about" style={{ color: "white" }}>About</Link>
          </Menu.Item>
          <Menu.Item key="/statistics">
            <Link to="/statistics" style={{ color: "white" }}>Statistics</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;