<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Tag</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-initial pr-5">
          <button
            @click="isAddTagOpen = true"
            class="inline-flex items-center gap-2 shadow px-5 py-1.5 rounded font-medium bg-primary hover:bg-primary/80 hover text-white"
          >
            <PlusCircleIcon class="w-6" /><span class="text-sm">Tag</span>
          </button>
        </div>
        <div class="border-l pl-5 flex-1">
          <input
            @input="searchTag"
            v-model="pageQuery.search"
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search Tag..."
          />
        </div>
      </div>
    </template>
    <template #content>
      <UILoadingSpinner v-if="states.isLoading" />
      <p
        v-else-if="!tags || tags.length === 0"
        class="text-sm italic text-gray-600"
      >
        No tag found.
      </p>
      <div v-else>
        <div class="relative overflow-x-auto border">
          <table class="w-full text-sm text-left rtl:text-right table-auto">
            <thead class="text-xs uppercase border-b">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(tag, tagIndex) in tags"
                :class="[
                  tagIndex + 1 === 10 ? '' : 'border-b',
                  'odd:bg-white even:bg-gray-50 hover:bg-primary/10',
                ]"
              >
                <td class="px-6 py-4">
                  <button
                    @click="
                      isEditTagId = tag.id;
                      isEditTagOpen = true;
                    "
                    class="hover:text-blue-500"
                  >
                    {{ tag.name }}
                  </button>
                </td>
                <td class="px-6 py-4">
                  {{ convertDate(tag.createdAt) }}
                </td>
                <td class="px-6 py-4 flex justify-end items-center">
                  <TrashIcon
                    @click="
                      deleteTagId = tag.id;
                      deleteTagName = tag.name;
                      isDeleteTagOpen = true;
                    "
                    class="w-6 text-white cursor-pointer bg-red-500 p-1 rounded"
                  />
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
              {{ totalTags }} entries</span
            >
          </div>
          <div class="border-l pl-5 flex-1">
            <div class="flex items-center gap-3">
              <button
                :disabled="pageNumber === 1"
                @click="
                  pageQuery.skip -= pageQuery.take;
                  pageNumber -= 1;
                  fetchTags();
                "
                class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                :disabled="pageNumber * pageQuery.take >= totalTags"
                @click="
                  pageQuery.skip += pageQuery.take;
                  pageNumber += 1;
                  fetchTags();
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
  </NuxtLayout>

  <ModalTagAdd
    v-if="isAddTagOpen"
    :isOpen="isAddTagOpen"
    @fetchTags="fetchTags"
    @close="isAddTagOpen = false"
  />

  <ModalTagEdit
    v-if="isEditTagOpen"
    :isOpen="isEditTagOpen"
    :tagId="String(isEditTagId)"
    @fetchTags="fetchTags"
    @close="isEditTagOpen = false"
  />

  <ModalTagDelete
    v-if="isDeleteTagOpen"
    :isOpen="isDeleteTagOpen"
    :tagId="String(deleteTagId)"
    :tagName="String(deleteTagName)"
    @fetchTags="fetchTags"
    @close="isDeleteTagOpen = false"
  />
</template>

<script lang="ts" setup>
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { debounce } from "lodash-es";

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

const tags = ref<any>([]);
const totalTags = ref<number>(0);

const isAddTagOpen = ref(false);
const isEditTagOpen = ref(false);
const isEditTagId = ref("");
const isDeleteTagOpen = ref(false);
const deleteTagId = ref("");
const deleteTagName = ref("");

async function fetchTags() {
  const { getTags } = useTag();

  clearStates();

  states.value.isLoading = true;
  const respone = await getTags({
    take: pageQuery.value.take,
    skip: pageQuery.value.skip,
    search: pageQuery.value.search,
  });

  tags.value = respone?.data?.tags ?? [];
  totalTags.value = respone?.data?.totalTag ?? 0;

  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
}

const searchTag = debounce(async () => {
  states.value.isLoading = true;
  pageQuery.value.skip = 0;
  await fetchTags();
  states.value.isLoading = false;
}, 500);

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}

onMounted(async () => {
  await fetchTags();
});

definePageMeta({
  middleware: "admin-only-middleware",
});
</script>
