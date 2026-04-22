import { SlidersHorizontal, X } from "lucide-react";
import adGame from "@/assets/ad-game.jpg";

export const FeedFilters = () => (
  <div className="vk-card p-2">
    <div className="flex items-center justify-between px-3 py-2">
      <span className="font-semibold text-sm">Лента</span>
      <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
    </div>
    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60">Фотографии</button>
    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60">Друзья</button>
    <div className="my-1 border-t border-border" />
    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary/60">Поиск</button>
    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60">Реакции</button>
  </div>
);

export const GameAdCard = () => (
  <div className="vk-card overflow-hidden relative">
    <button className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/60 backdrop-blur flex items-center justify-center text-foreground/80">
      <X className="w-4 h-4" />
    </button>
    <img src={adGame} alt="game" className="w-full h-40 object-cover" loading="lazy" />
    <div className="p-3">
      <div className="font-semibold text-sm mb-1">Распродажа в «Батл Арене»</div>
      <p className="text-xs text-muted-foreground leading-snug mb-3">
        Успейте купить эпические и легендарные образы до 23 апреля
      </p>
      <button className="w-full h-9 rounded-lg bg-secondary hover:bg-accent text-sm font-medium transition-colors">
        Играть
      </button>
    </div>
  </div>
);
