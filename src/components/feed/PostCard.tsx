import { MoreHorizontal, Heart, MessageCircle, Share2 } from "lucide-react";

interface PostProps {
  author: string;
  avatar?: string;
  time: string;
  text?: string;
  image?: string;
  imageCount?: number;
  likes: string;
  comments: string;
  shares: string;
}

export const PostCard = ({ author, avatar, time, text, image, imageCount, likes, comments, shares }: PostProps) => {
  return (
    <article className="vk-card overflow-hidden">
      <header className="flex items-center gap-3 p-4 pb-3">
        <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
          {avatar && <img src={avatar} alt={author} className="w-full h-full object-cover" loading="lazy" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{author}</div>
        </div>
        <button className="vk-pill !py-1.5 !px-4">Подписаться</button>
        <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </header>

      {image && (
        <div className="relative">
          <img src={image} alt="post" className="w-full max-h-[640px] object-cover" loading="lazy" />
          {imageCount && (
            <span className="absolute top-3 right-3 text-xs font-semibold bg-background/70 backdrop-blur px-2 py-1 rounded-md">
              1/{imageCount}
            </span>
          )}
        </div>
      )}

      {text && (
        <div className="px-4 pt-3 text-[15px] leading-relaxed">
          {text} <button className="text-primary hover:underline">Показать ещё</button>
        </div>
      )}

      <footer className="flex items-center gap-1 p-3 text-muted-foreground">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors">
          <Heart className="w-4 h-4" />
          <span className="text-sm">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{comments}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary/60 transition-colors">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">{shares}</span>
        </button>
        <span className="ml-auto text-xs pr-2">{time}</span>
      </footer>
    </article>
  );
};
