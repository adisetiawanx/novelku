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
          <HeadlessDialogPanel class="w-full max-w-3xl rounded bg-white p-5">
            <HeadlessDialogTitle
              class="font-medium text-primary-dark border-b pb-3"
              >Edit New Tag</HeadlessDialogTitle
            >
            <div class="w-full mt-2">
              <p
                @click="clearChanges"
                class="text-sm text-right text-primary hover:underline cursor-pointer"
              >
                Clear Changes
              </p>
            </div>
            <HeadlessDialogDescription class="mt-3">
              <div class="grid grid-cols-4 items-center gap-y-3 gap-x-5">
                <input
                  v-model="tagInput.name"
                  type="text"
                  spellcheck="false"
                  class="col-span-4 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Name"
                />
                <UILoadingSpinner v-if="states.isLoading" />
                <button
                  v-else
                  @click="editTag"
                  class="col-span-1 w-full bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
                >
                  Save
                </button>
                <div class="col-span-3 w-full">
                  <UISuccessWrapper
                    v-if="states.success && !states.isLoading"
                    >{{ states.success }}</UISuccessWrapper
                  >
                  <UIErrorWrapper v-if="states.error && !states.isLoading">{{
                    states.error
                  }}</UIErrorWrapper>
                </div>
                <div v-if="novels" class="col-span-4 border-t pt-2">
                  <input
                    @input="searchNovel"
                    type="text"
                    class="text-sm mb-2 border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Search novel..."
                  />
                  <p
                    v-if="novels.length === 0"
                    class="text-sm italic text-gray-600"
                  >
                    No related novel found.
                  </p>
                  <div v-else class="grid gap-3 grid-cols-1">
                    <div
                      v-for="novel in novels"
                      class="flex justify-between items-center gap-5 bg-gray-50 hover:bg-white border rounded px-3 py-2 w-full hover:text-primary"
                    >
                      <a
                        :href="`/novel/${novel.slug}`"
                        target="_blank"
                        class="cursor-pointer hover:underline text-sm"
                      >
                        {{ novel.title }}
                      </a>
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
import { debounce } from "lodash-es";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  tagId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close", "fetchTags"]);

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const tagInput = ref({
  name: "",
});

const tagOriginalData = ref({
  name: "",
  novels: [] as any[],
});

const novels = ref([] as any[]);

async function editTag() {
  const { updateTag } = useTagAdmin();

  clearStates();

  states.value.isLoading = true;
  const respone = await updateTag({
    id: props.tagId,
    name: tagInput.value.name,
  });
  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;

  emit("fetchTags");
}

async function fetchTag() {
  const { getTagById } = useTagAdmin();

  clearStates();

  states.value.isLoading = true;
  const respone = await getTagById(props.tagId);
  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;

  tagOriginalData.value.name = respone!.data!.tag?.name ?? "";
  tagOriginalData.value.novels = respone!.data?.novels ?? [];
  tagInput.value.name = respone!.data!.tag?.name ?? "";
  novels.value = respone!.data?.novels ?? [];
}

function clearChanges() {
  tagInput.value.name = tagOriginalData.value.name;
}

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}

const searchNovel = debounce((event: any) => {
  let filteredNovels = [];
  const search = event.target.value.toLowerCase();
  if (!event.target.value) {
    filteredNovels = tagOriginalData.value.novels;
  } else {
    filteredNovels = tagOriginalData.value.novels.filter((chapter: any) =>
      chapter.title.toLowerCase().includes(search)
    );
  }
  novels.value = filteredNovels;
  console.log(novels.value);
}, 500);

onMounted(async () => {
  await fetchTag();
});
</script>
