import { Search, Bell, ChevronDown, HelpCircle, LogOut, Plus, QrCode, Settings, Wallet, Palette, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { PlayerPopover } from "@/components/player/PlayerPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-auto flex items-center gap-1.5 hover:bg-secondary/60 rounded-full pl-1 pr-2 py-1 transition-colors">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">M</div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive border-2 border-background" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="w-[300px] rounded-xl border-border bg-popover p-0 shadow-elevated">
            <div className="flex flex-col items-center px-4 py-5 text-center">
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center ring-2 ring-destructive">
                  <UserRound className="w-9 h-9 text-muted-foreground" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-destructive border-2 border-popover" />
              </div>
              <div className="font-semibold">Mark Roberts</div>
              <div className="text-xs text-muted-foreground">@id648226314</div>
              <button className="vk-pill mt-4 w-full rounded-lg !py-1.5">Управление аккаунтом <span className="ml-1 rounded bg-primary px-1 text-[10px] text-primary-foreground">ID</span></button>
            </div>
            <div className="mx-3 mb-3 rounded-lg bg-primary p-3 text-primary-foreground">
              <div className="text-sm font-bold">VK ID × @mail</div>
              <div className="mt-2 text-xs font-semibold leading-snug">Входите во все сервисы Mail в один клик</div>
            </div>
            <div className="px-2 pb-2">
              <DropdownMenuItem className="gap-3 py-2.5"><Wallet className="w-4 h-4 text-primary" />Голоса <span className="ml-auto text-muted-foreground">0</span></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><QrCode className="w-4 h-4 text-primary" />Вход по QR-коду</DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><Settings className="w-4 h-4 text-primary" />Настройки</DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><Palette className="w-4 h-4 text-primary" />Тема: <span className="text-primary">Системная</span></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><HelpCircle className="w-4 h-4 text-primary" />Помощь</DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><LogOut className="w-4 h-4 text-primary" />Выйти</DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="mx-0" />
            <div className="p-2">
              <DropdownMenuItem className="gap-3 py-3 text-primary"><span className="flex w-9 h-9 items-center justify-center rounded-full bg-secondary"><Plus className="w-5 h-5" /></span>Добавить аккаунт</DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
