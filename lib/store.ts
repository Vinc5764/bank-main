import { create } from "zustand";
interface TokenState {
  token: string | null;
  userType: any;
  name: any;
  setToken: (token: string, userType: any, name: any) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenState>((set) => ({
  token: localStorage.getItem("token") || null,
  name: localStorage.getItem("name") || null,
  userType: localStorage.getItem("userType") || null,
  setToken: (token: string, userType: any, name: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
    localStorage.setItem("name", name);
    set({ token, userType, name });
  },
  clearToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    set({ token: null, userType: null });
  },
}));

export default useTokenStore;
