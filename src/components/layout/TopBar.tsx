import { Search, Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { PlayerPopover } from "@/components/player/PlayerPopover";

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-40 h-[60px] bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1280px] mx-auto h-full px-4 flex items-center gap-4">
        <Link to="/feed" className="flex items-center gap-2 shrink-0 w-[200px]">
          <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            VK
          </span>
          <span className="font-semibold text-[15px] tracking-tight">ВКонтакте</span>
        </Link>

        <div className="flex-1 max-w-[420px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск"
            className="w-full h-10 pl-9 pr-3 rounded-full bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <button className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5 text-foreground/80" />
        </button>

        <PlayerPopover />

        <div className="ml-auto flex items-center gap-1.5 cursor-pointer hover:bg-secondary/60 rounded-full pl-1 pr-2 py-1 transition-colors">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">M</div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive border-2 border-background" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};
