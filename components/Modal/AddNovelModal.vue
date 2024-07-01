<template>
  <HeadlessTransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <HeadlessDialog @close="emit('close')" class="relative z-[500]">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed inset-0 bg-black/30" />

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex min-h-full items-center justify-center p-4">
          <!-- The actual dialog panel -->
          <HeadlessDialogPanel class="w-full max-w-7xl rounded bg-white p-5">
            <HeadlessDialogTitle
              class="font-medium text-primary-dark border-b pb-3"
              >Add New Novel</HeadlessDialogTitle
            >

            <HeadlessDialogDescription class="mt-3">
              <div class="grid grid-cols-4 items-center gap-y-3 gap-x-1.5">
                <input
                  v-model="novelInput.slug"
                  type="text"
                  spellcheck="false"
                  disabled
                  class="col-span-4 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Slug"
                />
                <input
                  v-model="novelInput.title"
                  type="text"
                  spellcheck="false"
                  class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Title"
                />
                <input
                  v-model="novelInput.alternative_title"
                  type="text"
                  spellcheck="false"
                  class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Alternative Title"
                />
                <textarea
                  v-model="novelInput.synopsis"
                  type="text"
                  spellcheck="false"
                  class="col-span-4 text-sm border min-h-72 w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Synopsis"
                />
                <input
                  v-model="novelInput.rating"
                  type="number"
                  spellcheck="false"
                  class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Rating"
                />
                <input
                  v-model="novelInput.year"
                  type="text"
                  spellcheck="false"
                  class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Year"
                />
                <select
                  v-model="novelInput.type"
                  class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                >
                  <option value="">- Select -</option>
                  <option value="WEB_NOVEL_CHINA">Web Novel China</option>
                  <option value="WEB_NOVEL_KOREA">Web Novel Korea</option>
                  <option value="WEB_NOVEL_JAPAN">Web Novel Japan</option>
                </select>
                <select
                  v-model="novelInput.status"
                  class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                >
                  <option value="">- Select -</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="HIATUS">Hiatus</option>
                </select>

                <div class="col-span-4 flex gap-3">
                  <NuxtImg
                    :src="novelInput.image_url"
                    width="200"
                    class="w-full max-w-[200px] rounded border border-gray-300 object-cover object-center"
                  />
                  <div class="flex-1 space-y-3">
                    <input
                      @change="uploadNovelCover"
                      type="file"
                      class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      v-model="novelInput.genres"
                      type="text"
                      spellcheck="false"
                      class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Genre"
                    />
                    <input
                      v-model="novelInput.authors"
                      type="text"
                      spellcheck="false"
                      class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Author"
                    />
                    <input
                      v-model="novelInput.tags"
                      type="text"
                      spellcheck="false"
                      class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      placeholder="Tag"
                    />
                    <div class="flex gap-3">
                      <button
                        @click="postNovel('DRAFT')"
                        class="w-full border border-primary py-1 text-primary hover:bg-gray-50 font-medium rounded"
                      >
                        Draft
                      </button>
                      <button
                        @click="postNovel('PUBLISHED')"
                        class="w-full bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
                      >
                        Publish
                      </button>
                    </div>
                    <div
                      class="col-span-2 bg-green-200 border border-green-500 rounded py-1 flex justify-center"
                    >
                      <p class="text-sm">
                        Successfully created new novel!<span
                          class="ml-2 font-semibold"
                          >Black King Hunter From The West Side</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </HeadlessDialogDescription>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const novelInput = ref({
  title: "",
  slug: "",
  alternative_title: "",
  synopsis: "",
  rating: 0,
  year: "",
  type: "",
  status: "",
  image_url:
    "https://novelku.id/wp-content/uploads/2023/09/Night-Ranger-193x278.jpg",
  authors: "",
  genres: "",
  tags: "",
});

const uploadNovelCover = async (event: Event) => {
  const { uploadNovelCover } = useNovel();

  states.value.isLoading = true;

  // @ts-expect-error
  const respone = await uploadNovelCover(event.target.files[0]);

  novelInput.value.image_url = respone?.data?.url ?? "";

  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
};

async function postNovel(postStatus: string) {
  const { createNovel } = useNovel();

  states.value.isLoading = true;
  const respone = await createNovel({
    post_status: postStatus,
    title: novelInput.value.title,
    slug: novelInput.value.slug,
    alternative_title: novelInput.value.alternative_title,
    synopsis: novelInput.value.synopsis,
    rating: novelInput.value.rating,
    year: novelInput.value.year,
    type: novelInput.value.type,
    status: novelInput.value.status,
    image_url: novelInput.value.image_url,
    authors: novelInput.value.authors
      .split(",")
      .map((genre) => ({ name: genre.trim() })),
    genres: novelInput.value.genres
      .split(",")
      .map((genre) => ({ name: genre.trim() })),
    tags: novelInput.value.tags
      .split(",")
      .map((genre) => ({ name: genre.trim() })),
  });
  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;
}

watch(
  () => novelInput.value.title,
  (value) => {
    novelInput.value.slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
);
</script>
