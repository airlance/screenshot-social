import { AppLayout } from "@/components/layout/AppLayout";
import { Search, Menu, ShoppingCart, MapPin, Shirt, Home, Sparkles, Baby, Monitor, Dumbbell, Wrench, Palette, Car, Bookmark } from "lucide-react";

const cats = [
  { label: "Гардероб", icon: Shirt, color: "text-emerald-400" },
  { label: "Дом и дача", icon: Home, color: "text-blue-400" },
  { label: "Красота", icon: Sparkles, color: "text-pink-400" },
  { label: "Для детей", icon: Baby, color: "text-orange-400" },
  { label: "Электроника", icon: Monitor, color: "text-purple-400" },
  { label: "Спорт и отдых", icon: Dumbbell, color: "text-red-400" },
  { label: "Для ремонта", icon: Wrench, color: "text-green-400" },
  { label: "Хобби", icon: Palette, color: "text-yellow-400" },
  { label: "Транспорт", icon: Car, color: "text-sky-400" },
];

const items = [
  { title: "«Красное»", price: "5 500 ₽", old: "6 000 ₽", seller: "Калашникова Юлия | kalashyuly...", grad: "from-slate-300 to-slate-500" },
  { title: 'Парные браслеты "СудьБа"', price: "555 ₽", old: "650 ₽", seller: "обитель лесного эльфа", grad: "from-cyan-400 to-blue-600" },
  { title: "Халат", price: "1 471 ₽", old: "1 605 ₽", rating: "4,9", reviews: "481 отзыв", ozon: true, grad: "from-amber-700 to-amber-900" },
  { title: "Подсвечники", price: "1 500 ₽", seller: "Александровская Мастерская", grad: "from-stone-500 to-stone-700" },
  { title: "Спортивный костюм", price: "2 199 ₽", seller: "Магазин одежды", grad: "from-zinc-700 to-zinc-900" },
  { title: "Декор", price: "890 ₽", seller: "ОZON", ozon: true, grad: "from-emerald-700 to-emerald-900" },
  { title: "Блеск для губ", price: "499 ₽", seller: "Красота и уход", ozon: true, grad: "from-rose-400 to-pink-600" },
  { title: "Кварцит малиновый", price: "1 200 ₽", seller: "Карельский камень", ozon: true, grad: "from-red-700 to-rose-900" },
];

const Market = () => (
  <AppLayout>
    <div className="vk-card flex items-center gap-3 p-3">
      <button className="vk-pill flex items-center gap-2"><Menu className="w-4 h-4" /> Каталог</button>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="w-full h-9 pl-9 pr-3 rounded-lg bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none" placeholder="Поиск в Маркете" />
      </div>
      <button className="vk-pill flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Корзина</button>
    </div>

    <div className="vk-card p-4">
      <div className="grid grid-cols-9 gap-2">
        {cats.map(({ label, icon: Icon, color }) => (
          <button key={label} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-secondary group-hover:bg-accent transition-colors flex items-center justify-center">
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <span className="text-[11px] text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="vk-card p-3 flex items-center gap-2">
      <button className="vk-pill bg-secondary">Все товары</button>
      <button className="vk-pill bg-transparent text-muted-foreground">Заказы</button>
      <button className="vk-pill bg-transparent text-muted-foreground">Закладки</button>
      <button className="vk-pill bg-transparent text-muted-foreground">Отзывы</button>
      <button className="ml-auto vk-pill bg-transparent flex items-center gap-1 text-muted-foreground">
        <MapPin className="w-3.5 h-3.5" /> Bucureşti
      </button>
    </div>

    <div className="vk-card p-4">
      <div className="font-semibold mb-4">Может заинтересовать</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.title} className="group">
            <div className={`relative aspect-square rounded-xl bg-gradient-to-br ${it.grad} overflow-hidden`}>
              {it.ozon && <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary px-2 py-0.5 rounded text-primary-foreground">ЗАКАЗ НА OZON</span>}
              <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 px-1">
              <div className="text-sm font-semibold flex items-baseline gap-2">
                {it.price} {it.old && <span className="text-xs text-muted-foreground line-through">{it.old}</span>}
              </div>
              <div className="text-xs truncate mt-0.5">{it.title}</div>
              {it.rating && <div className="text-[11px] text-muted-foreground mt-0.5">★ {it.rating} · {it.reviews}</div>}
              <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{it.seller}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default Market;
