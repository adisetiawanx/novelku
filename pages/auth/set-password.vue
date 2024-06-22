<template>
  <div class="h-screen flex items-center justify-center px-5">
    <form @submit.prevent="handleUpdatePassword" class="border p-5">
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
            v-model="userInput.password"
            :type="showPassword ? 'text' : 'password'"
            spellcheck="false"
            class="col-span-2 text-sm border w-full border-gray-300 rounded px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            placeholder="New password"
            @input="preventInput"
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
            v-model="userInput.confirmPassword"
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
      <div class="mt-4">
        <div v-if="states.error" class="text-red-500 text-sm">
          {{ states.error }}
        </div>
        <div v-if="states.success" class="text-green-500 text-sm">
          {{ states.success }}
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

const userInput = ref({
  password: "",
  confirmPassword: "",
});

const states = ref({
  isLoading: false,
  success: "" as string | null,
  error: "" as string | null,
});

const showPassword = ref(false);

const preventInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\s/g, "");
};

const handleUpdatePassword = async () => {
  states.value.success = "";
  states.value.error = "";
  states.value.isLoading = true;

  if (!userInput.value.password || !userInput.value.confirmPassword) {
    states.value.error = "Password tidak boleh kosong";
    states.value.isLoading = false;
    return;
  }

  if (userInput.value.password.length < 6) {
    states.value.error = "Password minimal 6 karakter";
    states.value.isLoading = false;
    return;
  }

  if (userInput.value.password !== userInput.value.confirmPassword) {
    states.value.error = "Password tidak sama";
    states.value.isLoading = false;
    return;
  }

  const { data: respone, error } = await useFetch("/api/auth/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + useCookie("access_token").value,
    },
    body: {
      password: userInput.value.password,
      confirm_password: userInput.value.confirmPassword,
    },
  });

  if (error.value) {
    states.value.error = error.value.message;
    states.value.isLoading = false;
    return;
  }

  if (respone.value) {
    states.value.success = respone.value.msg;
    states.value.isLoading = false;

    const callbackUrl = useCookie("callback_url").value;
    return navigateTo(callbackUrl || "/", {
      replace: true,
      external: true,
    });
  }
};
</script>
