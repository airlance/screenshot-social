export type SearchEntry = {
  id: string;
  type: "people" | "group" | "post" | "music" | "video";
  title: string;
  subtitle?: string;
  href: string;
};

export const SEARCH_INDEX: SearchEntry[] = [
  { id: "p1", type: "people", title: "Анна Соколова", subtitle: "Москва", href: "/friends" },
  { id: "p2", type: "people", title: "Иван Петров", subtitle: "Санкт-Петербург", href: "/friends" },
  { id: "p3", type: "people", title: "Мария Кузнецова", subtitle: "Казань", href: "/friends" },
  { id: "p4", type: "people", title: "Дмитрий Орлов", subtitle: "Новосибирск", href: "/friends" },
  { id: "g1", type: "group", title: "Лепра", subtitle: "1.2M подписчиков", href: "/groups" },
  { id: "g2", type: "group", title: "MDK", subtitle: "8.5M подписчиков", href: "/groups" },
  { id: "g3", type: "group", title: "Лентач", subtitle: "2.1M подписчиков", href: "/groups" },
  { id: "po1", type: "post", title: "Лучшие места Москвы летом", href: "/feed" },
  { id: "po2", type: "post", title: "Подборка фильмов на выходные", href: "/feed" },
  { id: "m1", type: "music", title: "Земфира — Хочешь", href: "/music" },
  { id: "m2", type: "music", title: "Король и Шут — Лесник", href: "/music" },
  { id: "v1", type: "video", title: "Обзор нового VK", href: "/video" },
  { id: "v2", type: "video", title: "Топ-10 клипов 2026", href: "/clips" },
];
