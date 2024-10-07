<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Author</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-initial pr-5">
          <button
            @click="isAddAuthorOpen = true"
            class="inline-flex items-center gap-2 shadow px-5 py-1.5 rounded font-medium bg-primary hover:bg-primary/80 hover text-white"
          >
            <PlusCircleIcon class="w-6" /><span class="text-sm">Author</span>
          </button>
        </div>
        <div class="border-l pl-5 flex-1">
          <input
            @input="searchAuthor"
            v-model="pageQuery.search"
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search Author..."
          />
        </div>
      </div>
    </template>
    <template #content>
      <UILoadingSpinner v-if="states.isLoading" />
      <p
        v-else-if="!authors || authors.length === 0"
        class="text-sm italic text-gray-600"
      >
        No author found.
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
                v-for="(author, authorIndex) in authors"
                :class="[
                  authorIndex + 1 === 10 ? '' : 'border-b',
                  'odd:bg-white even:bg-gray-50 hover:bg-primary/10',
                ]"
              >
                <td class="px-6 py-4">
                  <button
                    @click="
                      isEditAuthorId = author.id;
                      isEditAuthorOpen = true;
                    "
                    class="hover:text-blue-500"
                  >
                    {{ author.name }}
                  </button>
                </td>
                <td class="px-6 py-4">
                  {{ convertDate(author.createdAt) }}
                </td>
                <td class="px-6 py-4 flex justify-end items-center">
                  <TrashIcon
                    @click="
                      deleteAuthorId = author.id;
                      deleteAuthorName = author.name;
                      isDeleteAuthorOpen = true;
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
              {{ totalAuthors }} entries</span
            >
          </div>
          <div class="border-l pl-5 flex-1">
            <div class="flex items-center gap-3">
              <button
                :disabled="pageNumber === 1"
                @click="
                  pageQuery.skip -= pageQuery.take;
                  pageNumber -= 1;
                  fetchAuthors();
                "
                class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                :disabled="pageNumber * pageQuery.take >= totalAuthors"
                @click="
                  pageQuery.skip += pageQuery.take;
                  pageNumber += 1;
                  fetchAuthors();
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

  <ModalAuthorAdd
    v-if="isAddAuthorOpen"
    :isOpen="isAddAuthorOpen"
    @fetchAuthors="fetchAuthors"
    @close="isAddAuthorOpen = false"
  />

  <ModalAuthorEdit
    v-if="isEditAuthorOpen"
    :isOpen="isEditAuthorOpen"
    :authorId="String(isEditAuthorId)"
    @fetchAuthors="fetchAuthors"
    @close="isEditAuthorOpen = false"
  />

  <ModalAuthorDelete
    v-if="isDeleteAuthorOpen"
    :isOpen="isDeleteAuthorOpen"
    :authorId="String(deleteAuthorId)"
    :authorName="String(deleteAuthorName)"
    @fetchAuthors="fetchAuthors"
    @close="isDeleteAuthorOpen = false"
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

const authors = ref<any>([]);
const totalAuthors = ref<number>(0);

const isAddAuthorOpen = ref(false);
const isEditAuthorOpen = ref(false);
const isEditAuthorId = ref("");
const isDeleteAuthorOpen = ref(false);
const deleteAuthorId = ref("");
const deleteAuthorName = ref("");

async function fetchAuthors() {
  const { getAuthors } = useAuthorAdmin();

  clearStates();

  states.value.isLoading = true;
  const respone = await getAuthors({
    take: pageQuery.value.take,
    skip: pageQuery.value.skip,
    search: pageQuery.value.search,
  });

  authors.value = respone?.data?.authors ?? [];
  totalAuthors.value = respone?.data?.totalAuthor ?? 0;

  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
}

const searchAuthor = debounce(async () => {
  states.value.isLoading = true;
  pageQuery.value.skip = 0;
  await fetchAuthors();
  states.value.isLoading = false;
}, 500);

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}

onMounted(async () => {
  await fetchAuthors();
});

definePageMeta({
  middleware: "admin-only-middleware",
});
</script>
