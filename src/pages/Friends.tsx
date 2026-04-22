import { AppLayout } from "@/components/layout/AppLayout";
import { Search, UserPlus, SlidersHorizontal, Calendar } from "lucide-react";

const Friends = () => (
  <AppLayout
    right={
      <div className="vk-card p-2">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/60">
          Мои друзья <Calendar className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-secondary mt-1">Поиск друзей</button>
      </div>
    }
  >
    <div className="vk-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <button className="vk-pill bg-secondary">Все друзья <span className="text-muted-foreground ml-1">0</span></button>
        <button className="vk-pill bg-transparent text-muted-foreground">Друзья онлайн <span className="ml-1">0</span></button>
        <button className="vk-pill ml-auto flex items-center gap-2"><UserPlus className="w-4 h-4" /> Найти друзей</button>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="w-full h-10 pl-9 pr-10 rounded-xl bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none" placeholder="Введите запрос" />
        <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <UserPlus className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
        <div className="font-semibold">Находите друзей</div>
        <p className="text-sm text-muted-foreground text-center max-w-xs">Здесь будут отображаться люди, которых вы добавите в друзья</p>
        <button className="vk-pill mt-2">Найти друзей</button>
      </div>
    </div>
  </AppLayout>
);

export default Friends;
