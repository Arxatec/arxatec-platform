import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main style={{ padding: "2rem", backgroundColor: "#f9f9fb" }}>
    {children}
  </main>
);

export default Layout;
