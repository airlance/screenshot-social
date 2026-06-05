import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  readIds: Set<string>;
  isRead: (id: string) => boolean;
  markRead: (id: string) => void;
  markUnread: (id: string) => void;
  toggleRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: (ids: string[]) => number;
};

const NotificationsContext = createContext<Ctx | null>(null);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const api = useMemo<Ctx>(() => ({
    readIds,
    isRead: (id) => readIds.has(id),
    markRead: (id) =>
      setReadIds((p) => {
        const n = new Set(p);
        n.add(id);
        return n;
      }),
    markUnread: (id) =>
      setReadIds((p) => {
        const n = new Set(p);
        n.delete(id);
        return n;
      }),
    toggleRead: (id) =>
      setReadIds((p) => {
        const n = new Set(p);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      }),
    markAllRead: () => {
      // marker handled by caller passing ids; kept for API symmetry
    },
    unreadCount: (ids) => ids.filter((i) => !readIds.has(i)).length,
  }), [readIds]);

  return <NotificationsContext.Provider value={api}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
};
