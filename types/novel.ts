type NovelAuthor = {
  name: string;
};

type NovelGenre = {
  name: string;
};
type NovelTag = {
  name: string;
};

export type NovelDataFromWeb = {
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

export type NovelDataFromServer = {
  id: string;
  postStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED" | string;
  title: string;
  alternativeTitle: string | null;
  slug: string;
  synopsis: string | null;
  rating: number;
  type:
    | "WEB_NOVEL_CHINA"
    | "WEB_NOVEL_KOREA"
    | "WEB_NOVEL_JAPAN"
    | string
    | null;
  year: string | null;
  status: "COMPLETED" | "ONGOING" | "HIATUS" | string | null;
  userId: string;
  imageUrl: string;
  totalViews: number;
  authors: NovelAuthor[];
  genres: NovelGenre[];
  tags: NovelTag[];
  createdAt: Date;
  updatedAt: Date;
};
