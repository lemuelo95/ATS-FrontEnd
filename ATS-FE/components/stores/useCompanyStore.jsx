import { create } from "zustand";

const useCompanyStore = create((set) => ({
    companyName: "",
    companyEmail: "",
    setCompanyName: (name) => set({ companyName: name }),
    setCompanyEmail: (email) => set({ companyEmail: email }),
}));

export default useCompanyStore;
