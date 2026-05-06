import { createContext, useCallback, useContext, useState, ReactNode } from "react";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  date?: string;
  isOwn?: boolean;
  images?: string[];
  audio?: { url: string; duration: string };
  video?: { url: string; thumbnail: string; duration: string };
  replyTo?: { senderName: string; text: string };
}

export interface ChatContact {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatar?: string;
  unread?: number;
  pinned?: boolean;
  online?: boolean;
  verified?: boolean;
  isVK?: boolean;
  read?: boolean;
  isGroup?: boolean;
}

const CURRENT_USER = { id: "self", name: "Вы" };

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

const initialContacts: ChatContact[] = [
  { id: "vk", name: "ВКонтакте", preview: "Совершён вход в ваш аккаунт · 1д", time: "", verified: true, isVK: true },
  { id: "family", name: "❤️ Family chat", preview: "Thanks to all of you 🙌", time: "12:56", unread: 4, read: true, isGroup: true, avatar: "https://i.pravatar.cc/100?img=58" },
  { id: "leah", name: "Leah Collins", preview: "Do you have any vacation pla…", time: "10:45", online: true, pinned: true, avatar: "https://i.pravatar.cc/100?img=47" },
  { id: "curry", name: "Curry Club — Ninjas fr…", preview: "Вы: Primavera Sound 2021…", time: "10:48", read: true, pinned: true, isGroup: true, avatar: "https://i.pravatar.cc/100?img=65" },
  { id: "mamie", name: "Mamie Cruz", preview: "Do you have any pets? 🐶", time: "16:20", online: true, pinned: true, avatar: "https://i.pravatar.cc/100?img=26" },
  { id: "telegraf", name: "Telegraf.Design", preview: "You might miss this last week…", time: "18:20", unread: 1, avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "evan", name: "Evan West", preview: "What do you think the best invent…", time: "17:22", online: true, avatar: "https://i.pravatar.cc/100?img=53" },
  { id: "nannie", name: "Nannie Watts", preview: "Let's meet around 14:00 near the…", time: "17:11", avatar: "https://i.pravatar.cc/100?img=45" },
  { id: "vicente", name: "Vicente de la Cruz", preview: "A new font type is awesome, let's…", time: "15:36", read: true, avatar: "https://i.pravatar.cc/100?img=33" },
  { id: "kari", name: "Kari Granleese", preview: "I need your advice", time: "14:21", avatar: "https://i.pravatar.cc/100?img=32" },
];

const seedMessages: Record<string, Message[]> = {
  vk: [
    {
      id: "v1", senderId: "vk", senderName: "ВКонтакте",
      text: "Для вашей страницы запрошено восстановление доступа. Никому не сообщайте номер телефона, с которого поступит проверочный звонок!",
      time: "18:40", date: "29 апреля 2026",
    },
    {
      id: "v2", senderId: "vk", senderName: "ВКонтакте",
      text: "Совершён вход в ваш аккаунт. Дата входа: 21 апреля 2026 в 14:11. Устройство: Safari. Если это не вы — срочно смените пароль.",
      time: "14:11", date: "вчера",
    },
  ],
  curry: [
    {
      id: "c1", senderId: "m2", senderName: "Alex Djos",
      text: "Curry Club, ready for the Barcelona trip this summer? Photos from Pukkelpop fest 🙌⛺",
      time: "10:32", date: "28 ноября 2025",
      images: [
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
      ],
    },
    {
      id: "c2", senderId: "m2", senderName: "Alex Djos",
      text: "Check this out: https://www.youtube.com/watch?v=V6fFHS_ytWw",
      time: "10:45", date: "28 ноября 2025",
    },
    {
      id: "c3", senderId: "m3", senderName: "Michael Borisov",
      text: "", time: "10:46", date: "28 ноября 2025",
      audio: { url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "0:42" },
    },
    {
      id: "c4", senderId: "self", senderName: "Вы",
      text: "Primavera Sound 2021 tickets bought!", time: "10:48", isOwn: true, date: "2 декабря 2025",
    },
  ],
};

const BOT_REPLIES = ["Понял! 👍", "Класс 🔥", "Окей, договорились", "Жду", "Хаха 😄", "Звучит супер 🙌"];
const BOTS: Record<string, { id: string; name: string }[]> = {
  curry: [
    { id: "m2", name: "Alex Djos" },
    { id: "m3", name: "Michael Borisov" },
  ],
};

interface Ctx {
  contacts: ChatContact[];
  messages: Record<string, Message[]>;
  typing: Set<string>;
  sendMessage: (chatId: string, text: string, replyTo?: { senderName: string; text: string }) => void;
}

const MessengerContext = createContext<Ctx | null>(null);

export const MessengerProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<ChatContact[]>(initialContacts);
  const [messages, setMessages] = useState<Record<string, Message[]>>(seedMessages);
  const [typing, setTyping] = useState<Set<string>>(new Set());

  const sendMessage = useCallback<Ctx["sendMessage"]>((chatId, text, replyTo) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const time = nowTime();
    const msg: Message = {
      id: `m-${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      text: trimmed,
      time,
      isOwn: true,
      replyTo,
    };
    setMessages((p) => ({ ...p, [chatId]: [...(p[chatId] ?? []), msg] }));
    setContacts((p) =>
      p.map((c) => (c.id === chatId ? { ...c, preview: `Вы: ${trimmed}`, time, read: true, unread: undefined } : c))
    );

    const bots = BOTS[chatId];
    if (!bots) return;
    setTyping((s) => new Set(s).add(chatId));
    const bot = bots[Math.floor(Math.random() * bots.length)];
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const t = nowTime();
      const botMsg: Message = {
        id: `m-${Date.now()}-b`,
        senderId: bot.id,
        senderName: bot.name,
        text: reply,
        time: t,
      };
      setMessages((p) => ({ ...p, [chatId]: [...(p[chatId] ?? []), botMsg] }));
      setContacts((p) => p.map((c) => (c.id === chatId ? { ...c, preview: reply, time: t, read: false } : c)));
      setTyping((s) => {
        const n = new Set(s);
        n.delete(chatId);
        return n;
      });
    }, 1100 + Math.random() * 1200);
  }, []);

  return (
    <MessengerContext.Provider value={{ contacts, messages, typing, sendMessage }}>
      {children}
    </MessengerContext.Provider>
  );
};

export const useMessenger = () => {
  const ctx = useContext(MessengerContext);
  if (!ctx) throw new Error("useMessenger must be used within MessengerProvider");
  return ctx;
};
