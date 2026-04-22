import { AppLayout } from "@/components/layout/AppLayout";
import { Search, X, Calendar, BadgeCheck } from "lucide-react";

const recent = [
  { name: "SunShow", color: "from-yellow-400 to-orange-500" },
  { name: "Комбинац...", color: "from-pink-500 to-purple-600" },
];

const recs = [
  { name: "Государственная Тр...", category: "Музей, галерея, выставка", verified: true },
  { name: "Мобильная фотография", category: "Фотография" },
  { name: "Семья, дети и отношен...", category: "Родители и дети" },
  { name: "visualgram", category: "Бизнес", verified: true },
  { name: "Nika.family", category: "Родители и дети", verified: true },
  { name: "ржпг | комиксы", category: "Художник" },
  { name: "Академия Леди", category: "Общество", verified: true },
  { name: "EDISON FAMILY ™", category: "Блогер" },
];

const forYou = [
  { name: "Чижик", subs: "2,2М подписчиков", color: "bg-yellow-500" },
  { name: "Психология и Отн...", subs: "539,5К подписчиков", color: "bg-zinc-700" },
  { name: "Мудрая книга жиз...", subs: "329,1К подписчиков", color: "bg-rose-200" },
];

const Groups = () => (
  <AppLayout
    right={
      <>
        <button className="vk-pill w-full !bg-secondary !py-3">Создать сообщество</button>
        <div className="vk-card p-2">
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-secondary">Главная</button>
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 mt-1">
            Мероприятия <Calendar className="w-4 h-4" />
          </button>
        </div>
      </>
    }
  >
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input className="w-full h-12 pl-11 pr-3 rounded-2xl bg-card text-sm placeholder:text-muted-foreground focus:outline-none" placeholder="Поиск сообществ" />
    </div>

    <div className="vk-card p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Недавно посещали</span>
        <button className="text-muted-foreground"><X className="w-4 h-4" /></button>
      </div>
      <div className="flex gap-4">
        {recent.map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${r.color}`} />
            <span className="text-xs">{r.name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="vk-card p-4">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-semibold">Рекомендации</span>
        <span className="text-sm text-muted-foreground">163</span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {recs.map((r) => (
          <div key={r.name} className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-medium flex items-center gap-1 truncate">
                {r.name} {r.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary text-background shrink-0" />}
              </div>
              <div className="text-xs text-muted-foreground truncate">{r.category}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full text-center text-sm text-primary hover:underline mt-4">Показать все ›</button>
    </div>

    <div className="vk-card p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Для вас</span>
        <button className="text-sm text-primary hover:underline">Показать все</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {forYou.map((f) => (
          <div key={f.name} className={`aspect-square rounded-2xl ${f.color} relative overflow-hidden`}>
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-[10px] font-semibold bg-background/60 backdrop-blur px-1.5 py-0.5 rounded">{f.subs}</span>
              <div className="text-sm font-semibold mt-1 text-foreground drop-shadow">{f.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default Groups;
