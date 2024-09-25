export const onlyFirstLatterToUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const convertNovelType = (type: string) => {
  switch (type) {
    case "WEB_NOVEL_CHINA":
      return "Novel China";
    case "WEB_NOVEL_JAPAN":
      return "Novel Japan";
    case "WEB_NOVEL_KOREA":
      return "Novel Korea";
    default:
      return "Unknown";
  }
};

export const arrayToTextWithComma = (array: string[]) => {
  return array.join(", ");
};

export const convertDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
