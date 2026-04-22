import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Menu, Search, UserPlus, Archive, PenSquare, Settings, X,
  CheckCheck, Phone, MoreHorizontal, Plus, Smile, Mic, Send,
  ChevronsLeft, MessageCircleMore, BadgeCheck,
} from "lucide-react";

type Chat = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  pinned?: boolean;
  online?: boolean;
  verified?: boolean;
  isVK?: boolean;
  active?: boolean;
  read?: boolean;
  emoji?: string;
};

const chats: Chat[] = [
  { id: "vk", name: "ВКонтакте", preview: "Совершён вход в ваш аккаун…  · 1д", time: "", verified: true, isVK: true, active: true },
  { id: "family", name: "❤️ Family chat", preview: "Thanks to all of you 🙌", time: "12:56", unread: 4, read: true },
  { id: "leah", name: "Leah Collins", preview: "Do you have any vacation pla…", time: "10:45", online: true, pinned: true },
  { id: "curry", name: "Curry Club — Ninjas fr…", preview: "You: Primavera Sound 2021 ticket…", time: "10:48", read: true, pinned: true, emoji: "🟡" },
  { id: "mamie", name: "Mamie Cruz", preview: "Do you have any pets? 🐶", time: "16:20", online: true, pinned: true },
  { id: "telegraf", name: "Telegraf.Design", preview: "You might miss this last week…", time: "18:20", unread: 1 },
  { id: "evan", name: "Evan West", preview: "What do you think the best inventi…", time: "17:22", online: true },
  { id: "nannie", name: "Nannie Watts", preview: "Let's meet around 14:00 near the…", time: "17:11" },
  { id: "vicente", name: "Vicente de la Cruz", preview: "A new font type is awesome, let's…", time: "15:36", read: true },
  { id: "kari", name: "Kari Granleese", preview: "I need your advice", time: "14:21" },
];

const Avatar = ({ name, isVK, online, size = 44 }: { name: string; isVK?: boolean; online?: boolean; size?: number }) => {
  const initial = name.replace(/[^\p{L}]/gu, "").charAt(0).toUpperCase() || "?";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {isVK ? (
        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">
          VK
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-foreground/80 font-semibold">
          {initial}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
      )}
    </div>
  );
};

const Messenger = () => {
  const [activeId, setActiveId] = useState("vk");
  const [text, setText] = useState("");
  const active = chats.find((c) => c.id === activeId)!;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="max-w-[1280px] mx-auto px-4 flex gap-4">
        <Sidebar />

        <main className="flex-1 min-w-0 py-3">
          <div className="vk-card overflow-hidden flex h-[calc(100vh-84px)]">
            {/* Chat list */}
            <section className="w-[300px] shrink-0 border-r border-border flex flex-col">
              <div className="h-14 px-4 flex items-center justify-between border-b border-border/60">
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-foreground/70">
                    <Menu className="w-5 h-5" />
                  </button>
                  <h2 className="font-semibold text-[15px]">Чаты</h2>
                </div>
                <div className="flex items-center gap-1 text-foreground/70">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary"><UserPlus className="w-[18px] h-[18px]" /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary"><Archive className="w-[18px] h-[18px]" /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary"><PenSquare className="w-[18px] h-[18px]" /></button>
                </div>
              </div>

              <div className="px-3 pt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск"
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3 mb-2">
                  <button className="px-3 py-1 rounded-md bg-accent text-foreground text-[13px] font-medium">Все</button>
                  <button className="px-3 py-1 rounded-md text-muted-foreground text-[13px] font-medium hover:text-foreground">Каналы</button>
                  <button className="ml-auto w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground"><Settings className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2">
                {chats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`w-full text-left flex items-start gap-3 px-2 py-2 rounded-lg mb-0.5 transition-colors ${
                      activeId === c.id ? "bg-accent" : "hover:bg-secondary/60"
                    }`}
                  >
                    <Avatar name={c.name} isVK={c.isVK} online={c.online} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold truncate">{c.name}</span>
                        {c.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary/20 shrink-0" />}
                        {c.read && !c.unread && <CheckCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />}
                        {c.time && <span className="text-[11px] text-muted-foreground ml-auto shrink-0">{c.time}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <p className="text-[12.5px] text-muted-foreground truncate flex-1">{c.preview}</p>
                        {c.unread && (
                          <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center">
                            {c.unread}
                          </span>
                        )}
                        {c.pinned && !c.unread && (
                          <span className="shrink-0 text-muted-foreground text-xs">📌</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="h-12 px-4 flex items-center justify-between border-t border-border/60">
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <MessageCircleMore className="w-4 h-4" />
                  Только непрочитанные
                </div>
                <button className="w-8 h-4 rounded-full bg-secondary relative">
                  <span className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-muted-foreground" />
                </button>
              </div>
            </section>

            {/* Chat window */}
            <section className="flex-1 min-w-0 flex flex-col">
              <div className="h-14 px-4 flex items-center gap-3 border-b border-border/60">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-foreground/70">
                  <X className="w-5 h-5" />
                </button>
                <Avatar name={active.name} isVK={active.isVK} size={36} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[14px] truncate">{active.name}</span>
                    {active.verified && <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />}
                  </div>
                  <p className="text-[12px] text-muted-foreground truncate">
                    {active.isVK ? "Сервисные уведомления" : active.online ? "был(а) недавно" : "был(а) в сети"}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-foreground/70">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary"><Phone className="w-[18px] h-[18px]" /></button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary"><Search className="w-[18px] h-[18px]" /></button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary"><MoreHorizontal className="w-[18px] h-[18px]" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                <div className="flex justify-center">
                  <span className="text-[11px] text-muted-foreground bg-secondary/60 px-3 py-1 rounded-full">
                    29 апреля 2021
                  </span>
                </div>

                <div className="flex items-end gap-2 max-w-[70%]">
                  <Avatar name={active.name} isVK={active.isVK} size={32} />
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <p className="text-[13px] font-semibold text-primary mb-0.5">ВКонтакте</p>
                    <p className="text-[13.5px] leading-relaxed text-foreground">
                      Для вашей страницы запрошено восстановление доступа.
                      Никому не сообщайте номер телефона, с которого поступит проверочный звонок!
                    </p>
                    <p className="text-[10.5px] text-muted-foreground text-right mt-1">18:40</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span className="text-[11px] text-muted-foreground">вчера</span>
                </div>

                <div className="flex items-end gap-2 max-w-[70%]">
                  <Avatar name={active.name} isVK={active.isVK} size={32} />
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <p className="text-[13px] font-semibold text-primary mb-0.5">ВКонтакте</p>
                    <p className="text-[13.5px] leading-relaxed text-foreground">
                      Совершён вход в ваш аккаунт Mark Roberts
                    </p>
                    <div className="text-[13px] text-foreground/90 mt-2 space-y-0.5">
                      <p>Дата входа: 21 апреля 2026 в 14:11</p>
                      <p>Устройство: через Safari</p>
                      <p>Сервис: сайт «ВКонтакте»</p>
                      <p>Геопозиция: București. Если это не вы, срочно смените пароль.</p>
                    </div>
                    <button className="mt-3 w-full h-9 rounded-lg bg-background/40 hover:bg-background/60 text-[13px] font-medium text-foreground transition-colors">
                      Сменить пароль ↗
                    </button>
                    <p className="text-[10.5px] text-muted-foreground text-right mt-1">14:11</p>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-3">
                <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 py-2">
                  <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                    <Plus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Сообщение"
                    className="flex-1 bg-transparent text-[14px] placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground"><Smile className="w-5 h-5" /></button>
                  {text ? (
                    <button className="w-8 h-8 flex items-center justify-center text-primary"><Send className="w-5 h-5" /></button>
                  ) : (
                    <button className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground"><Mic className="w-5 h-5" /></button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messenger;
