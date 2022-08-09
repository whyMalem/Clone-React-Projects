import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    username: "",
    name: "",
  });
  return (
    <DataContext.Provider value={{ admin, setAdmin }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
