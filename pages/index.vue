<template>
  <NuxtLayout name="main-layout">
    <div class="container space-y-10">
      <ListNovelHighlight title="Novel Terpopuler" :novel-status="'ONGOING'" />
      <ListNovelFeatured title="Novel Ongoing" :novel-status="'ONGOING'" />
      <ListNovelFeatured title="Novel Tamat" :novel-status="'COMPLETED'" />
      <ListNovel />
      <ListNovelFeatured title="Novel Korea" :novel-status="'ONGOING'" />
      <ListNovelFeatured title="Novel China" :novel-status="'COMPLETED'" />
      <ListNovelFeatured title="Novel Jepang" :novel-status="'COMPLETED'" />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
