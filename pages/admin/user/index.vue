<template>
  <NuxtLayout :name="'admin-layout'">
    <template #title>
      <h1 class="heading-admin">User</h1>
    </template>
    <template #sticky>
      <div class="flex justify-between items-center w-full py-3">
        <div class="flex-1">
          <input
            type="text"
            class="text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="Search user..."
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="relative overflow-x-auto border">
        <table class="w-full text-sm text-left rtl:text-right table-auto">
          <thead class="text-xs uppercase border-b">
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Badges</th>
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
                  >Verified</span
                >
                <NuxtLink to="/" class="hover:text-blue-500"
                  >Kadek Adi Setiawan</NuxtLink
                >
              </td>
              <td class="px-6 py-4">adisetiawanzx@gmail.com</td>
              <td class="px-6 py-4">Investor ~ Sepuh</td>
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
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
const isOpen = ref(false);

function setIsOpen(value: boolean) {
  isOpen.value = value;
}

definePageMeta({
  middleware: "admin-only-middleware",
});
</script>
