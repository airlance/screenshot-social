import { useMemo, useRef, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Image as ImageIcon,
  MoreHorizontal,
  Settings,
  ChevronRight,
  Pencil,
  Trash2,
  Download,
  Move,
  Share2,
  Pin,
  Archive,
  CheckCircle2,
  MessageSquare,
  Camera,
  X,
  Plus,
  ArrowLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PhotoViewer } from "@/components/feed/PhotoViewer";

import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/post-photo-1.jpg";
import photo3 from "@/assets/post-photo-2.jpg";
import photo4 from "@/assets/post-photo-3.jpg";
import photo5 from "@/assets/post-photo-4.jpg";
import photo6 from "@/assets/post-1.jpg";

type Album = {
  id: string;
  title: string;
  description: string;
  photos: string[];
  createdAt: number;
};

const initialAlbums: Album[] = [
  {
    id: "a1",
    title: "Путешествия",
    description: "Мои поездки 2026",
    photos: [photo1, photo2, photo3, photo4],
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "a2",
    title: "Природа",
    description: "Пейзажи и закаты",
    photos: [photo5, photo6],
    createdAt: Date.now() - 86400000 * 12,
  },
];

type Tab = "photos" | "albums";

const Photos = () => {
  const [tab, setTab] = useState<Tab>("photos");
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [looseFiles, setLooseFiles] = useState<string[]>([]);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);

  // Modals state
  const [createOpen, setCreateOpen] = useState(false);
  const [editAlbumId, setEditAlbumId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<string | null>(null); // album id or null = loose
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allPhotos = useMemo(
    () => [...looseFiles, ...albums.flatMap((a) => a.photos)],
    [looseFiles, albums],
  );

  const openAlbum = openAlbumId ? albums.find((a) => a.id === openAlbumId) : null;
  const editingAlbum = editAlbumId ? albums.find((a) => a.id === editAlbumId) : null;

  // ===== Album CRUD =====
  const handleCreateAlbum = (title: string, description: string) => {
    const album: Album = {
      id: `a${Date.now()}`,
      title: title.trim() || "Без названия",
      description: description.trim(),
      photos: [],
      createdAt: Date.now(),
    };
    setAlbums((prev) => [album, ...prev]);
    setCreateOpen(false);
  };

  const handleSaveAlbum = (title: string, description: string) => {
    if (!editAlbumId) return;
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === editAlbumId ? { ...a, title: title.trim() || a.title, description: description.trim() } : a,
      ),
    );
    setEditAlbumId(null);
  };

  const handleDeleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
    if (openAlbumId === id) setOpenAlbumId(null);
    if (editAlbumId === id) setEditAlbumId(null);
  };

  // ===== Upload =====
  const triggerFileSelect = (target: string | null) => {
    setUploadTarget(target);
    setPendingFiles([]);
    fileInputRef.current?.click();
  };

  const onFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    setPendingFiles(urls);
    setUploadOpen(true);
    e.target.value = "";
  };

  const removePending = (idx: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const confirmUpload = () => {
    if (pendingFiles.length === 0) {
      setUploadOpen(false);
      return;
    }
    if (uploadTarget) {
      setAlbums((prev) =>
        prev.map((a) =>
          a.id === uploadTarget ? { ...a, photos: [...pendingFiles, ...a.photos] } : a,
        ),
      );
    } else {
      setLooseFiles((prev) => [...pendingFiles, ...prev]);
    }
    setPendingFiles([]);
    setUploadOpen(false);
  };

  return (
    <AppLayout variant="wide">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFilesPicked}
      />

      <div className="vk-card p-5">
        {openAlbum ? (
          <AlbumView
            album={openAlbum}
            onBack={() => setOpenAlbumId(null)}
            onUpload={() => triggerFileSelect(openAlbum.id)}
            onEdit={() => setEditAlbumId(openAlbum.id)}
            onDelete={() => handleDeleteAlbum(openAlbum.id)}
            onOpenPhoto={setViewerSrc}
          />
        ) : (
          <>
            <h1 className="text-xl font-bold mb-4">Мои фотографии</h1>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex gap-1">
                <button
                  onClick={() => setTab("photos")}
                  className={cn(
                    "vk-pill flex items-center gap-2",
                    tab === "photos" ? "bg-secondary" : "bg-transparent text-muted-foreground",
                  )}
                >
                  Фото
                </button>
                <button
                  onClick={() => setTab("albums")}
                  className={cn(
                    "vk-pill",
                    tab === "albums" ? "bg-secondary" : "bg-transparent text-muted-foreground",
                  )}
                >
                  Альбомы
                </button>
              </div>
              <div className="flex items-center gap-2">
                {tab === "photos" ? (
                  <>
                    <button
                      onClick={() => triggerFileSelect(null)}
                      className="vk-pill flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4 text-primary" /> Загрузить фото
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" /> Архив
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" /> Комментарии к фото
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Выбрать несколько
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="vk-pill flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4 text-primary" /> Создать альбом
                  </button>
                )}
              </div>
            </div>

            {tab === "photos" ? (
              <PhotosGrid photos={allPhotos} onOpen={setViewerSrc} />
            ) : (
              <AlbumsGrid
                albums={albums}
                onOpen={(id) => setOpenAlbumId(id)}
                onEdit={(id) => setEditAlbumId(id)}
                onDelete={handleDeleteAlbum}
              />
            )}
          </>
        )}
      </div>

      {/* Create album */}
      <AlbumFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Создать альбом"
        submitLabel="Создать альбом"
        onSubmit={handleCreateAlbum}
      />

      {/* Edit album */}
      <AlbumFormDialog
        open={!!editingAlbum}
        onOpenChange={(o) => !o && setEditAlbumId(null)}
        title="Редактирование альбома"
        submitLabel="Сохранить"
        initialTitle={editingAlbum?.title}
        initialDescription={editingAlbum?.description}
        onSubmit={handleSaveAlbum}
        onDelete={editingAlbum ? () => handleDeleteAlbum(editingAlbum.id) : undefined}
        showCover
      />

      {/* Upload */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Загрузка фото</DialogTitle>
          </DialogHeader>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {pendingFiles.length} ФОТО
          </div>
          <div className="grid grid-cols-4 gap-3 max-h-[360px] overflow-y-auto">
            {pendingFiles.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
                <img src={src} alt={`upload ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePending(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {pendingFiles.length === 0 && (
              <div className="col-span-4 text-center text-sm text-muted-foreground py-8">
                Нет выбранных фото
              </div>
            )}
          </div>
          <DialogFooter className="!justify-between sm:!justify-between items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-primary hover:underline"
            >
              Добавить фото
            </button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setUploadOpen(false)}>
                Отмена
              </Button>
              <Button onClick={confirmUpload} className="gap-2">
                Сохранить
                {pendingFiles.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-background/20 text-xs flex items-center justify-center">
                    {pendingFiles.length}
                  </span>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

// ===== Subcomponents =====

const PhotosGrid = ({ photos }: { photos: string[] }) => {
  if (photos.length === 0) {
    return <EmptyState icon={<ImageIcon className="w-8 h-8" />} text="У вас ещё нет фото" />;
  }
  return (
    <>
      <div className="text-xs font-semibold text-muted-foreground mb-3">2026</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {photos.map((src, i) => (
          <PhotoTile key={i} src={src} />
        ))}
      </div>
    </>
  );
};

const PhotoTile = ({ src }: { src: string }) => (
  <div className="relative group">
    <img
      src={src}
      alt="photo"
      className="w-full aspect-square object-cover rounded-xl"
      loading="lazy"
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Download className="w-4 h-4 mr-2" /> Скачать
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Move className="w-4 h-4 mr-2" /> Переместить
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="w-4 h-4 mr-2" /> Поделиться
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pin className="w-4 h-4 mr-2" /> Закрепить
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive className="w-4 h-4 mr-2" /> Архивировать
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CheckCircle2 className="w-4 h-4 mr-2" /> Выбрать несколько
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="w-4 h-4 mr-2" /> Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const AlbumsGrid = ({
  albums,
  onOpen,
  onEdit,
  onDelete,
}: {
  albums: Album[];
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  if (albums.length === 0) {
    return (
      <EmptyState
        icon={<ImageIcon className="w-8 h-8" />}
        text="Вы ещё не создавали альбомы"
      />
    );
  }
  return (
    <div className="vk-card bg-surface-elevated/40 p-5">
      <div className="text-sm font-semibold mb-4">Мои альбомы</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((a) => (
          <AlbumCard
            key={a.id}
            album={a}
            onOpen={() => onOpen(a.id)}
            onEdit={() => onEdit(a.id)}
            onDelete={() => onDelete(a.id)}
          />
        ))}
      </div>
    </div>
  );
};

const AlbumCard = ({
  album,
  onOpen,
  onEdit,
  onDelete,
}: {
  album: Album;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const cover = album.photos[0];
  return (
    <div>
      <div
        onClick={onOpen}
        className="relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer group"
      >
        {cover ? (
          <img src={cover} alt={album.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Camera className="w-10 h-10" />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="w-4 h-4 mr-2 text-primary" /> Редактировать альбом
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Удалить альбом
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-2">
        <div className="font-semibold text-sm truncate">{album.title}</div>
        <div className="text-xs text-muted-foreground">
          {album.photos.length === 0 ? "Нет фото" : `${album.photos.length} фото`}
        </div>
      </div>
    </div>
  );
};

const AlbumView = ({
  album,
  onBack,
  onUpload,
  onEdit,
  onDelete,
}: {
  album: Album;
  onBack: () => void;
  onUpload: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <>
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
      <button onClick={onBack} className="hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Мои фотографии
      </button>
      <ChevronRight className="w-4 h-4" />
      <span>Альбом</span>
    </div>
    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold">{album.title}</h1>
        {album.description && (
          <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onUpload} className="vk-pill flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" /> Загрузить фото
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="w-4 h-4 mr-2 text-primary" /> Редактировать альбом
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="w-4 h-4 mr-2 text-primary" /> Комментарии к альбому
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    {album.photos.length === 0 ? (
      <EmptyState
        icon={<ImageIcon className="w-8 h-8" />}
        text="В альбоме пока нет фото"
        action={
          <button onClick={onUpload} className="vk-pill flex items-center gap-2 mt-2">
            <Plus className="w-4 h-4 text-primary" /> Добавить фото
          </button>
        }
      />
    ) : (
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {album.photos.map((src, i) => (
          <PhotoTile key={i} src={src} />
        ))}
      </div>
    )}
  </>
);

const EmptyState = ({
  icon,
  text,
  action,
}: {
  icon: React.ReactNode;
  text: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="text-sm">{text}</div>
    {action}
  </div>
);

// ===== Album form dialog =====

const AlbumFormDialog = ({
  open,
  onOpenChange,
  title,
  submitLabel,
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  onDelete,
  showCover = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  submitLabel: string;
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  onDelete?: () => void;
  showCover?: boolean;
}) => {
  const [name, setName] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDescription);

  // Reset on open
  useMemo(() => {
    if (open) {
      setName(initialTitle);
      setDesc(initialDescription);
    }
  }, [open, initialTitle, initialDescription]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className={cn("grid gap-5", showCover && "grid-cols-[160px_1fr]")}>
          {showCover && (
            <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
              <Camera className="w-10 h-10" />
            </div>
          )}
          <div className="flex flex-col gap-4 min-w-0">
            <div>
              <div className="flex justify-between mb-1.5 text-sm">
                <label className="text-muted-foreground">
                  Название <span className="text-destructive">*</span>
                </label>
                <span className="text-xs text-muted-foreground">{name.length} / 128</span>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 128))}
                placeholder="Название альбома"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5 text-sm">
                <label className="text-muted-foreground">Описание</label>
                <span className="text-xs text-muted-foreground">{desc.length} / 512</span>
              </div>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value.slice(0, 512))}
                placeholder="Описание (необязательно)"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="text-sm font-semibold mb-2">Настройки приватности</div>
          <button className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-secondary/60 transition-colors">
            <div>
              <div className="text-sm font-medium">Кто может просматривать этот альбом</div>
              <div className="text-xs text-muted-foreground">Все пользователи</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-secondary/60 transition-colors">
            <div>
              <div className="text-sm font-medium">Кто может комментировать фото в альбоме</div>
              <div className="text-xs text-muted-foreground">Все пользователи</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <p className="text-xs text-muted-foreground mt-2">
            Изменить настройки приватности можно в любой момент
          </p>
        </div>

        <DialogFooter className="!justify-between sm:!justify-between items-center">
          {onDelete ? (
            <button
              onClick={onDelete}
              className="text-sm text-destructive hover:underline"
            >
              Удалить альбом
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button onClick={() => onSubmit(name, desc)} disabled={!name.trim()}>
              {submitLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Photos;
