import { useMemo, useState, type ReactNode } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { AlertCircle, UserPlus, Heart, MessageSquare, Share2, Gift, AtSign, Users as UsersIcon, MoreHorizontal, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/context/NotificationsContext";
import { useAccounts, getInitials } from "@/context/AccountsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

type SectionKey =
  | "profile"
  | "groups"
  | "feedback"
  | "friends"
  | "services"
  | "communication"
  | "account";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "profile", label: "Уведомления профиля" },
  { key: "groups", label: "Сообщества" },
  { key: "feedback", label: "Обратная связь" },
  { key: "friends", label: "Друзья" },
  { key: "services", label: "Сервисы" },
  { key: "communication", label: "Общение" },
  { key: "account", label: "Аккаунт" },
];

type Item = {
  id: string;
  icon: ReactNode;
  iconBg: string;
  title: ReactNode;
  time: string;
  actions?: ReactNode;
};

const PROFILE_ITEMS: Item[] = [
  {
    id: "protect",
    icon: <AlertCircle className="h-5 w-5 text-white" />,
    iconBg: "hsl(28 95% 55%)",
    title: (
      <>
        <span className="font-semibold">Защитите свой аккаунт.</span> Соблюдайте простые правила,
        и ваши данные будут в безопасности.
      </>
    ),
    time: "5 мин назад",
    actions: (
      <div className="mt-3 flex items-center gap-3">
        <button className="vk-pill rounded-lg px-4 !py-1.5 text-sm">Защитить аккаунт</button>
        <button className="text-sm font-medium text-primary hover:underline">Подробности</button>
      </div>
    ),
  },
];

const FRIENDS_ITEMS: Item[] = [
  {
    id: "f1",
    icon: <img src={avatar2} className="h-full w-full rounded-full object-cover" alt="" />,
    iconBg: "transparent",
    title: (
      <>
        <span className="font-semibold">Анна Соколова</span> подписалась на вас
      </>
    ),
    time: "1 ч назад",
    actions: (
      <button className="vk-pill mt-3 rounded-lg px-4 !py-1.5 text-sm">Подписаться в ответ</button>
    ),
  },
  {
    id: "f2",
    icon: <img src={avatar3} className="h-full w-full rounded-full object-cover" alt="" />,
    iconBg: "transparent",
    title: (
      <>
        <span className="font-semibold">Игорь Лебедев</span> хочет добавить вас в друзья
      </>
    ),
    time: "3 ч назад",
    actions: (
      <div className="mt-3 flex gap-2">
        <button className="vk-pill rounded-lg px-4 !py-1.5 text-sm">Принять</button>
        <button className="vk-pill rounded-lg px-4 !py-1.5 text-sm">Отклонить</button>
      </div>
    ),
  },
];

const FEEDBACK_ITEMS: Item[] = [
  {
    id: "fb1",
    icon: <Heart className="h-5 w-5 text-white" />,
    iconBg: "hsl(345 80% 60%)",
    title: (
      <>
        <span className="font-semibold">Елена Волкова</span> и ещё 12 человек оценили ваш пост
      </>
    ),
    time: "2 ч назад",
  },
  {
    id: "fb2",
    icon: <MessageSquare className="h-5 w-5 text-white" />,
    iconBg: "hsl(140 60% 45%)",
    title: (
      <>
        <span className="font-semibold">Дмитрий Орлов</span> прокомментировал вашу запись:
        «Отличный кадр!»
      </>
    ),
    time: "вчера",
  },
  {
    id: "fb3",
    icon: <Share2 className="h-5 w-5 text-white" />,
    iconBg: "hsl(210 90% 55%)",
    title: (
      <>
        <span className="font-semibold">Mark Roberts</span> поделился вашей записью
      </>
    ),
    time: "2 д назад",
  },
];

const GROUPS_ITEMS: Item[] = [
  {
    id: "g1",
    icon: <UsersIcon className="h-5 w-5 text-white" />,
    iconBg: "hsl(265 70% 55%)",
    title: (
      <>
        Сообщество <span className="font-semibold">Design Weekly</span> опубликовало новую запись
      </>
    ),
    time: "30 мин назад",
  },
];

const SERVICES_ITEMS: Item[] = [
  {
    id: "s1",
    icon: <Gift className="h-5 w-5 text-white" />,
    iconBg: "hsl(200 80% 55%)",
    title: <>Доступна новая подборка стикеров — посмотрите коллекцию</>,
    time: "сегодня",
  },
];

const COMMUNICATION_ITEMS: Item[] = [
  {
    id: "c1",
    icon: <img src={avatar4} className="h-full w-full rounded-full object-cover" alt="" />,
    iconBg: "transparent",
    title: (
      <>
        <span className="font-semibold">Елена Волкова</span> упомянула вас в чате «Друзья»
      </>
    ),
    time: "45 мин назад",
  },
  {
    id: "c2",
    icon: <AtSign className="h-5 w-5 text-white" />,
    iconBg: "hsl(165 70% 45%)",
    title: <>У вас 3 непрочитанных сообщения в личных чатах</>,
    time: "1 ч назад",
  },
];

const ACCOUNT_ITEMS: Item[] = [
  {
    id: "a1",
    icon: <AlertCircle className="h-5 w-5 text-white" />,
    iconBg: "hsl(28 95% 55%)",
    title: <>Был выполнен вход с нового устройства — Chrome, macOS</>,
    time: "вчера",
    actions: (
      <button className="text-sm font-medium text-primary hover:underline mt-2 inline-block">
        Это был я
      </button>
    ),
  },
];

const ITEMS: Record<SectionKey, Item[]> = {
  profile: PROFILE_ITEMS,
  groups: GROUPS_ITEMS,
  feedback: FEEDBACK_ITEMS,
  friends: FRIENDS_ITEMS,
  services: SERVICES_ITEMS,
  communication: COMMUNICATION_ITEMS,
  account: ACCOUNT_ITEMS,
};

const Notifications = () => {
  const [section, setSection] = useState<SectionKey>("profile");
  const current = SECTIONS.find((s) => s.key === section)!;
  const items = ITEMS[section];
  const { isRead, toggleRead, markRead, markUnread } = useNotifications();
  const unreadIds = items.filter((it) => !isRead(it.id)).map((it) => it.id);

  return (
    <AppLayout
      variant="wide"
      right={
        <div className="vk-card p-2">
          {SECTIONS.map((s) => {
            const sectionItems = ITEMS[s.key];
            const unread = sectionItems.filter((it) => !isRead(it.id)).length;
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                  section === s.key
                    ? "bg-secondary font-semibold text-foreground"
                    : "text-foreground/85 hover:bg-secondary/60",
                )}
              >
                <span>{s.label}</span>
                {unread > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      }
    >
      <section className="vk-card overflow-hidden rounded-xl">
        <header className="flex items-center justify-between px-5 py-4">
          <h1 className="text-lg font-semibold">Уведомления</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => unreadIds.forEach((id) => markRead(id))}
              disabled={unreadIds.length === 0}
              className="text-sm font-medium text-primary hover:underline disabled:opacity-50 disabled:no-underline"
            >
              Прочитать все
            </button>
            <Link
              to="/settings"
              className="text-sm font-medium text-primary hover:underline"
            >
              Настройки
            </Link>
          </div>
        </header>

        <div className="px-5 pb-2 text-[11px] font-bold tracking-wider text-muted-foreground">
          {current.label.toUpperCase()}
        </div>

        <ul className="px-2 pb-3">
          {items.map((it) => {
            const read = isRead(it.id);
            return (
              <li
                key={it.id}
                className={cn(
                  "group relative flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary/40",
                  !read && "bg-primary/5",
                )}
              >
                {!read && (
                  <span className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full overflow-hidden"
                  style={{ background: it.iconBg }}
                >
                  {it.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-snug text-foreground/95">{it.title}</p>
                    <div className="flex shrink-0 items-center gap-1">
                      <span className="text-xs text-muted-foreground">{it.time}</span>
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
                            <DropdownMenuItem onClick={() => markUnread(it.id)} className="gap-2">
                              <Check className="h-4 w-4" />
                              Отметить как непрочитанное
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => markRead(it.id)} className="gap-2">
                              <CheckCheck className="h-4 w-4" />
                              Отметить как прочитанное
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {it.actions}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border/60 px-5 py-5 text-center text-sm text-muted-foreground">
          Показаны последние новости
        </div>
      </section>
    </AppLayout>
  );
};

export default Notifications;
