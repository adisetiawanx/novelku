<template>
  <section :id="props.title.split(' ').join('_').toLowerCase()">
    <div
      class="flex justify-between items-center border-b border-[#252525] pb-2"
    >
      <h2 class="font-medium text-xl">{{ props.title }}</h2>
      <NuxtLink
        :to="`/novel?status=${props.novelStatus.toLowerCase()}`"
        class="text-sm text-primary font-medium"
        >Lihat semua</NuxtLink
      >
    </div>
    <div class="grid grid-cols-7 mt-3 gap-5">
      <NuxtLink
        :to="`/novel/${novel.slug}`"
        :key="novel.slug"
        v-for="novel in novels"
        class="group"
      >
        <div class="flex flex-col gap-1.5">
          <figure class="relative">
            <img
              :src="novel.imageUrl"
              alt="Cover Novel"
              class="w-full object-cover rounded-md aspect-6/9"
            />
            <span
              class="absolute flex gap-1 bg-primary-darker rounded-br-md p-1 top-0 left-0"
            >
              <StarIcon class="w-4 h-4 text-yellow-500" />
              <span class="text-xs font-medium">{{
                novel.rating.toFixed(1)
              }}</span>
            </span>
            <span class="absolute top-1 right-1">
              <img
                :src="setNovelFlag(novel.type)"
                alt="Japan Flag"
                class="w-6"
              />
            </span>
          </figure>
          <p
            class="text-sm font-medium line-clamp-2 group-hover:underline transition"
          >
            {{ novel.title || "-" }}
          </p>
          <p class="text-xs flex gap-1 items-center">
            <ListBulletIcon class="w-4 h-4 flex-initial" /><span
              class="line-clamp-1 flex-1"
              >{{ setNovelStatus(novel.status) }}</span
            >
          </p>
          <p class="text-xs flex gap-1 items-center flex-initial">
            <BookmarkIcon class="w-4 h-4" /><span class="line-clamp-1 flex-1">{{
              novel.chapters[0]?.title || "-"
            }}</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { BookmarkIcon, ListBulletIcon } from "@heroicons/vue/24/outline";

import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  novelStatus: {
    type: String,
    required: true,
  },
});

const novels = ref<any[]>([]);

function setNovelFlag(type: string) {
  const novelJapanFlag = "/assets/japan-flag.webp";
  const novelKoreanFlag = "/assets/south-korea-flag.webp";
  const novelChinaFlag = "/assets/china-flag.webp";

  switch (type) {
    case "WEB_NOVEL_JAPAN":
      return novelJapanFlag;
    case "WEB_NOVEL_KOREA":
      return novelKoreanFlag;
    case "WEB_NOVEL_CHINA":
      return novelChinaFlag;
    default:
      return novelChinaFlag;
  }
}

function setNovelStatus(status: string) {
  switch (status) {
    case "ONGOING":
      return "Ongoing";
    case "COMPLETED":
      return "Tamat";
    case "HIATUS":
      return "Hiatus";
    default:
      return "Ongoing";
  }
}

onMounted(async () => {
  const { getNovels } = useNovel();
  const respone = await getNovels({
    status: props.novelStatus,
    take: 7,
    skip: 0,
    search: "",
  });

  novels.value = (respone?.data?.novels as any) ?? [];
});
</script>
