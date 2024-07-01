<template>
  <HeadlessTransitionRoot :show="sidebarOpen">
    <HeadlessDialog
      as="div"
      class="relative z-50 lg:hidden"
      @close="sidebarOpen = false"
    >
      <HeadlessTransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 flex">
        <HeadlessTransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <HeadlessDialogPanel
            class="relative mr-16 flex w-full max-w-xs flex-1"
          >
            <HeadlessTransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </HeadlessTransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
            >
              <div class="flex h-16 shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="/assets/novelku-logo.png"
                  alt="Novelku"
                />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <NuxtLink
                          :to="item.href"
                          :class="[
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          ]"
                        >
                          <component
                            :is="item.icon"
                            :class="[
                              item.current
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            ]"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="text-xs font-semibold leading-6 text-gray-400">
                      Your teams
                    </div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li v-for="service in services" :key="service.name">
                        <NuxtLink
                          :href="service.href"
                          :class="[
                            service.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          ]"
                        >
                          <component
                            :is="service.icon"
                            :class="[
                              service.current
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            ]"
                            aria-hidden="true"
                          />
                          <span class="truncate">{{ service.name }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a
                      href="#"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
    >
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src="/assets/novelku-logo.png" alt="Novelku" />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              Manage
            </div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="item in services" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <a
              href="#"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Cog6ToothIcon
                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="lg:pl-72">
    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div class="relative flex flex-1 self-center">
          <slot name="title" />
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Separator -->
          <div
            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <!-- Profile dropdown -->
          <HeadlessMenu as="div" class="relative">
            <HeadlessMenuButton class="-m-1.5 flex items-center p-1.5">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full bg-gray-50"
                :src="user.profileImageUrl"
                :alt="user.name"
              />
              <span class="hidden lg:flex lg:items-center">
                <span
                  class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                  >{{ user.name }}</span
                >
                <ChevronDownIcon
                  class="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </HeadlessMenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <HeadlessMenuItems
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <HeadlessMenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >{{ item.name }}</a
                  >
                </HeadlessMenuItem>
                <HeadlessMenuItem>
                  <button
                    class="text-red-500 px-3 py-1 text-sm leading-6 hover:bg-gray-50 w-full text-left"
                  >
                    Sign Out
                  </button>
                </HeadlessMenuItem>
              </HeadlessMenuItems>
            </transition>
          </HeadlessMenu>
        </div>
      </div>
    </div>

    <div
      class="sticky top-16 z-20 flex shrink-0 items-center gap-x-4 border-gray-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <slot name="sticky" />
    </div>
    <main class="py-6">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot name="content" />
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {
  Bars3Icon,
  BellIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  ChatBubbleBottomCenterIcon,
  HashtagIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

const adminPath = "/admin";
const user = userInCookie();

const navigation = ref([
  {
    name: "Dashboard",
    href: `${adminPath}/dashboard`,
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Novel",
    href: `${adminPath}/novel`,
    icon: BookOpenIcon,
    current: false,
  },
  {
    name: "Genre",
    href: `${adminPath}/genre`,
    icon: DocumentDuplicateIcon,
    current: false,
  },

  {
    name: "Author",
    href: `${adminPath}/author`,
    icon: PencilIcon,
    current: false,
  },
  {
    name: "Tag",
    href: `${adminPath}/tag`,
    icon: HashtagIcon,
    current: false,
  },
]);

const services = ref([
  {
    name: "Media File",
    href: `${adminPath}/media`,
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: "User",
    href: `${adminPath}/user`,
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Comment",
    href: `${adminPath}/comment`,
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
]);

const userNavigation = [{ name: "View Website", href: "/" }];

const sidebarOpen = ref(false);
const route = useRoute();

onMounted(() => {
  navigation.value.forEach((nav) => {
    nav.current = false;
  });

  services.value.forEach((nav) => {
    nav.current = false;
  });

  // Navigation
  if (route.path === `${adminPath}/dashboard`) {
    navigation.value.find((nav) => nav.name === "Dashboard")!.current = true;
  }
  if (route.path === `${adminPath}/novel`) {
    navigation.value.find((nav) => nav.name === "Novel")!.current = true;
  }
  if (route.path === `${adminPath}/genre`) {
    navigation.value.find((nav) => nav.name === "Genre")!.current = true;
  }
  if (route.path === `${adminPath}/author`) {
    navigation.value.find((nav) => nav.name === "Author")!.current = true;
  }
  if (route.path === `${adminPath}/tag`) {
    navigation.value.find((nav) => nav.name === "Tag")!.current = true;
  }

  // Management
  if (route.path === `${adminPath}/media`) {
    services.value.find((nav) => nav.name === "Media File")!.current = true;
  }
  if (route.path === `${adminPath}/user`) {
    services.value.find((nav) => nav.name === "User")!.current = true;
  }
  if (route.path === `${adminPath}/comment`) {
    services.value.find((nav) => nav.name === "Comment")!.current = true;
  }
});
</script>
