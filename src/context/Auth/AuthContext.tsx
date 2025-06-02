import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [adminData, setAdminData] = useState(() => {
    const fetchedData = localStorage.getItem("AdminData");
    // setAdminData(fetchedData ? JSON.parse(fetchedData) : null);
    return fetchedData ? JSON.parse(fetchedData) : null;
  });

 
  useEffect(() => {
    if (adminData) {
      console.log("AdminData updated:", adminData);
      localStorage.setItem("AdminData", JSON.stringify(adminData));
    } else {
    }
  }, [adminData]);

  return (
    <AuthContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
