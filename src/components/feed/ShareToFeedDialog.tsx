import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Repeat2, X } from "lucide-react";
import { useReposts } from "@/context/RepostsContext";
import { useToast } from "@/hooks/use-toast";
import type { Post } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

/** Диалог быстрого репоста с возможностью добавить свой комментарий. */
export const ShareToFeedDialog = ({ open, onOpenChange, post }: Props) => {
  const { share, hasReposted } = useReposts();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const already = hasReposted(post.id);

  const onSubmit = () => {
    try {
      if (already) {
        toast({ title: "Вы уже репостнули эту запись" });
        return;
      }
      share(post, text);
      toast({
        title: "Опубликовано в вашей ленте",
        description: `Запись от ${post.author.name} теперь у вас.`,
      });
    } finally {
      setText("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] rounded-xl border-border bg-popover p-0 shadow-elevated [&>button]:hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <DialogTitle className="text-base font-semibold">Поделиться у себя</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-accent flex items-center justify-center"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Скажите что-нибудь об этой записи…"
            rows={3}
            className="w-full resize-none rounded-lg bg-secondary/60 px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Превью карточки-цитаты — если шарим репост, показываем оригинал */}
          {(() => {
            const src = post.repost?.original ?? post;
            return (
              <div className="rounded-lg border border-border bg-card/60 p-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0">
                    {src.author.avatar && (
                      <img src={src.author.avatar} alt={src.author.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{src.author.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{src.time}</div>
                  </div>
                </div>
                {src.text && (
                  <div className="text-sm text-foreground/90 line-clamp-3 whitespace-pre-line">{src.text}</div>
                )}
              </div>
            );
          })()}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="vk-pill !bg-secondary px-4"
            >
              Отмена
            </button>
            <button
              onClick={onSubmit}
              disabled={already}
              className="vk-pill px-4 inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <Repeat2 className="w-4 h-4" />
              {already ? "Уже репостнуто" : "Поделиться"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
