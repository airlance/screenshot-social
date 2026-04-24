import { useMemo, useRef, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreatePost } from "@/components/feed/CreatePost";
import {
  AlertCircle,
  BarChart3,
  Camera,
  ChevronDown,
  ChevronRight,
  Crop,
  FileQuestion,
  Image as ImageIcon,
  ListFilter,
  Music,
  PenLine,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
  Trash2,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import photo1 from "@/assets/photo-1.jpg";
import postPhoto1 from "@/assets/post-photo-1.jpg";
import postPhoto2 from "@/assets/post-photo-2.jpg";
import avatarMe from "@/assets/avatar-me.jpg";

const tabs = [
  { label: "Фото", icon: ImageIcon, active: true },
  { label: "Альбомы", icon: ImageIcon },
  { label: "Видео", icon: Video },
  { label: "Клипы", icon: Crop },
  { label: "Музыка", icon: Music },
  { label: "Статьи", icon: ListFilter },
];

type AvatarStep = "upload" | "crop" | "thumb" | "finish";

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [coverMenuOpen, setCoverMenuOpen] = useState(false);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [avatarStep, setAvatarStep] = useState<AvatarStep>("upload");
  const [avatarError, setAvatarError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profilePhotos = useMemo(() => [photo1, postPhoto1, postPhoto2], []);

  const openAvatarUpload = () => {
    setAvatarMenuOpen(false);
    setAvatarError(false);
    setAvatarStep("upload");
    setAvatarDialogOpen(true);
  };

  const handlePickFile = () => {
    if (!avatarError) {
      setAvatarError(true);
      return;
    }
    setAvatarStep("crop");
  };

  const finishAvatar = () => {
    setAvatar(avatarMe);
    setAvatarDialogOpen(false);
    setAvatarStep("upload");
    setAvatarError(false);
  };

  const renderAvatarDialog = () => {
    const title = avatarStep === "crop" ? "Фотография на вашей странице" : avatarStep === "thumb" ? "Выбор миниатюры" : avatarStep === "finish" ? "Завершение" : "Загрузка новой фотографии";

    return (
      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <DialogContent className="max-w-[640px] overflow-hidden rounded-xl border-border bg-popover p-0 shadow-elevated [&>button]:right-[-54px] [&>button]:top-4 [&>button]:h-8 [&>button]:w-8 [&>button]:rounded-full [&>button]:bg-secondary [&>button]:opacity-100">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-semibold">{title}</DialogTitle>

          {avatarStep === "upload" && (
            <div className="space-y-8 py-9 text-center">
              {avatarError && (
                <div className="mx-auto flex max-w-[548px] items-start gap-3 rounded bg-destructive/30 px-4 py-3 text-left text-destructive-foreground">
                  <AlertCircle className="mt-0.5 h-8 w-8 shrink-0" />
                  <div>
                    <div className="font-semibold">Произошла ошибка</div>
                    <div className="text-sm font-medium">Фотография должна иметь размер не менее 400 точек в ширину и не менее 400 точек в высоту.</div>
                  </div>
                </div>
              )}
              <p className="mx-auto max-w-[520px] text-sm font-semibold leading-relaxed text-foreground/90">
                Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию. Вы можете загрузить изображение в формате JPG, GIF, PNG, WEBP или HEIC/HEIF.
              </p>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
              <button onClick={handlePickFile} className="vk-pill bg-foreground px-5 text-background hover:bg-foreground/90">Выбрать файл</button>
              <div className="border-t border-border px-6 pt-5 text-xs font-semibold text-muted-foreground">Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера.</div>
            </div>
          )}

          {avatarStep === "crop" && (
            <div className="px-6 pb-5 pt-7 text-center">
              <p className="mb-5 text-sm font-semibold leading-relaxed text-foreground/90">Выбранная область будет показываться на вашей странице.<br />Если изображение ориентировано неправильно, фотографию можно повернуть.</p>
              <div className="relative mx-auto aspect-[1.12] max-h-[575px] overflow-hidden rounded-lg bg-[linear-gradient(45deg,hsl(var(--secondary))_25%,transparent_25%),linear-gradient(-45deg,hsl(var(--secondary))_25%,transparent_25%),linear-gradient(45deg,transparent_75%,hsl(var(--secondary))_75%),linear-gradient(-45deg,transparent_75%,hsl(var(--secondary))_75%)] bg-[length:32px_32px] bg-[position:0_0,0_16px,16px_-16px,-16px_0px] p-8">
                <img src={avatarMe} alt="Предпросмотр аватара" className="mx-auto h-full max-h-[520px] object-contain" />
                <div className="absolute inset-x-16 bottom-14 top-14 border-4 border-foreground/80 shadow-[0_0_0_999px_hsl(var(--background)/0.45)]" />
                <div className="absolute bottom-3 right-3 flex gap-1 rounded bg-background/80 p-1">
                  <RotateCcw className="h-5 w-5" /><RotateCw className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-2">
                <button onClick={() => setAvatarStep("thumb")} className="vk-pill bg-foreground text-background hover:bg-foreground/90">Сохранить и продолжить</button>
                <button onClick={() => setAvatarStep("upload")} className="vk-pill">Вернуться назад</button>
              </div>
            </div>
          )}

          {avatarStep === "thumb" && (
            <div className="px-6 pb-8 pt-9 text-center">
              <p className="mb-9 text-sm font-semibold leading-relaxed text-foreground/90">Выберите область для маленьких фотографий.<br />Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.</p>
              <div className="flex items-center justify-center gap-8">
                <div className="relative h-48 w-48 overflow-hidden rounded-lg bg-secondary">
                  <img src={avatarMe} alt="Область миниатюры" className="h-full w-full object-cover" />
                  <div className="absolute inset-4 rounded-full border-4 border-foreground/85 shadow-[0_0_0_999px_hsl(var(--background)/0.3)]" />
                </div>
                <div className="space-y-6">
                  <img src={avatarMe} alt="Большая миниатюра" className="h-20 w-20 rounded-full object-cover" />
                  <img src={avatarMe} alt="Маленькая миниатюра" className="mx-auto h-10 w-10 rounded-full object-cover" />
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-2">
                <button onClick={() => setAvatarStep("finish")} className="vk-pill bg-foreground text-background hover:bg-foreground/90">Сохранить изменения</button>
                <button onClick={() => setAvatarStep("crop")} className="vk-pill">Вернуться назад</button>
              </div>
            </div>
          )}

          {avatarStep === "finish" && (
            <div className="px-6 pb-7 pt-14 text-center">
              <img src={avatarMe} alt="Новый аватар" className="mx-auto mb-8 h-28 w-28 rounded-full object-cover" />
              <div className="mx-auto max-w-[420px] text-2xl font-bold leading-tight">Опубликуйте пост, чтобы получить больше обратной связи от друзей</div>
              <label className="mt-6 inline-flex items-center gap-3 text-sm font-semibold"><input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" /> Опубликовать в посте</label>
              <div className="mt-14 flex justify-center gap-2">
                <button onClick={finishAvatar} className="vk-pill bg-foreground text-background hover:bg-foreground/90">Продолжить</button>
                <button onClick={() => setAvatarStep("thumb")} className="vk-pill">Вернуться назад</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <AppLayout
      variant="wide"
      right={
        <>
          <div className="vk-card flex items-center gap-4 p-5">
            <Music className="h-7 w-7 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold">Добавьте музыку</div>
              <div className="text-sm leading-snug text-muted-foreground">Слушайте треки и альбомы любимых артистов</div>
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-muted-foreground"><X className="h-4 w-4" /></button>
          </div>

          <div className="vk-card p-5">
            <div className="mb-9 font-semibold">Друзья</div>
            <div className="text-center text-sm text-muted-foreground">У вас пока нет друзей</div>
            <button className="vk-pill mt-8 w-full gap-2"><Plus className="h-4 w-4" />Добавить друзей</button>
          </div>
        </>
      }
    >
      <section className="vk-card overflow-hidden rounded-xl">
        <div className="relative h-[228px] bg-[radial-gradient(circle_at_70%_20%,hsl(var(--foreground)/0.05),transparent_24%),linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background)))]">
          <DropdownMenu open={coverMenuOpen} onOpenChange={setCoverMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="vk-pill absolute right-5 top-5 gap-2 bg-background/80 px-4 py-2 text-sm backdrop-blur hover:bg-background/90"><PenLine className="h-4 w-4" />Изменить обложку</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-border bg-popover p-2 shadow-elevated">
              <DropdownMenuItem className="gap-3 py-3"><ImageIcon className="h-4 w-4 text-primary" />Загрузить изображение</DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-3 text-destructive"><Trash2 className="h-4 w-4" />Удалить</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative flex min-h-[96px] items-center gap-4 bg-card px-5 py-4">
          <div className="absolute -top-20 left-5">
            <DropdownMenu open={avatarMenuOpen} onOpenChange={setAvatarMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="relative block rounded-full outline-none">
                  <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-background bg-muted ring-4 ring-background">
                    {avatar ? <img src={avatar} alt="Mark Roberts" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-muted"><div className="h-20 w-20 rounded-full bg-foreground/75 opacity-80 [clip-path:polygon(50%_0,62%_26%,88%_36%,66%_54%,68%_84%,50%_68%,32%_84%,34%_54%,12%_36%,38%_26%)]" /></div>}
                  </div>
                  <span className="absolute bottom-3 right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground"><Plus className="h-4 w-4" strokeWidth={3} /></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10} className="w-52 rounded-xl border-border bg-popover p-2 shadow-elevated">
                <DropdownMenuItem className="gap-3 py-3"><Camera className="h-4 w-4 text-primary" />Новая история</DropdownMenuItem>
                <DropdownMenuItem onClick={openAvatarUpload} className="gap-3 py-3"><ImageIcon className="h-4 w-4 text-primary" />{avatar ? "Открыть фото" : "Загрузить фото"}</DropdownMenuItem>
                {avatar && <DropdownMenuItem onClick={openAvatarUpload} className="gap-3 py-3"><PenLine className="h-4 w-4 text-primary" />Изменить фото</DropdownMenuItem>}
                {avatar && <DropdownMenuItem onClick={openAvatarUpload} className="gap-3 py-3"><Crop className="h-4 w-4 text-primary" />Изменить миниатюру</DropdownMenuItem>}
                {avatar && <DropdownMenuItem className="gap-3 py-3"><Sparkles className="h-4 w-4 text-primary" />Добавить эффекты</DropdownMenuItem>}
                {avatar && <DropdownMenuItem onClick={() => setAvatar(null)} className="gap-3 py-3 text-destructive"><Trash2 className="h-4 w-4" />Удалить фото</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="ml-[172px] min-w-0 flex-1">
            <h1 className="text-2xl font-bold">Mark Roberts</h1>
            <button className="mt-1 flex items-center gap-1 text-sm text-primary hover:underline">Укажите информацию о себе <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button className="vk-pill rounded-lg px-5">Редактировать профиль</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover:bg-accent"><BarChart3 className="h-5 w-5" /></button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="vk-pill gap-2 rounded-lg px-4">Ещё <ChevronDown className="h-4 w-4" /></button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-xl border-border bg-popover p-2 shadow-elevated">
                <DropdownMenuItem className="gap-3 py-3"><FileQuestion className="h-4 w-4 text-primary" />Мои вопросы</DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3"><RotateCcw className="h-4 w-4 text-primary" />Воспоминания</DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3"><WandSparkles className="h-4 w-4 text-primary" />Мои желания</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_344px]">
        <div className="flex flex-col gap-3">
          <div className="vk-card overflow-hidden rounded-xl p-3">
            <div className="mb-3 flex gap-1 overflow-x-auto scrollbar-none">
              {tabs.map(({ label, icon: Icon, active }) => (
                <button key={label} className={cn("flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60")}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">
              {profilePhotos.map((src, index) => <img key={src} src={src} alt={`Фото профиля ${index + 1}`} className="aspect-square w-full object-cover" loading="lazy" />)}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="vk-pill !bg-secondary/70">Загрузить фото</button>
              <button className="vk-pill !bg-secondary/70">Показать всё</button>
            </div>
          </div>
          <CreatePost />
          <div className="vk-card flex justify-center p-8"><Search className="h-6 w-6 text-muted-foreground" /></div>
        </div>
      </section>

      {renderAvatarDialog()}
    </AppLayout>
  );
};

export default Profile;