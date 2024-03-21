type NovelAuthor = {
  name: string;
};

type NovelGenre = {
  name: string;
};
type NovelTag = {
  name: string;
};

export type createNovelData = {
  user_id: string;
  post_status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  title: string;
  alternative_title: string;
  slug: string;
  synopsis: string;
  rating: number;
  type: "WEB_NOVEL_CHINA" | "WEB_NOVEL_KOREA" | "WEB_NOVEL_JAPAN";
  year: string;
  status: "COMPLETED" | "ONGOING" | "HIATUS";
  image_url: string;
  authors: NovelAuthor[];
  genres: NovelGenre[];
  tags: NovelTag[];
};
