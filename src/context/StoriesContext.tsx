import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import avatarMe from "@/assets/avatar-me.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import photo1 from "@/assets/post-photo-1.jpg";
import photo2 from "@/assets/post-photo-2.jpg";
import photo3 from "@/assets/post-photo-3.jpg";
import photo4 from "@/assets/post-photo-4.jpg";

export type StoryItem = {
  id: string;
  /** image url or data URL */
  image?: string;
  /** background color for text-only stories */
  background?: string;
  text?: string;
  createdAt: number;
};

export type StoryUser = {
  id: string;
  name: string;
  avatar: string;
  isMe?: boolean;
  seen?: boolean;
  items: StoryItem[];
};

type StoriesContextValue = {
  users: StoryUser[];
  addMyStory: (item: Omit<StoryItem, "id" | "createdAt">) => void;
  markSeen: (userId: string) => void;
};

const StoriesContext = createContext<StoriesContextValue | null>(null);

const initialUsers: StoryUser[] = [
  {
    id: "me",
    name: "Моя история",
    avatar: avatarMe,
    isMe: true,
    items: [],
  },
  { id: "u1", name: "Skylar R.", avatar: avatar1, items: [{ id: "s1", image: photo1, createdAt: Date.now() - 3600_000 }] },
  { id: "u2", name: "Mira D.", avatar: avatar2, items: [{ id: "s2", image: photo2, createdAt: Date.now() - 7200_000 }, { id: "s2b", image: photo3, createdAt: Date.now() - 6000_000 }] },
  { id: "u3", name: "Nolan M.", avatar: avatar3, items: [{ id: "s3", image: photo3, createdAt: Date.now() - 5000_000 }] },
  { id: "u4", name: "Leah C.", avatar: avatar4, items: [{ id: "s4", image: photo4, createdAt: Date.now() - 4000_000 }] },
  { id: "u5", name: "Ethan W.", avatar: avatar5, items: [{ id: "s5", text: "Доброе утро ☀️", background: "linear-gradient(135deg, hsl(211 100% 56%), hsl(280 80% 60%))", createdAt: Date.now() - 3000_000 }] },
  { id: "u6", name: "Mamie C.", avatar: avatar6, items: [{ id: "s6", image: photo1, createdAt: Date.now() - 2000_000 }] },
  { id: "u7", name: "Evan W.", avatar: avatar7, seen: true, items: [{ id: "s7", image: photo2, createdAt: Date.now() - 86400_000 }] },
  { id: "u8", name: "Nannie W.", avatar: avatar1, seen: true, items: [{ id: "s8", image: photo4, createdAt: Date.now() - 90000_000 }] },
];

export const StoriesProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<StoryUser[]>(initialUsers);

  const addMyStory = useCallback((item: Omit<StoryItem, "id" | "createdAt">) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.isMe
          ? {
              ...u,
              items: [
                ...u.items,
                { ...item, id: `me-${Date.now()}`, createdAt: Date.now() },
              ],
            }
          : u
      )
    );
  }, []);

  const markSeen = useCallback((userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, seen: true } : u)));
  }, []);

  const value = useMemo(() => ({ users, addMyStory, markSeen }), [users, addMyStory, markSeen]);

  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>;
};

export const useStories = () => {
  const ctx = useContext(StoriesContext);
  if (!ctx) throw new Error("useStories must be used within StoriesProvider");
  return ctx;
};
