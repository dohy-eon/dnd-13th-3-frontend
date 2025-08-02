import { create } from "zustand";

type Tab = "goal" | "timer";

interface TabStore {
  activeTab: Tab;
  setTab: (tab: Tab) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: "goal",
  setTab: (tab) => set({ activeTab: tab }),
}));
