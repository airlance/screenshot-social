import { AppLayout } from "@/components/layout/AppLayout";
import { Stories } from "@/components/feed/Stories";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { FeedFilters, GameAdCard } from "@/components/feed/RightPanel";
import post1 from "@/assets/post-1.jpg";

const Feed = () => {
  return (
    <AppLayout right={<><FeedFilters /><GameAdCard /></>}>
      <Stories />
      <CreatePost />
      <PostCard
        author="Евгения Шабаева"
        time="5 д назад"
        text="74-летняя Алла Пугачёва появилась на концерте группы «Машина времени», вызвав бурное обсуждение в сети. Она вышла на сцену, чтобы поддержать музыкантов, когда звучала фонограмма её песни «Я сюда ещё вернусь»"
        image={post1}
        imageCount={3}
        likes="23,9K"
        comments="14,5K"
        shares="4,7K"
      />
      <PostCard
        author="Мобильная фотография"
        time="2 ч назад"
        text="Подборка лучших мобильных снимков недели. Вдохновляемся работами наших подписчиков и делимся секретами съёмки на смартфон."
        likes="1,2K"
        comments="89"
        shares="245"
      />
    </AppLayout>
  );
};

export default Feed;
