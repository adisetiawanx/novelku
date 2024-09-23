<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Detail Novel</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex items-center gap-2">
          <h2 v-if="novel && novel.title" class="text-lg">{{ novel.title }}</h2>
          <DocumentCheckIcon
            v-if="novel && novel.postStatus === 'PUBLISHED'"
            class="mr-3 w-5 inline text-green-700"
          />
          <DocumentIcon v-else class="mr-2 w-5 inline text-gray-500" />
        </div>
        <div class="flex justify-end items-center gap-5">
          <HeadlessMenu as="div" class="relative">
            <HeadlessMenuButton class="-m-1.5 flex items-center p-1.5">
              <button
                class="inline-flex gap-1.5 items-center px-5 border border-primary bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
              >
                <span>Chapters</span>
              </button>
            </HeadlessMenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <HeadlessMenuItems
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <HeadlessMenuItem>
                  <button
                    @click="isAddChapterManualOpen = true"
                    class="px-3 py-1 text-sm leading-6 hover:bg-gray-50 w-full text-left"
                  >
                    Add Manual
                  </button>
                </HeadlessMenuItem>
                <HeadlessMenuItem>
                  <button
                    @click="isAddChapterBulkOpen = true"
                    class="text-green-500 px-3 py-1 text-sm leading-6 hover:bg-gray-50 w-full text-left"
                  >
                    Bulk Upload
                  </button>
                </HeadlessMenuItem>
              </HeadlessMenuItems>
            </transition>
          </HeadlessMenu>
          <button
            @click="isEditNovelOpen = true"
            class="inline-flex gap-1.5 items-center px-5 border border-primary bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
          >
            <PencilIcon class="w-3.5 inline" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="novel" class="grid grid-cols-8 gap-5 max-w-7xl">
        <div class="col-span-2">
          <NuxtImg :src="novel.imageUrl" class="w-full shadow rounded" />
        </div>
        <div class="col-span-6 space-y-3">
          <div class="flex justify-between items-center">
            <div class="flex gap-0.5">
              <StarIcon
                v-for="rating in novel.rating"
                class="w-7 text-yellow-400"
              />
            </div>
            <p class="text-gray-700 italic">
              created at
              <span class="font-medium">{{
                convertDate(novel.createdAt)
              }}</span>
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-gray-700">{{ novel.status }}</p>
            <a
              :href="`https://novelku.id/novel/${novel.slug}`"
              target="_blank"
              class="text-gray-700 italic hover:underline"
              >.../novel/{{ novel.slug }}</a
            >
          </div>
          <p class="text-gray-700">{{ novel.alternativeTitle }}</p>
          <p class="text-gray-700">
            {{ arrayToTextWithComma(novel.authors.map((a: any) => a.name)) }}
          </p>

          <p class="text-gray-700">
            {{ convertNovelType(novel.type) }}
          </p>
          <p class="text-gray-700">
            {{ arrayToTextWithComma(novel.genres.map((g: any) => g.name)) }}
          </p>
          <p class="text-gray-700">{{ novel.year }}</p>
          <p class="text-gray-700">
            {{ arrayToTextWithComma(novel.tags.map((t: any) => t.name)) }}
          </p>
          <p class="text-gray-700">{{ novel.totalView }} views</p>
          <p class="text-gray-700">{{ novel.totalView }} bookmarks</p>
          <p class="text-gray-700">{{ novel.totalView }} comments</p>
        </div>
        <div class="col-span-8">
          <p class="text-gray-700">{{ novel.synopsis }}</p>
        </div>
      </div>
      <div v-if="novel && novel.chapters" class="mt-8 border-t pt-3">
        <p
          v-if="novel.chapters.length === 0"
          class="text-sm italic text-gray-600"
        >
          No chapters found.
        </p>
        <div v-else class="grid gap-3 grid-cols-1">
          <div
            v-for="chapter in novel.chapters"
            class="flex justify-between items-center gap-5 bg-gray-50 hover:bg-white border rounded px-3 py-2 w-full hover:text-primary"
          >
            <div>
              <span class="min-w-14 inline-block font-medium">{{
                chapter.number
              }}</span>
              <button
                @click="
                  isEditChapterOpen = true;
                  editChapterId = chapter.id;
                "
                class="cursor-pointer hover:underline"
              >
                {{ chapter.title }}
              </button>
            </div>
            <TrashIcon
              @click="
                isDeleteChapterOpen = true;
                deleteChapterId = chapter.id;
                deleteChapterTitle = chapter.title;
              "
              class="w-5 text-red-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </template>

    <ModalAddNovelChapterManual
      v-if="isAddChapterManualOpen"
      :isOpen="isAddChapterManualOpen"
      :novelId="String(novelId)"
      @fetch-novel="fetchNovel"
      @close="isAddChapterManualOpen = false"
    />

    <ModalAddNovelChapterBulk
      v-if="isAddChapterBulkOpen"
      :isOpen="isAddChapterBulkOpen"
      :novelId="String(novelId)"
      @fetch-novel="fetchNovel"
      @close="isAddChapterBulkOpen = false"
    />

    <ModalDeleteNovelChapter
      v-if="isDeleteChapterOpen"
      :isOpen="isDeleteChapterOpen"
      :novelId="String(novelId)"
      :novelTitle="String(novel?.title)"
      :chapterId="String(deleteChapterId)"
      :chapterTitle="String(deleteChapterTitle)"
      @fetch-novel="fetchNovel"
      @close="
        isDeleteChapterOpen = false;
        deleteChapterId = '';
        deleteChapterTitle = '';
      "
    />

    <ModalEditNovelChapter
      v-if="isEditChapterOpen"
      :isOpen="isEditChapterOpen"
      :novelId="String(novelId)"
      :chapterId="editChapterId"
      @fetch-novel="fetchNovel"
      @close="isEditChapterOpen = false"
    />

    <ModalEditNovelModal
      v-if="isEditNovelOpen"
      :isOpen="isEditNovelOpen"
      :novel-data="novel"
      :novelId="String(novelId)"
      @fetch-novel="fetchNovel"
      @close="isEditNovelOpen = false"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  StarIcon,
  DocumentCheckIcon,
  DocumentIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
const route = useRoute();
const novelId = route.params.id;

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const novel = ref<any>();

const isAddChapterManualOpen = ref(false);
const isAddChapterBulkOpen = ref(false);
const isEditNovelOpen = ref(false);
const isDeleteChapterOpen = ref(false);
const deleteChapterId = ref("");
const deleteChapterTitle = ref("");
const isEditChapterOpen = ref(false);
const editChapterId = ref("");

async function fetchNovel() {
  const { getNovel } = useNovel();

  clearStates();

  states.value.isLoading = true;

  const respone = await getNovel(String(novelId));
  novel.value = respone?.data?.novel;

  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
}

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}

onMounted(async () => {
  await fetchNovel();
});
</script>
