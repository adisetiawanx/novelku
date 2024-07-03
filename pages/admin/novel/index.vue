<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Novel</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-initial pr-5">
          <button
            @click="isAddNovelModalOpen = true"
            class="inline-flex items-center gap-2 shadow px-5 py-1.5 rounded font-medium bg-primary hover:bg-primary/80 hover text-white"
          >
            <PlusCircleIcon class="w-6" /><span class="text-sm">Novel</span>
          </button>
        </div>

        <div class="border-l pl-5 flex-1">
          <input
            @input="searchNovel"
            v-model="pageQuery.search"
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search novel..."
          />
        </div>
      </div>
    </template>
    <template #content>
      <UILoadingSpinner v-if="states.isLoading" />
      <p
        v-else-if="!novels || novels.length === 0"
        class="text-sm italic text-gray-600"
      >
        No novel found.
      </p>
      <div v-else>
        <div class="relative overflow-x-auto border">
          <table class="w-full text-sm text-left rtl:text-right table-auto">
            <thead class="text-xs uppercase border-b">
              <tr>
                <th scope="col" class="px-6 py-3">Title</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Authors</th>
                <th scope="col" class="px-6 py-3">Genres</th>
                <th scope="col" class="px-6 py-3">Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(novel, novelIndex) in novels"
                :class="[
                  novelIndex + 1 === 10 ? '' : 'border-b',
                  'odd:bg-white even:bg-gray-50',
                ]"
              >
                <td class="px-6 py-4 flex items-center">
                  <DocumentCheckIcon
                    v-if="novel.postStatus === 'PUBLISHED'"
                    class="mr-3 w-5 inline text-green-700"
                  />
                  <DocumentIcon v-else class="mr-2 w-5 inline text-gray-500" />
                  <NuxtLink
                    :to="`/admin/novel/${novel.slug}`"
                    class="hover:text-blue-500 line-clamp-1"
                    >{{ novel.title }}
                  </NuxtLink>
                  <span
                    :class="[
                      novel.status === 'ONGOING'
                        ? 'bg-yellow-200 border border-yellow-500'
                        : '',
                      novel.status === 'COMPLETED'
                        ? 'bg-green-200 border border-green-500'
                        : '',
                      novel.status === 'HIATUS'
                        ? 'bg-red-200 border border-red-500'
                        : '',
                      ' rounded-full text-xs py-0.5 px-2 ml-2 font-medium',
                    ]"
                    >{{ onlyFirstLatterToUpperCase(novel.status) }}</span
                  >
                </td>
                <td class="px-6 py-4">{{ convertNovelType(novel.type) }}</td>
                <td class="px-6 py-4">
                  {{
                    arrayToTextWithComma(novel.authors.map((a: any) => a.name))
                  }}
                </td>
                <td class="px-6 py-4">
                  {{
                    arrayToTextWithComma(novel.genres.map((g: any) => g.name))
                  }}
                </td>
                <td class="px-6 py-4">
                  {{ arrayToTextWithComma(novel.tags.map((t: any) => t.name)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="navigation"
          class="flex justify-between items-center w-full border-l border-r border-b px-6 py-4 text-sm"
        >
          <div class="flex-initial pr-5">
            <span class="text-gray-600"
              >Showing {{ (pageNumber - 1) * pageQuery.take + 1 }} to
              {{ pageNumber * pageQuery.take }} of
              {{ totalNovel }} entries</span
            >
          </div>
          <div class="border-l pl-5 flex-1">
            <div class="flex items-center gap-3">
              <button
                :disabled="pageNumber === 1"
                @click="
                  pageQuery.skip -= pageQuery.take;
                  fetchNovels();
                "
                class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                :disabled="pageNumber * pageQuery.take >= totalNovel"
                @click="
                  pageQuery.skip += pageQuery.take;
                  fetchNovels();
                "
                class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <ModalAddNovelModal
      :isOpen="isAddNovelModalOpen"
      @close="closeAddNovelModal"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  PlusCircleIcon,
  DocumentCheckIcon,
  DocumentIcon,
} from "@heroicons/vue/24/solid";
import { debounce } from "lodash-es";
import type { NovelDataFromServer } from "~/types/novel";

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const route = useRoute();
const pageNumber = route.query.page ? Number(route.query.page) : 1;
const pageQuery = ref({
  take: 10,
  skip: (pageNumber - 1) * 10,
  search: "",
});

const novels = ref<NovelDataFromServer | any>([]);
const totalNovel = ref<number>(0);

const isAddNovelModalOpen = ref(false);
function closeAddNovelModal() {
  isAddNovelModalOpen.value = false;
}

async function fetchNovels() {
  const { getNovels } = useNovel();

  states.value.isLoading = true;
  const respone = await getNovels({
    take: pageQuery.value.take,
    skip: pageQuery.value.skip,
    search: pageQuery.value.search,
  });

  novels.value = (respone?.data?.novels as any) ?? [];
  totalNovel.value = respone?.data?.totalNovel ?? 0;

  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
}

const searchNovel = debounce(async () => {
  states.value.isLoading = true;
  pageQuery.value.skip = 0;
  await fetchNovels();
  states.value.isLoading = false;
}, 500);

onMounted(async () => {
  await fetchNovels();
});

definePageMeta({
  middleware: "admin-only-middleware",
});
</script>
