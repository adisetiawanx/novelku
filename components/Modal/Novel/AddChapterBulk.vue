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
          <HeadlessDialogPanel class="w-full max-w-6xl rounded bg-white p-5">
            <HeadlessDialogTitle
              class="font-medium text-primary-dark border-b pb-3"
              >Add New Chapter (Bulk Upload)</HeadlessDialogTitle
            >

            <HeadlessDialogDescription class="mt-3">
              <div class="grid grid-cols-4 items-center gap-y-3 gap-x-5">
                <div
                  class="col-span-4 border border-red-500 bg-red-200 rounded p-3 w-fit"
                >
                  <p class="font-medium text-sm mb-2">
                    The Structure must be like this:
                  </p>
                  <img src="/assets/example-chapter-bulk.png" />
                </div>
                <input
                  id="chapter_bulk_input"
                  @change="changeChapterBulk"
                  type="file"
                  accept=".zip,.rar"
                  class="col-span-4 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />

                <UILoadingSpinner v-if="states.isLoading" />
                <button
                  v-else
                  @click="postChapters"
                  class="col-span-1 w-full bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
                >
                  Publish
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
              </div>
            </HeadlessDialogDescription>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
const props = defineProps({
  isOpen: Boolean,
  novelId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "fetchNovel"]);

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const chapterInput = ref({
  fileBulk: null as any,
});

function changeChapterBulk(e: any) {
  chapterInput.value.fileBulk = e.target.files[0];
}

async function postChapters() {
  const { createChapterBulk } = useChapterAdmin();

  clearStates();

  states.value.isLoading = true;
  const respone = await createChapterBulk(
    chapterInput.value.fileBulk,
    props.novelId
  );
  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;

  if (states.value.success) {
    clearInput();
  }

  emit("fetchNovel");
}

function clearInput() {
  chapterInput.value.fileBulk = null;
  (document.getElementById("chapter_bulk_input") as HTMLInputElement).value =
    "";
}

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}
</script>
