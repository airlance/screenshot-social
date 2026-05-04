import { AppLayout } from "@/components/layout/AppLayout";
import { Stories } from "@/components/feed/Stories";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { FeedFilters, GameAdCard } from "@/components/feed/RightPanel";
import { useReposts } from "@/context/RepostsContext";
import type { Post } from "@/components/feed/types";

import post1 from "@/assets/post-1.jpg";
import photo1 from "@/assets/post-photo-1.jpg";
import photo2 from "@/assets/post-photo-2.jpg";
import photo3 from "@/assets/post-photo-3.jpg";
import photo4 from "@/assets/post-photo-4.jpg";
import musicCover from "@/assets/post-music-cover.jpg";
import videoThumb from "@/assets/post-video-thumb.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";

// Псевдослучайная волна для голосовых
const wave = (n: number, seed = 1) =>
  Array.from({ length: n }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin((i + seed) * 1.7)));

const posts: Post[] = [
  {
    id: "1",
    author: { id: "evgenia-shabaeva", kind: "user", name: "Евгения Шабаева", avatar: avatar2, subtitle: "5 д назад · Москва" },
    time: "5 д",
    text: "74-летняя Алла Пугачёва появилась на концерте группы «Машина времени», вызвав бурное обсуждение в сети. Она вышла на сцену, чтобы поддержать музыкантов, когда звучала фонограмма её песни «Я сюда ещё вернусь».",
    media: [{ type: "photo", images: [post1, photo1, photo4] }],
    stats: { likes: 23900, comments: 14500, shares: 4700 },
    comments: [
      { id: "c1", author: { name: "Иван П.", avatar: avatar3 }, text: "Легенда!", time: "2 ч", likes: 142 },
      { id: "c2", author: { name: "Мария К.", avatar: avatar4 }, text: "Любим её всем сердцем ❤️", time: "1 ч", likes: 56 },
      { id: "c3", author: { name: "Олег С.", avatar: avatar5 }, text: "Спасибо за репортаж", time: "40 м", likes: 9 },
    ],
  },
  {
    id: "2",
    author: { id: "artem-levin", kind: "user", name: "Артём Левин", avatar: avatar1, subtitle: "Только что" },
    time: "только что",
    text: "Записал короткое голосовое — расскажу про новый альбом 🎙️",
    media: [{ type: "audio", audio: { kind: "voice", duration: "0:34", waveform: wave(36, 2) } }],
    stats: { likes: 312, comments: 27, shares: 4 },
  },
  {
    id: "3",
    author: { id: "travel-photo", kind: "group", name: "Travel & Photo", avatar: avatar3, subtitle: "Сообщество · 2 ч" },
    time: "2 ч",
    text: "Фото недели — мы собрали лучшие снимки нашего сообщества. Какой бы вы поставили на обложку?",
    media: [{ type: "photo", images: [photo1, photo2, photo3, photo4] }],
    stats: { likes: 8400, comments: 312, shares: 178 },
    liked: true,
  },
  {
    id: "4",
    author: { id: "lo-fi-beats", kind: "group", name: "Lo-Fi Beats", avatar: avatar4, subtitle: "Музыкальная подборка" },
    time: "вчера",
    text: "Подборка треков для концентрации — слушайте, пока работаете 🎧",
    media: [
      {
        type: "audio-collection",
        tracks: [
          { kind: "track", title: "Midnight Drive", artist: "Lo-Fi Bear", duration: "3:24", cover: musicCover },
          { kind: "track", title: "Soft Rain", artist: "Aurora", duration: "2:58", cover: musicCover },
          { kind: "track", title: "Coffee & Code", artist: "Nordic Loops", duration: "4:12", cover: musicCover },
          { kind: "track", title: "Tokyo Lights", artist: "Neon Tape", duration: "3:47", cover: musicCover },
        ],
      },
    ],
    stats: { likes: 1820, comments: 96, shares: 245 },
  },
  {
    id: "5",
    author: { id: "kinohronika", kind: "group", name: "Кинохроника", avatar: avatar5, subtitle: "12 ч назад" },
    time: "12 ч",
    text: "Свежий трейлер от Christopher Nolan — обсуждаем в комментариях.",
    media: [
      {
        type: "video",
        video: { kind: "youtube", videoId: "dQw4w9WgXcQ", title: "Trailer" },
      },
    ],
    stats: { likes: 5400, comments: 421, shares: 89 },
  },
  {
    id: "6",
    author: { id: "mobile-photo", kind: "group", name: "Мобильная фотография", avatar: avatar6, subtitle: "Сообщество" },
    time: "3 ч",
    text: "Один кадр — одна история. Сегодняшний победитель конкурса.",
    media: [{ type: "photo", images: [photo3] }],
    stats: { likes: 1200, comments: 89, shares: 24 },
  },
  {
    id: "7",
    author: { id: "chef-dima", kind: "user", name: "Шеф-повар Дима", avatar: avatar7, subtitle: "Кулинарный блог" },
    time: "вчера",
    text: "Рецепт идеального латте — снял короткое видео из своего кафе ☕",
    media: [
      {
        type: "video",
        video: { kind: "upload", thumbnail: videoThumb, duration: "1:24" },
      },
    ],
    stats: { likes: 940, comments: 58, shares: 12 },
  },
  {
    id: "8",
    author: { id: "anna-morozova", kind: "user", name: "Анна Морозова", avatar: avatar2, subtitle: "Личный блог" },
    time: "2 д",
    text: "Иногда лучший пост — это просто текст. Сегодня хочется поделиться мыслью: не бойтесь начинать с малого. Любой большой проект начинался с одной маленькой идеи и одного решительного шага.",
    stats: { likes: 4200, comments: 215, shares: 67 },
  },
];

const Feed = () => {
  const { reposts } = useReposts();
  return (
    <AppLayout right={<><FeedFilters /><GameAdCard /></>}>
      <Stories />
      <CreatePost />
      {reposts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </AppLayout>
  );
};

export default Feed;
