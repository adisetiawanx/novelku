<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Genre</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-initial pr-5">
          <button
            @click="isOpen = true"
            class="inline-flex items-center gap-2 shadow px-5 py-1.5 rounded font-medium bg-primary hover:bg-primary/80 hover text-white"
          >
            <PlusCircleIcon class="w-6" /><span class="text-sm"
              >Media File</span
            >
          </button>
        </div>
        <div class="border-l pl-5 flex-1">
          <input
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search Media File..."
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-7 gap-5">
        <div class="col-span-1 border pb-5" v-for="image in 14">
          <img
            src="https://via.placeholder.com/150"
            alt="genre"
            class="w-full"
          />
          <div class="px-3">
            <p class="text-center mt-5 text-sm font-medium line-clamp-1">
              Image name
            </p>
            <button
              class="inline-flex justify-center text-xs font-medium text-blue-500 w-full text-center mt-2 border py-1.5 rounded-lg shadow-sm bg-white hover:bg-gray-50"
            >
              Copy Url
            </button>
          </div>
        </div>
      </div>
      <div
        id="navigation"
        class="flex justify-between items-center w-full border px-6 py-4 text-sm mt-3"
      >
        <div class="flex-initial pr-5">
          <span class="text-gray-600">Showing 1 to 10 of 50 entries</span>
        </div>
        <div class="border-l pl-5 flex-1">
          <div class="flex items-center gap-3">
            <button
              class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline"
            >
              Previous
            </button>
            <button
              class="px-3 py-1 border rounded font-medium text-blue-600 hover:underline"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </template>
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
      <HeadlessDialog @close="setIsOpen" class="relative z-[500]">
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
                >Add New Genre</HeadlessDialogTitle
              >

              <HeadlessDialogDescription class="mt-3">
                <div class="grid grid-cols-4 items-center gap-y-3 gap-x-5">
                  <input
                    type="file"
                    spellcheck="false"
                    class="col-span-4 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Name"
                  />
                  <button
                    class="col-span-1 w-full bg-primary hover:bg-primary-hover py-1 text-white font-medium rounded"
                  >
                    Upload
                  </button>
                  <div
                    class="col-span-3 bg-green-200 border border-green-500 rounded py-1 px-2 flex justify-center"
                  >
                    <p class="text-sm">
                      Successfully created new genre!<span
                        class="ml-2 font-semibold"
                        >Action</span
                      >
                    </p>
                  </div>
                </div>
              </HeadlessDialogDescription>
            </HeadlessDialogPanel>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

const isOpen = ref(false);

function setIsOpen(value: boolean) {
  isOpen.value = value;
}
</script>
