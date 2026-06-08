import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Search as SearchIcon, User, UsersRound, Newspaper, Music, Video, RefreshCw } from "lucide-react";
import { SEARCH_INDEX, SearchEntry } from "@/lib/searchIndex";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/StateView";

const ICONS: Record<SearchEntry["type"], any> = {
  people: User,
  group: UsersRound,
  post: Newspaper,
  music: Music,
  video: Video,
};

const LABELS: Record<SearchEntry["type"], string> = {
  people: "Люди",
  group: "Сообщества",
  post: "Записи",
  music: "Музыка",
  video: "Видео",
};

const Search = () => {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const groups = useMemo(() => {
    const lower = q.toLowerCase();
    const filtered = lower.length >= 2
      ? SEARCH_INDEX.filter((e) => e.title.toLowerCase().includes(lower) || e.subtitle?.toLowerCase().includes(lower))
      : [];
    return filtered.reduce<Record<string, SearchEntry[]>>((acc, e) => {
      (acc[e.type] ||= []).push(e);
      return acc;
    }, {});
  }, [q]);

  const total = Object.values(groups).reduce((s, a) => s + a.length, 0);

  return (
    <AppLayout>
      <div className="vk-card p-5">
        <h1 className="text-xl font-semibold mb-1">Поиск</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {q ? <>Результаты по запросу «{q}» — найдено {total}</> : "Введите запрос в строке поиска"}
        </p>

        {q && total === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            <SearchIcon className="mx-auto mb-2 h-6 w-6" />
            Ничего не найдено
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(groups).map(([type, items]) => {
            const Icon = ICONS[type as SearchEntry["type"]];
            return (
              <section key={type}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {LABELS[type as SearchEntry["type"]]}
                </div>
                <div className="divide-y divide-border rounded-lg border border-border">
                  {items.map((it) => (
                    <Link
                      to={it.href}
                      key={it.id}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                        <Icon className="h-4 w-4 text-foreground/70" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{it.title}</div>
                        {it.subtitle && <div className="truncate text-xs text-muted-foreground">{it.subtitle}</div>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
