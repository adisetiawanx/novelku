<template>
  <div class="h-screen flex items-center justify-center px-5">
    <form class="border p-5">
      <div>
        <h1 class="text-center font-semibold text-lg">
          Buat Password Untuk Akun Anda
        </h1>
        <p class="text-sm text-center">
          Agar bisa login menggunakan <span class="font-medium">email</span> dan
          <span class="font-medium">password</span> di
          <span class="text-primary">Novelku.id</span>
        </p>
      </div>
      <div class="mt-4">
        <label for="password" class="text-sm font-medium">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            spellcheck="false"
            class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="New password"
          />
          <button
            type="button"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            @click="showPassword = !showPassword"
          >
            <EyeIcon v-if="showPassword" class="w-4" />
            <EyeSlashIcon v-else class="w-4" />
          </button>
        </div>
      </div>
      <div class="mt-3">
        <label for="password" class="text-sm font-medium"
          >Confirm Password</label
        >
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            spellcheck="false"
            class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="New confirm password"
          />
          <button
            type="button"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            @click="showPassword = !showPassword"
          >
            <EyeIcon v-if="showPassword" class="w-4" />
            <EyeSlashIcon v-else class="w-4" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="mt-3 w-full bg-primary hover:bg-primary-hover py-1.5 px-5 text-white rounded"
      >
        Set Password
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const showPassword = ref(false);
</script>

<style></style>
