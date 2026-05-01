export type CallStatus = "active" | "scheduled" | "history" | "missed";

export type CallItem = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  date: string;
  time: string;
  status: CallStatus;
  kind?: "audio" | "video" | "group";
};

const MOCK_CALLS: CallItem[] = [
  {
    id: "a-1",
    title: "Команда дизайна",
    subtitle: "Активный · 4 участника",
    duration: "12:04",
    date: "Сегодня",
    time: "14:22",
    status: "active",
    kind: "group",
  },
  {
    id: "s-1",
    title: "Планёрка по проекту",
    subtitle: "Запланирован · завтра 10:00",
    duration: "—",
    date: "02.05.2026",
    time: "10:00",
    status: "scheduled",
    kind: "video",
  },
  {
    id: "s-2",
    title: "Звонок с Анной",
    subtitle: "Запланирован · пятница 18:30",
    duration: "—",
    date: "08.05.2026",
    time: "18:30",
    status: "scheduled",
    kind: "audio",
  },
  {
    id: "g-1",
    title: "Групповой звонок 27.04.2026",
    subtitle: "Групповой · 11:47",
    duration: "0:29",
    date: "27.04.2026",
    time: "11:47",
    status: "history",
    kind: "group",
  },
  {
    id: "g-2",
    title: "Иван Петров",
    subtitle: "Исходящий · 09:12",
    duration: "5:41",
    date: "26.04.2026",
    time: "09:12",
    status: "history",
    kind: "audio",
  },
  {
    id: "g-3",
    title: "Мария Соколова",
    subtitle: "Входящий · 21:03",
    duration: "18:22",
    date: "25.04.2026",
    time: "21:03",
    status: "history",
    kind: "video",
  },
  {
    id: "m-1",
    title: "Алексей Лебедев",
    subtitle: "Пропущенный · 08:45",
    duration: "—",
    date: "27.04.2026",
    time: "08:45",
    status: "missed",
    kind: "audio",
  },
  {
    id: "m-2",
    title: "Команда продукта",
    subtitle: "Пропущенный групповой",
    duration: "—",
    date: "26.04.2026",
    time: "16:10",
    status: "missed",
    kind: "group",
  },
];

export const fetchCalls = (): Promise<CallItem[]> =>
  new Promise((resolve) => setTimeout(() => resolve([...MOCK_CALLS]), 350));
