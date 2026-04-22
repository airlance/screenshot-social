import { AppLayout } from "@/components/layout/AppLayout";
import { SkipBack, Play, SkipForward, Shuffle, Repeat, Plus, ThumbsDown, Sparkles, Type, Volume2, Radio, Share2, Search, Download, ListMusic, Upload } from "lucide-react";

const playlists = [
  { title: "Для вас", subtitle: "обновлён сегодня", gradient: "var(--gradient-music-1)" },
  { title: "Открытия", subtitle: "Новое для вас", gradient: "var(--gradient-music-2)" },
  { title: "Новинки", subtitle: "обновлён в субботу", gradient: "var(--gradient-music-3)" },
  { title: "Плейлист дня", subtitle: "Вы слушали: MXEEN", gradient: "var(--gradient-music-4)" },
];

const tabs = ["Главная", "Моя музыка", "Обзор", "Радио", "Обновления"];

const Music = () => (
  <AppLayout>
    <div className="vk-card p-3 flex items-center gap-2">
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><SkipBack className="w-4 h-4 fill-current" /></button>
      <button className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center"><Play className="w-3.5 h-3.5 fill-current ml-0.5" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><SkipForward className="w-4 h-4 fill-current" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Shuffle className="w-4 h-4" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Repeat className="w-4 h-4" /></button>
      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-purple-600 ml-2 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">Cheri Cheri Lady</div>
        <div className="text-xs text-muted-foreground truncate">DJ JEDY, Niki Four</div>
        <div className="h-0.5 bg-secondary mt-1.5 rounded-full overflow-hidden"><div className="h-full w-1/3 bg-foreground rounded-full" /></div>
      </div>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Plus className="w-4 h-4" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><ThumbsDown className="w-4 h-4" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Sparkles className="w-4 h-4" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Type className="w-4 h-4" /></button>
      <span className="text-xs text-muted-foreground px-2">0:27</span>
      <Volume2 className="w-4 h-4 text-muted-foreground" />
      <div className="w-20 h-0.5 bg-secondary rounded-full"><div className="h-full w-3/4 bg-foreground rounded-full" /></div>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Radio className="w-4 h-4" /></button>
      <button className="w-9 h-9 flex items-center justify-center text-muted-foreground"><Share2 className="w-4 h-4" /></button>
    </div>

    <div className="vk-card p-4">
      <div className="flex items-center gap-1 mb-4">
        {tabs.map((t, i) => (
          <button key={t} className={`px-4 py-1.5 rounded-full text-sm ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>{t}</button>
        ))}
        <div className="ml-auto flex gap-1 text-muted-foreground">
          <Download className="w-4 h-4" /><ListMusic className="w-4 h-4" /><Upload className="w-4 h-4" />
        </div>
      </div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="w-full h-10 pl-9 pr-3 rounded-lg bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none" placeholder="Поиск музыки" />
      </div>
      <div className="flex flex-col items-center py-12 gap-3">
        <button className="w-14 h-14 rounded-full border-2 border-foreground/40 flex items-center justify-center hover:border-foreground transition-colors">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
        <div className="font-semibold">Слушать VK Микс</div>
        <div className="text-xs text-muted-foreground">Музыкальные рекомендации для вас</div>
      </div>
    </div>

    <div className="vk-card p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Собрано алгоритмами</span>
        <button className="text-xs text-primary hover:underline">Настроить рекомендации ›</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {playlists.map((p) => (
          <div key={p.title} className="aspect-square rounded-2xl p-4 flex flex-col justify-between text-foreground relative overflow-hidden" style={{ background: p.gradient }}>
            <div>
              <div className="font-bold text-lg leading-tight">{p.title}</div>
              <div className="text-xs opacity-90 mt-1">{p.subtitle}</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
              <ListMusic className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="vk-card p-4">
      <div className="font-semibold">Жанры</div>
    </div>
  </AppLayout>
);

export default Music;
