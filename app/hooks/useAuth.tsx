import { create } from 'zustand';

type useAuthTypes = {
  authorized: boolean,
  setAuthorized: (auth: boolean) => void
  resetAuthorized: () =>  void
}

export const useAuth = create<useAuthTypes>((set) => ({
  authorized: false,
  setAuthorized: (auth) =>  set({authorized: auth}),
  resetAuthorized: () => set({authorized: false})
}))