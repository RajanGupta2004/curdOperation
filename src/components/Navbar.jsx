import React, { useState } from "react";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Button type="">
          <a href="/">Cirrius</a>
        </Button>
      </div>
      <div className="">
        <Flex horizontal style={""}>
          <Button>
            <Link to="/add-post">Create Post</Link>
          </Button>
        </Flex>
      </div>
    </nav>
  );
};

export default Navbar;
