<template>
  <section>
    <div
      class="flex justify-between items-center border-b border-[#252525] pb-2"
    >
      <h2 class="font-medium text-xl">Novel Update Terbaru</h2>
      <NuxtLink :to="`/novel`" class="text-sm text-primary font-medium"
        >Lihat semua</NuxtLink
      >
    </div>
    <div class="grid grid-cols-4 mt-3 gap-5">
      <NuxtLink :to="`/novel`" v-for="novel in 12" class="group">
        <div class="flex gap-1.5">
          <figure class="relative flex-initial">
            <img
              loading="lazy"
              :src="'http://res.cloudinary.com/novelku/image/upload/v1720020791/iomwnj4glvtkkbrwp3z0.jpg'"
              alt="Cover Novel"
              class="w-[80px] object-cover rounded-md aspect-6/9"
            />
            <span
              class="absolute flex gap-1 bg-primary-darker rounded-br-md p-1 top-0 left-0"
            >
              <StarIcon class="w-3.5 h-3.5 text-yellow-500" />
              <span class="text-xs font-medium">{{ 4.0 }}</span>
            </span>
            <span class="absolute top-1 right-1">
              <img
                :src="setNovelFlag('WEB_NOVEL_KOREA')"
                alt="Japan Flag"
                class="w-5"
              />
            </span>
          </figure>
          <div class="space-y-1.5 flex-1">
            <p
              class="text-sm font-medium line-clamp-1 group-hover:underline transition"
            >
              Academy’s Second Seat
            </p>
            <p class="text-xs flex gap-1 items-center">
              <BookmarkIcon class="w-4 h-4 flex-initial" /><span
                class="line-clamp-1 flex-1"
                >{{ setNovelStatus("COMPLETED") }}</span
              >
            </p>
            <p class="text-xs flex gap-1 items-center flex-initial">
              <ListBulletIcon class="w-4 h-4" /><span
                class="line-clamp-1 flex-1"
                >Chapter 645</span
              >
            </p>
            <p class="text-xs flex gap-1 items-center flex-initial">
              <FolderIcon class="w-4 h-4 self-start" /><span
                class="line-clamp-2 flex-1"
                >Action, Adventure, Comedy, Martial Art, Shounen, Action,
                Adventure, Comedy, Martial Art, Shounen</span
              >
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  BookmarkIcon,
  ListBulletIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";

import { StarIcon } from "@heroicons/vue/24/solid";

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
</script>
