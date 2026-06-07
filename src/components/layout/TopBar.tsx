import { Search, Bell, ChevronDown, HelpCircle, LogOut, Plus, QrCode, Settings, Wallet, Palette, AlertCircle, MoreHorizontal, Check, CheckCheck, Trash2, CheckCircle2, Users, User as UserIcon, UsersRound, Newspaper, Music, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import { PlayerPopover } from "@/components/player/PlayerPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotifications } from "@/context/NotificationsContext";
import { useAccounts, getInitials } from "@/context/AccountsContext";
import { SEARCH_INDEX, SearchEntry } from "@/lib/searchIndex";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<SearchEntry["type"], any> = {
  people: UserIcon, group: UsersRound, post: Newspaper, music: Music, video: Video,
};

const POPUP_ITEMS = [
  {
    id: "protect",
    title: (
      <>
        <span className="font-semibold">Защитите свой аккаунт.</span> Соблюдайте простые правила, и ваши данные будут в безопасности.
      </>
    ),
    time: "5 мин назад",
    iconBg: "hsl(28 95% 55%)",
  },
  {
    id: "f1",
    title: (
      <>
        <span className="font-semibold">Анна Соколова</span> подписалась на вас
      </>
    ),
    time: "1 ч назад",
    iconBg: "hsl(210 90% 55%)",
  },
];

export const TopBar = () => {
  const { isRead, markRead, markUnread } = useNotifications();
  const { accounts, activeId, activeAccount, switchAccount, removeAccount } = useAccounts();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const popupItems = POPUP_ITEMS.map((i) => ({ ...i, id: `${activeAccount.id}:${i.id}` }));
  const unreadCount = popupItems.filter((i) => !isRead(i.id)).length;

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX
      .filter((e) => e.title.toLowerCase().includes(q) || e.subtitle?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setOpenSearch(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submitSearch = (q: string) => {
    const value = q.trim();
    if (!value) return;
    setOpenSearch(false);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-40 h-[60px] bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1280px] mx-auto h-full px-4 flex items-center gap-4">
        <Link to="/feed" className="flex items-center gap-2 shrink-0 w-[200px]">
          <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            VK
          </span>
          <span className="font-semibold text-[15px] tracking-tight">ВКонтакте</span>
        </Link>

        <div ref={searchRef} className="flex-1 max-w-[420px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpenSearch(true); }}
            onFocus={() => setOpenSearch(true)}
            onKeyDown={(e) => { if (e.key === "Enter") submitSearch(query); }}
            className="w-full h-10 pl-9 pr-3 rounded-full bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {openSearch && query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden">
              {suggestions.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">Ничего не найдено</div>
              ) : (
                <div className="py-1 max-h-[360px] overflow-y-auto">
                  {suggestions.map((s) => {
                    const Icon = TYPE_ICONS[s.type];
                    return (
                      <button
                        key={s.id}
                        onClick={() => submitSearch(s.title)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-secondary/60"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary shrink-0">
                          <Icon className="h-4 w-4 text-foreground/70" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm">{s.title}</div>
                          {s.subtitle && <div className="truncate text-xs text-muted-foreground">{s.subtitle}</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                onClick={() => submitSearch(query)}
                className="block w-full border-t border-border py-2.5 text-center text-sm font-medium text-primary hover:bg-secondary/50"
              >
                Показать все результаты
              </button>
            </div>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="relative w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-foreground/80" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={10}
            className="w-[420px] rounded-xl border-border bg-popover p-0 shadow-elevated"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm font-semibold">Уведомления</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => popupItems.forEach((i) => !isRead(i.id) && markRead(i.id))}
                  disabled={unreadCount === 0}
                  className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-secondary disabled:opacity-50"
                >
                  Прочитать все
                </button>
                <Link to="/settings" className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-accent">
                  Настройки
                </Link>
              </div>
            </div>
            <div className="px-2 pb-2">
              {popupItems.map((item) => {
                const read = isRead(item.id);
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "group relative flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary/40",
                      !read && "bg-primary/5",
                    )}
                  >
                    {!read && (
                      <span className="absolute left-0.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: item.iconBg }}>
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm leading-snug">{item.title}</p>
                        <div className="flex shrink-0 items-center gap-1">
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100 data-[state=open]:opacity-100"
                                aria-label="Действия"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              {read ? (
                                <DropdownMenuItem onClick={() => markUnread(item.id)} className="gap-2">
                                  <Check className="h-4 w-4" />
                                  Отметить как непрочитанное
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => markRead(item.id)} className="gap-2">
                                  <CheckCheck className="h-4 w-4" />
                                  Отметить как прочитанное
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/notifications" className="block border-t border-border py-3.5 text-center text-sm font-medium hover:bg-secondary/50">
              Показать все
            </Link>
          </PopoverContent>
        </Popover>

        <PlayerPopover />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-auto flex items-center gap-1.5 hover:bg-secondary/60 rounded-full pl-1 pr-2 py-1 transition-colors">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{ background: activeAccount.avatarColor }}
                >
                  {getInitials(activeAccount.name)}
                </div>
                {activeAccount.hasNotifications && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive border-2 border-background" />
                )}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="w-[300px] rounded-xl border-border bg-popover p-0 shadow-elevated">
            <div className="flex flex-col items-center px-4 py-5 text-center">
              <div className="relative mb-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold ring-2 ring-primary"
                  style={{ background: activeAccount.avatarColor }}
                >
                  {getInitials(activeAccount.name)}
                </div>
                {activeAccount.hasNotifications && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-destructive border-2 border-popover" />
                )}
              </div>
              <div className="font-semibold">{activeAccount.name}</div>
              <div className="text-xs text-muted-foreground">{activeAccount.username}</div>
              <button className="vk-pill mt-4 w-full rounded-lg !py-1.5">Управление аккаунтом <span className="ml-1 rounded bg-primary px-1 text-[10px] text-primary-foreground">ID</span></button>
            </div>

            {accounts.length > 1 && (
              <div className="mx-2 mb-2 rounded-lg bg-secondary/40 p-1">
                <div className="px-2 pt-1.5 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Ваши аккаунты
                </div>
                {accounts.map((acc) => {
                  const isActive = acc.id === activeId;
                  return (
                    <div
                      key={acc.id}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-md px-2 py-2 cursor-pointer hover:bg-background",
                        isActive && "bg-background",
                      )}
                      onClick={() => !isActive && switchAccount(acc.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                        style={{ background: acc.avatarColor }}
                      >
                        {getInitials(acc.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{acc.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{acc.username}</div>
                      </div>
                      {isActive ? (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAccount(acc.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 rounded p-1 text-muted-foreground hover:text-destructive hover:bg-secondary"
                          aria-label="Удалить аккаунт"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mx-3 mb-3 rounded-lg bg-primary p-3 text-primary-foreground">
              <div className="text-sm font-bold">VK ID × @mail</div>
              <div className="mt-2 text-xs font-semibold leading-snug">Входите во все сервисы Mail в один клик</div>
            </div>
            <div className="px-2 pb-2">
              <DropdownMenuItem asChild className="gap-3 py-2.5"><Link to="/accounts"><Users className="w-4 h-4 text-primary" />Мои аккаунты</Link></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><Wallet className="w-4 h-4 text-primary" />Голоса <span className="ml-auto text-muted-foreground">0</span></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><QrCode className="w-4 h-4 text-primary" />Вход по QR-коду</DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-3 py-2.5"><Link to="/settings"><Settings className="w-4 h-4 text-primary" />Настройки</Link></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><Palette className="w-4 h-4 text-primary" />Тема: <span className="text-primary">Системная</span></DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><HelpCircle className="w-4 h-4 text-primary" />Помощь</DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5"><LogOut className="w-4 h-4 text-primary" />Выйти</DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="mx-0" />
            <div className="p-2">
              <DropdownMenuItem asChild className="gap-3 py-3 text-primary">
                <Link to="/login">
                  <span className="flex w-9 h-9 items-center justify-center rounded-full bg-secondary"><Plus className="w-5 h-5" /></span>
                  Добавить аккаунт
                </Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    </header>
  );
};
