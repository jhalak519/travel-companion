import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
        {children}
      </main>
    </div>
  );
};

export default Layout;
