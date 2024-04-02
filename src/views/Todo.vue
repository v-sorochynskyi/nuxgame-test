<template>
  <div
    v-loading="loading"
    class="h-full p-5 flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 overflow-hidden max-w-[1440px] mx-auto"
  >
    <el-card
      shadow="never"
      class="md:max-w-[400px] w-full self-start shrink-0 flex-none"
    >
      <template #header>
        <span>{{ userInfo.name }}</span>
      </template>

      <p>Email: {{ userInfo.email }}</p>
      <p>Phone: {{ userInfo.phone }}</p>
      <p>Website: {{ userInfo.website }}</p>
    </el-card>

    <div class="grow flex-auto overflow-hidden flex flex-col">
      <Filter
        v-model:title="title"
        v-model:status="status"
        v-model:userId="userId"
        :user-id-options
        class="mb-5 "
      />

      <el-scrollbar height="100%">
        <el-card
          shadow="never"
        >
          <ul>
            <li
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="border-b py-5 flex items-center"
            >
              <IconCheckCircleOutline
                v-if="todo.completed"
                class="text-success shrink-0"
              />
              <IconCloseCircleOutline
                v-else
                class="text-error shrink-0"
              />

              <span class="ml-5">{{ todo.title }}</span>
              <button
                class="ml-auto flex items-center"
                @click="favoriteClickHandler(todo)"
              >
                <IconStar
                  class="text-xl"
                  :class="{'text-yellow': isFavorite(todo)}"
                />
              </button>
            </li>
            <li v-show="!filteredTodos.length">
              No items
            </li>
          </ul>
        </el-card>
      </el-scrollbar>


      <AddForm
        class="mt-5"
        @added-todo="addTodoHandler"
      />
    </div>
  </div>
</template>
Clementina DuBuque
024-648-3804
<script setup>
import Filter from '@/components/Filter.vue'
import AddForm from '@/components/AddForm.vue'

import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { useUserStore } from '@/stores/user.js'
import { apiService } from '@/services/api.service'

import { ElNotification } from 'element-plus'


const { userInfo } = useUserStore()
const loading = ref(false)
const todos = ref([])
const users = ref()
const status = ref('')
const userId = ref(-1)
const title = ref('')
const userIdOptions = ref([])
const favorites = useStorage('favorites', [])



const filteredByStatus = computed(() => {
  switch (status.value) {
    case 'completed': return todos.value.filter(todo => todo.completed)
    case 'uncompleted': return todos.value.filter(todo => !todo.completed)
    case 'favorites': return todos.value.filter(todo => favorites.value.includes(todo.id))

    default: return todos.value
  }
})

const filteredByUserId = computed(() => {
  if (userId.value < 0) return filteredByStatus.value

  return filteredByStatus.value.filter((todo) => todo.userId === userId.value)
})

const filteredTodos = computed(() => {
  return filteredByUserId.value.filter((todo) => todo.title.includes(title.value))
})

getTodos()

async function getTodos () {
  try {
    loading.value = true

    const [usersRes, todosRes] = await Promise.all([apiService.getUsers(), apiService.getTodos()])

    users.value = usersRes.reduce((acc, user) => {
      acc[user.id] = user

      return acc
    }, {})

    todos.value = todosRes

    userIdOptions.value = [...new Set(todos.value.map(item => item.userId))].map(id => ({value: id, label: users.value[id].name}))
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: 'Something went wrong',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

function favoriteClickHandler (todo) {
  if (favorites.value.includes(todo.id)) {
    favorites.value = favorites.value.filter(id => id !== todo.id)
  } else {
    favorites.value.push(todo.id)
  }
}

function isFavorite (todo) {
  return favorites.value.includes(todo.id)
}

function addTodoHandler (todo) {
  todos.value.push(todo)

  ElNotification({
    title: 'Success',
    message: 'Todo successfully added',
    type: 'success',
  })
}
</script>