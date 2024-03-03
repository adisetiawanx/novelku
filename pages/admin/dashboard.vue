<template>
  <NuxtLayout name="admin-layout">
    <template #title>
      <h1 class="heading-admin">Dashboard</h1>
    </template>
    <template #content>
      <div class="space-y-3">
        <div class="border p-5">
          <h2>Novel</h2>
          <p class="dashboard__count mt-2 font-medium">96</p>
        </div>
        <div class="border p-5">
          <h2>Users</h2>
          <p class="dashboard__count mt-2 font-medium">164</p>
        </div>
        <div class="border p-5">
          <h2>Comment</h2>
          <p class="dashboard__count mt-2 font-medium">357</p>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
