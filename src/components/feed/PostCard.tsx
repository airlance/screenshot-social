import { useState } from "react";
import { MoreHorizontal, Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoMedia } from "./media/PhotoMedia";
import { VideoMedia } from "./media/VideoMedia";
import { AudioMedia, AudioCollection } from "./media/AudioMedia";
import { CommentsModal } from "./CommentsModal";
import { formatCount, type Post } from "./types";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [reposted, setReposted] = useState(post.reposted ?? false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const likeDelta = liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0;
  const repostDelta = reposted && !post.reposted ? 1 : !reposted && post.reposted ? -1 : 0;
  const likes = post.stats.likes + likeDelta;
  const shares = post.stats.shares + repostDelta;

  const isLong = (post.text?.length ?? 0) > 220;

  return (
    <article className="vk-card overflow-hidden">
      <header className="flex items-center gap-3 p-4 pb-3">
        <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
          {post.author.avatar && (
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" loading="lazy" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{post.author.name}</div>
          {post.author.subtitle && (
            <div className="text-xs text-muted-foreground truncate">{post.author.subtitle}</div>
          )}
        </div>
        <button className="vk-pill !py-1.5 !px-4">Подписаться</button>
        <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground" aria-label="Меню">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </header>

      {post.text && (
        <div className="px-4 pb-3 text-[15px] leading-relaxed whitespace-pre-line">
          {isLong && !expanded ? (
            <>
              {post.text.slice(0, 220)}…{" "}
              <button onClick={() => setExpanded(true)} className="text-primary hover:underline">
                Показать ещё
              </button>
            </>
          ) : (
            post.text
          )}
        </div>
      )}

      {post.media?.map((m, i) => {
        switch (m.type) {
          case "photo":
            return <PhotoMedia key={i} images={m.images} />;
          case "video":
            return <VideoMedia key={i} video={m.video} />;
          case "audio":
            return <AudioMedia key={i} audio={m.audio} />;
          case "audio-collection":
            return <AudioCollection key={i} tracks={m.tracks} />;
        }
      })}

      <footer className="flex items-center gap-1 p-3 text-muted-foreground">
        <button
          onClick={() => setLiked((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-all",
            liked && "text-destructive",
          )}
          aria-pressed={liked}
        >
          <Heart className={cn("w-4 h-4 transition-transform", liked && "fill-current scale-110")} />
          <span className="text-sm tabular-nums">{formatCount(likes)}</span>
        </button>
        <button
          onClick={() => setCommentsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm tabular-nums">{formatCount(post.stats.comments)}</span>
        </button>
        <button
          onClick={() => setReposted((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors",
            reposted && "text-primary",
          )}
          aria-pressed={reposted}
        >
          <Repeat2 className={cn("w-4 h-4", reposted && "scale-110")} />
          <span className="text-sm tabular-nums">{formatCount(shares)}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors ml-auto" aria-label="Поделиться">
          <Share2 className="w-4 h-4" />
        </button>
        <span className="text-xs pr-2 pl-1">{post.time}</span>
      </footer>

      <CommentsModal open={commentsOpen} onOpenChange={setCommentsOpen} post={post} />
    </article>
  );
};
