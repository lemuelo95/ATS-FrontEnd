import { create } from 'zustand';

const useRoleStore = create((set) => ({
    role: "",
    setRole: (newRole) => set({ role: newRole }),
}));

export default useRoleStore;
