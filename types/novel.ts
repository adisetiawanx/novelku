type NovelAuthor = {
  name: string;
};

type NovelGenre = {
  name: string;
};
type NovelTag = {
  name: string;
};

export type NovelDataFromWEb = {
  post_status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | string;
  title: string;
  alternative_title: string;
  slug: string;
  synopsis: string;
  rating: number;
  type: "WEB_NOVEL_CHINA" | "WEB_NOVEL_KOREA" | "WEB_NOVEL_JAPAN" | string;
  year: string;
  status: "COMPLETED" | "ONGOING" | "HIATUS" | string;
  image_url: string;
  authors: NovelAuthor[];
  genres: NovelGenre[];
  tags: NovelTag[];
};
