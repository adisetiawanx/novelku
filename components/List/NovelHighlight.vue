<template>
  <section :id="props.title.split(' ').join('_').toLowerCase()">
    <div class="flex gap-2 items-center border-b border-[#252525] pb-2">
      <h2 class="font-medium text-xl">{{ props.title }}</h2>
      <FireIcon class="w-6 h-6 text-red-500" />
    </div>
    <div class="grid lg:grid-cols-4 grid-cols-2 mt-3 gap-5">
      <NuxtLink
        :to="`/novel/${novel.slug}`"
        :key="novel.slug"
        v-for="novel in novels"
        class="group"
      >
        <div class="flex flex-col gap-1.5">
          <figure class="relative">
            <img
              loading="lazy"
              :src="novel.imageUrl"
              alt="Cover Novel"
              class="w-full object-cover rounded-md aspect-6/9"
            />
            <span
              class="absolute flex items-center gap-1 bg-primary-darker rounded-br-md p-1 top-0 left-0"
            >
              <StarIcon class="w-5 h-5 text-yellow-500" />
              <span class="text-sm font-medium">{{
                (novel.rating / 2).toFixed(1)
              }}</span>
            </span>
            <span class="absolute top-1 right-1">
              <img
                :src="setNovelFlag(novel.type)"
                alt="Japan Flag"
                class="w-8"
              />
            </span>
          </figure>
          <p class="font-medium line-clamp-2 group-hover:underline transition">
            {{ novel.title || "-" }}
          </p>
          <p class="text-sm flex gap-1 items-center">
            <BookmarkIcon class="w-5 h-5 flex-initial" /><span
              class="line-clamp-1 flex-1"
              >{{ setNovelStatus(novel.status) }}</span
            >
          </p>
          <p class="text-sm flex gap-1 items-center flex-initial">
            <ListBulletIcon class="w-5 h-5" /><span
              class="line-clamp-1 flex-1"
              >{{ novel.chapters[0]?.title || "-" }}</span
            >
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { BookmarkIcon, ListBulletIcon } from "@heroicons/vue/24/outline";

import { StarIcon, FireIcon } from "@heroicons/vue/24/solid";

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
