<template>
  <div class="flex items-center justify-center h-full">
    <div class="rounded-md overflow-hidden">
      <div class="bg-quick-silver text-center text-granite-grey py-4 leading-5">
        Login
      </div>
      <el-form 
        ref="ruleFormRef" 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        label-width="auto" 
        label-position="top"
        class="max-w-[600px] min-w-[450px] px-5 py-4 bg-silver-sand"
      >
        <p class="text-[15px] leading-none mb-4 text-granite-grey">
          description
        </p>

        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            autocomplete="off"
            placeholder="User name"
          />
        </el-form-item>

        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            type="tel"
            autocomplete="off"
            placeholder="Phone number"
          />
        </el-form-item>

        <el-button
          class="w-full"
          type="success"
          :loading
          @click="submitForm(ruleFormRef)"
        >
          Register
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routeNames } from '@/router'
import { apiService } from '@/services/api.service'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const ruleFormRef = ref()
const loading = ref(false)
const { setUserInfo } = useUserStore()

const ruleForm = reactive({
  name: '',
  phone: ''
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { pattern: /^(?:[a-zA-Z]+\s*)+$/, message: 'Please only letters', trigger: 'change' },
  ],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur' },
    { pattern: /^[^a-zA-Z]*$/, message: 'Please only numbers and symbols', trigger: 'change' }
  ]
})

function submitForm(formEl) {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true

        const users = await apiService.getUsers()

        const matchedUser = users.find((user) => {
          return user.name.toLowerCase() === ruleForm.name.toLowerCase() && user.phone === ruleForm.phone
        })


        if (matchedUser) {
          setUserInfo(matchedUser)
          router.push({ name: routeNames.todo })
        } else {
          ElNotification({
            title: 'Error',
            message: 'Login error',
            type: 'error',
          })
        }

      } catch (e) {
        console.log('e', e)

        ElNotification({
          title: 'Error',
          message: 'Something went wrong',
          type: 'error',
        })
      } finally {
        loading.value = false
      }

    } else {
      return false
    }
  })
}
</script>
