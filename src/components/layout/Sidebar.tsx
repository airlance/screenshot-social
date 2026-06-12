import { NavLink } from "react-router-dom";
import {
  User, Newspaper, MessageCircle, Phone, Users, UsersRound,
  Image as ImageIcon, Music, Video, Film, Gamepad2, Smile, ShoppingBag,
  LayoutGrid, Mic, Bookmark, HelpCircle,
} from "lucide-react";

const main = [
  { to: "/", label: "Профиль", icon: User },
  { to: "/feed", label: "Лента", icon: Newspaper },
  { to: "/messenger", label: "Мессенджер", icon: MessageCircle },
  { to: "/calls", label: "Звонки", icon: Phone },
  { to: "/friends", label: "Друзья", icon: Users },
  { to: "/groups", label: "Сообщества", icon: UsersRound },
  { to: "/photos", label: "Фото", icon: ImageIcon },
  { to: "/music", label: "Музыка", icon: Music },
  { to: "/video", label: "Видео", icon: Video },
  { to: "/clips", label: "Клипы", icon: Film },
  { to: "/games", label: "Игры", icon: Gamepad2, dot: true },
  { to: "/stickers", label: "Стикеры", icon: Smile },
  { to: "/market", label: "Маркет", icon: ShoppingBag },
];

const services = [
  { to: "/services", label: "Сервисы", icon: LayoutGrid },
  { to: "/voices", label: "Голоса", icon: Mic },
];

const bottom = [
  { to: "/bookmarks", label: "Закладки", icon: Bookmark },
  { to: "/help", label: "Помощь", icon: HelpCircle },
];

const Item = ({ to, label, icon: Icon, dot }: { to: string; label: string; icon: any; dot?: boolean }) => (
  <NavLink to={to} end className={({ isActive }) => `vk-nav-item ${isActive ? "active" : ""}`}>
    <span className="relative">
      <Icon className="w-5 h-5 text-foreground/70" strokeWidth={1.75} />
      {dot && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-destructive" />}
    </span>
    <span>{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[232px] shrink-0 py-3 pr-2 sticky top-[60px] self-start max-h-[calc(100vh-60px)] overflow-y-auto">
      <nav className="flex flex-col gap-0.5">
        {main.map((i) => <Item key={i.to} {...i} />)}
      </nav>
      <div className="my-3 border-t border-sidebar-border" />
      <nav className="flex flex-col gap-0.5">
        {services.map((i) => <Item key={i.to} {...i} />)}
      </nav>
      <div className="my-3 border-t border-sidebar-border" />
      <nav className="flex flex-col gap-0.5">
        {bottom.map((i) => <Item key={i.to} {...i} />)}
      </nav>

      <div className="mt-4 px-3 pb-4 flex gap-3 text-[11px] text-muted-foreground">
        <a href="#" className="hover:text-foreground">Блог</a>
        <a href="#" className="hover:text-foreground">Разработчикам</a>
      </div>
    </aside>
  );
};
