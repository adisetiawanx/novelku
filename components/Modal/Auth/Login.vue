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
          <HeadlessDialogPanel
            class="w-full max-w-2xl rounded bg-white py-8 px-10 shadow-md"
          >
            <HeadlessDialogTitle
              class="font-medium text-primary-dark text-center"
              >Login ke Novelku.id
            </HeadlessDialogTitle>

            <HeadlessDialogDescription class="mt-3">
              <form class="space-y-4">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <input
                    id="email"
                    type="email"
                    v-model="userInput.email"
                    class="mt-1 py-1.5 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <input
                    id="password"
                    type="password"
                    v-model="userInput.password"
                    class="mt-1 py-1.5 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <button
                    type="button"
                    @click="handleLogin"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    :disabled="states.isLoading"
                  >
                    <UILoadingSpinner v-if="states.isLoading" />
                    <span v-else>Login</span>
                  </button>
                </div>
                <div v-if="states.error" class="text-red-500 text-sm mt-2">
                  {{ states.error }}
                </div>
                <div v-if="states.success" class="text-green-500 text-sm mt-2">
                  {{ states.success }}
                </div>
              </form>
              <div class="flex gap-3 items-center my-5">
                <div class="w-full h-[1px] bg-gray-300 flex-1"></div>
                <p
                  class="text-sm text-primary-dark text-center flex-initial font-medium"
                >
                  or
                </p>
                <div class="w-full h-[1px] bg-gray-300 flex-1"></div>
              </div>
              <div>
                <button
                  @click="login"
                  class="w-full flex items-center gap-2 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary-dark bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none"
                >
                  <img
                    src="/assets/google-logo.png "
                    alt="Google Logo"
                    class="w-6 h-6"
                  />
                  <span>Login atau Daftar dengan Google</span>
                </button>
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
});

const emit = defineEmits(["close"]);

const { login } = useAuth();
const userInput = ref({
  email: "",
  password: "",
});

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

async function handleLogin() {
  states.value.isLoading = true;
}

function clearStates() {
  states.value.success = null;
  states.value.error = null;
  states.value.isLoading = false;
}
</script>
