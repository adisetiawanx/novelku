<template>
  <NuxtLayout name="main-layout">
    <div class="container space-y-10">
      <ListNovelFeatured title="Novel Ongoing" :novel-status="'ONGOING'" />
      <ListNovelFeatured title="Novel Tamat" :novel-status="'COMPLETED'" />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
