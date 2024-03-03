<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">Novel</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-initial pr-5">
          <button
            @click="isOpen = true"
            class="inline-flex items-center gap-2 shadow px-5 py-1.5 rounded font-medium bg-primary hover:bg-primary/80 hover text-white"
          >
            <PlusCircleIcon class="w-6" /><span class="text-sm">Novel</span>
          </button>
        </div>
        <div class="border-l pl-5 flex-1">
          <input
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search novel..."
          />
        </div>
      </div>
    </template>
    <template #content>
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
              v-for="(novel, novelIndex) in 10"
              :class="[
                novelIndex + 1 === 10 ? '' : 'border-b',
                'odd:bg-white even:bg-gray-50',
              ]"
            >
              <td class="px-6 py-4 flex items-center">
                <span
                  class="bg-green-200 border border-green-500 rounded-full text-xs py-0.5 px-2 mr-3 font-medium lowercase"
                  >Completed</span
                ><NuxtLink to="/" class="hover:text-blue-500 line-clamp-1"
                  >Genius Doctor: Black Belly Miss
                </NuxtLink>
                <DocumentCheckIcon class="ml-1 w-4 inline text-primary" />
              </td>
              <td class="px-6 py-4">Web Novel China</td>
              <td class="px-6 py-4">North Night</td>
              <td class="px-6 py-4">
                Action, Adventure, Fantasy, Josei, Romance, Xuanhuan
              </td>
              <td class="px-6 py-4">Novel China, Tamat</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        id="navigation"
        class="flex justify-between items-center w-full border-l border-r border-b px-6 py-4 text-sm"
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
            <HeadlessDialogPanel class="w-full max-w-7xl rounded bg-white p-5">
              <HeadlessDialogTitle
                class="font-medium text-primary-dark border-b pb-3"
                >Add New Novel</HeadlessDialogTitle
              >

              <HeadlessDialogDescription class="mt-3">
                <div class="grid grid-cols-4 items-center gap-y-3 gap-x-1.5">
                  <input
                    type="text"
                    spellcheck="false"
                    class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    spellcheck="false"
                    class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Alternative Title"
                  />
                  <textarea
                    type="text"
                    spellcheck="false"
                    class="col-span-4 text-sm border min-h-72 w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Synopsis"
                  />
                  <input
                    type="number"
                    spellcheck="false"
                    class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Rating"
                  />
                  <input
                    type="text"
                    spellcheck="false"
                    class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="Year"
                  />
                  <select
                    class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  >
                    <option value="WEB_NOVEL_CHINA">Web Novel China</option>
                    <option value="WEB_NOVEL_KOREA">Web Novel Korea</option>
                    <option value="WEB_NOVEL_JAPAN">Web Novel Japan</option>
                  </select>
                  <select
                    class="col-span-1 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  >
                    <option value="WEB_NOVEL_ONGOING">Ongoing</option>
                    <option value="WEB_NOVEL_COMPLETED">Completed</option>
                    <option value="WEB_NOVEL_HIATUS">Hiatus</option>
                  </select>

                  <div class="col-span-4 flex gap-3">
                    <NuxtImg
                      src="https://novelku.id/wp-content/uploads/2023/09/Night-Ranger-193x278.jpg"
                      class="w-full max-w-[200px] rounded border border-gray-300"
                    />
                    <div class="flex-1 space-y-3">
                      <input
                        type="file"
                        class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        spellcheck="false"
                        class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        placeholder="Genre"
                      />
                      <input
                        type="text"
                        spellcheck="false"
                        class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        placeholder="Author"
                      />
                      <input
                        type="text"
                        spellcheck="false"
                        class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        placeholder="Tag"
                      />
                      <div class="flex gap-3">
                        <button
                          class="w-full border border-primary py-1 text-primary hover:bg-gray-50 font-medium rounded"
                        >
                          Draft
                        </button>
                        <button
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
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  PlusCircleIcon,
  DocumentCheckIcon,
  DocumentIcon,
} from "@heroicons/vue/24/solid";

const isOpen = ref(false);

function setIsOpen(value: boolean) {
  isOpen.value = value;
}
</script>
