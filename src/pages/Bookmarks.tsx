import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Bookmark,
  ChevronUp,
  Lock,
  Plus,
} from "lucide-react";

type Category =
  | "Все закладки"
  | "Люди"
  | "Сообщества"
  | "Посты"
  | "Статьи"
  | "Ссылки"
  | "Подкасты"
  | "Видео"
  | "Моменты"
  | "Игры"
  | "Сервисы"
  | "Товары и услуги";

const CATS: Category[] = [
  "Все закладки",
  "Люди",
  "Сообщества",
  "Посты",
  "Статьи",
  "Ссылки",
  "Подкасты",
  "Видео",
  "Моменты",
  "Игры",
  "Сервисы",
  "Товары и услуги",
];

const TAGS = ["Прочитать позже", "Важное"];

const Bookmarks = () => {
  const [active, setActive] = useState<Category>("Все закладки");
  const [tagsOpen, setTagsOpen] = useState(true);

  return (
    <AppLayout
      variant="wide"
      right={
        <div className="vk-card p-2 flex flex-col gap-0.5">
          {CATS.slice(0, 3).map((c) => (
            <CatItem key={c} label={c} active={active === c} onClick={() => setActive(c)} />
          ))}
          <Divider />
          {CATS.slice(3, 9).map((c) => (
            <CatItem key={c} label={c} active={active === c} onClick={() => setActive(c)} />
          ))}
          <Divider />
          {CATS.slice(9).map((c) => (
            <CatItem key={c} label={c} active={active === c} onClick={() => setActive(c)} />
          ))}

          <Divider />
          <button
            onClick={() => setTagsOpen((v) => !v)}
            className="flex items-center justify-between px-3 h-10 rounded-xl hover:bg-secondary/60 text-sm"
          >
            <span>Метки</span>
            <ChevronUp className={`w-4 h-4 transition-transform ${tagsOpen ? "" : "rotate-180"}`} />
          </button>
          {tagsOpen && (
            <div className="flex flex-col gap-0.5">
              {TAGS.map((t) => (
                <button
                  key={t}
                  className="text-left px-3 h-10 rounded-xl hover:bg-secondary/60 text-sm text-muted-foreground"
                >
                  {t}
                </button>
              ))}
              <button className="mt-1 mx-2 h-10 rounded-xl bg-secondary hover:bg-secondary/80 text-sm font-medium">
                Создать новую метку
              </button>
            </div>
          )}

          <Divider />
          <div className="px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            Закладки видны только вам
          </div>
        </div>
      }
    >
      <div className="vk-card min-h-[420px] flex items-center justify-center p-10">
        <div className="text-center max-w-sm flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center">
            <Bookmark className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Добавляйте в закладки интересные материалы — нажмите на знак звёздочки или
            выберите пункт «Сохранить в закладках» в меню поста
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

const CatItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`text-left px-3 h-10 rounded-xl text-sm transition-colors ${
      active ? "bg-secondary text-foreground" : "hover:bg-secondary/60 text-foreground/90"
    }`}
  >
    {label}
  </button>
);

const Divider = () => <div className="my-1.5 h-px bg-border/60" />;

export default Bookmarks;
