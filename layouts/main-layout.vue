<template>
  <header
    class="bg-primary-darker text-primary-light flex items-center min-h-[90px] border-b border-[#252525]"
  >
    <div class="container flex justify-between items-center">
      <div class="flex items-center justify-between gap-10">
        <img
          src="https://novelku.id/wp-content/uploads/2022/03/logo-novelku.id-fix.png"
          alt="Logo"
          class="w-[250px]"
        />
        <nav>
          <ul class="flex gap-5 items-center font-medium">
            <li class="flex gap-1.5 items-center hover:text-primary transition">
              <BookOpenIcon class="w-6 h-6" />
              <NuxtLink class="underline underline-offset-2" to="/"
                >Ongoing</NuxtLink
              >
            </li>
            <li class="flex gap-1.5 items-center hover:text-primary transition">
              <AcademicCapIcon class="w-6 h-6" />
              <NuxtLink class="underline underline-offset-2" to="/"
                >Tamat</NuxtLink
              >
            </li>
            <li class="flex gap-1.5 items-center hover:text-primary transition">
              <BookmarkSquareIcon class="w-6 h-6" />
              <NuxtLink class="underline underline-offset-2" to="/"
                >Korea</NuxtLink
              >
            </li>
            <li class="flex gap-1.5 items-center hover:text-primary transition">
              <BookmarkSquareIcon class="w-6 h-6" />
              <NuxtLink class="underline underline-offset-2" to="/"
                >China</NuxtLink
              >
            </li>
            <li class="flex gap-1.5 items-center hover:text-primary transition">
              <BookmarkSquareIcon class="w-6 h-6" />
              <NuxtLink class="underline underline-offset-2" to="/"
                >Jepang</NuxtLink
              >
            </li>
            <button class="inline-flex gap-1.5 hover:text-primary transition">
              <MagnifyingGlassIcon class="w-5 h-5" />
              <span class="font-normal">Search Novel...</span>
            </button>
          </ul>
        </nav>
      </div>
      <div>
        <button
          @click="login"
          class="inline-flex gap-1.5 items-center bg-primary text-primary-light px-4 py-1.5 rounded-md font-medium uppercase hover:bg-primary-light hover:text-primary-dark transition"
        >
          <UserIcon class="w-5 h-5" />
          Login
        </button>
      </div>
    </div>
  </header>
  <main class="bg-primary-darker py-5 text-primary-light">
    <slot />
  </main>
  <footer
    class="bg-primary-darker text-primary-light border-t border-[#252525]"
  >
    <div class="container py-5">
      <p class="text-center text-sm">
        &copy; 2024 Novelku.id. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {
  BookOpenIcon,
  AcademicCapIcon,
  BookmarkSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/solid";

const { login } = useAuth();
</script>
