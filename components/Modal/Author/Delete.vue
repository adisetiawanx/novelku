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
          <HeadlessDialogPanel class="w-full max-w-2xl rounded bg-white p-5">
            <HeadlessDialogTitle
              class="font-medium text-primary-dark border-b pb-3"
              >Delete:
              <span class="font-normal">{{ props.authorName }}</span>
            </HeadlessDialogTitle>

            <HeadlessDialogDescription class="mt-3">
              <div class="grid grid-cols-4 items-center gap-y-3 gap-x-5">
                <UILoadingSpinner v-if="states.isLoading" />
                <div
                  v-else
                  :class="[
                    states.success ? 'order-2' : '',
                    'col-span-4 flex gap-5',
                  ]"
                >
                  <button
                    v-if="!states.success"
                    @click="emit('close')"
                    class="w-full bg-gray-500 hover:bg-gray-400 py-1 text-white font-medium rounded"
                  >
                    Cancel
                  </button>
                  <button
                    v-if="!states.success"
                    @click="deleteAuthor"
                    class="w-full bg-red-500 hover:bg-red-400 py-1 text-white font-medium rounded"
                  >
                    Delete
                  </button>
                  <button
                    v-if="states.success"
                    @click="
                      emit('close');
                      clearStates();
                    "
                    class="w-full mt-2 bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
                  >
                    Back
                  </button>
                </div>
                <div class="col-span-4 w-full">
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
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "fetchAuthors"]);

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

async function deleteAuthor() {
  const { deleteAuthor } = useAuthor();

  clearStates();

  states.value.isLoading = true;
  const respone = await deleteAuthor(props.authorId);
  states.value.success = respone?.successMessage ?? null;
  states.value.error = respone?.errorMessage ?? null;
  states.value.isLoading = false;

  emit("fetchAuthors");
}

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}
</script>
