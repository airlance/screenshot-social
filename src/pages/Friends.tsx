import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Calendar,
  Search,
  SlidersHorizontal,
  UserPlus,
  Users,
} from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

type Suggestion = {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  mutual: number;
};

const SUGGESTIONS: Suggestion[] = [
  { id: "mark-roberts", name: "Mark Roberts", subtitle: "Харьков · 4 общих друга", avatar: avatar1, mutual: 4 },
  { id: "anna-sokolova", name: "Анна Соколова", subtitle: "Санкт-Петербург · 12 общих друзей", avatar: avatar2, mutual: 12 },
  { id: "igor-lebedev", name: "Игорь Лебедев", subtitle: "Москва · 7 общих друзей", avatar: avatar3, mutual: 7 },
  { id: "elena-volkova", name: "Елена Волкова", subtitle: "Казань · 2 общих друга", avatar: avatar4, mutual: 2 },
  { id: "dmitry-orlov", name: "Дмитрий Орлов", subtitle: "Новосибирск · 9 общих друзей", avatar: avatar5, mutual: 9 },
];

const Friends = () => {
  const [tab, setTab] = useState<"all" | "online" | "find">("find");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSent((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = SUGGESTIONS.filter((s) =>
    query.trim() ? s.name.toLowerCase().includes(query.trim().toLowerCase()) : true,
  );

  return (
    <AppLayout
      right={
        <div className="vk-card p-2">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/60">
            Мои друзья <Calendar className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setTab("find")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm mt-1 ${
              tab === "find" ? "bg-secondary" : "hover:bg-secondary/60"
            }`}
          >
            Поиск друзей
          </button>
        </div>
      }
    >
      <div className="vk-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setTab("all")}
            className={`vk-pill ${tab === "all" ? "bg-secondary" : "bg-transparent text-muted-foreground"}`}
          >
            Все друзья <span className="ml-1">0</span>
          </button>
          <button
            onClick={() => setTab("online")}
            className={`vk-pill ${tab === "online" ? "bg-secondary" : "bg-transparent text-muted-foreground"}`}
          >
            Друзья онлайн <span className="ml-1">0</span>
          </button>
          <button
            onClick={() => setTab("find")}
            className="vk-pill ml-auto flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Найти друзей
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-10 rounded-xl bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none"
            placeholder="Введите имя"
          />
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {tab !== "find" ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <UserPlus className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
            <div className="font-semibold">Находите друзей</div>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Здесь будут отображаться люди, которых вы добавите в друзья
            </p>
            <button onClick={() => setTab("find")} className="vk-pill mt-2">
              Найти друзей
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-1 mb-1 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" /> Возможные друзья
            </div>
            {filtered.length === 0 ? (
              <div className="text-sm text-muted-foreground py-10 text-center">
                Никого не найдено
              </div>
            ) : (
              filtered.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                >
                  <Link to={`/profile/${s.id}`} className="shrink-0">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${s.id}`}
                      className="text-sm font-medium hover:underline truncate block"
                    >
                      {s.name}
                    </Link>
                    <div className="text-xs text-muted-foreground truncate">
                      {s.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => toggle(s.id)}
                    className={`vk-pill rounded-lg px-4 ${
                      sent.has(s.id) ? "!bg-secondary" : ""
                    }`}
                  >
                    {sent.has(s.id) ? "Заявка отправлена" : "Добавить"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Friends;
