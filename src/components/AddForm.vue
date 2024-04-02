<template>
  <el-form 
    ref="ruleFormRef" 
    :model="ruleForm" 
    status-icon 
    :rules="rules"
    label-width="auto" 
    label-position="top"
  >
    <div class="flex flex-wrap gap-5">
      <div class="flex flex-wrap flex-1 gap-5">
        <el-form-item
          prop="userId"
          class="flex-1 min-w-[200px]"
        >
          <el-input
            v-model.number="ruleForm.userId"
            type="text"
            autocomplete="off"
            placeholder="User id"
          />
        </el-form-item>

        <el-form-item
          prop="title"
          class="flex-1 min-w-[200px]"
        >
          <el-input
            v-model="ruleForm.title"
            type="text"
            autocomplete="off"
            placeholder="Title"
          />
        </el-form-item>
      </div>
 
      <el-button
        type="success"
        :loading
        class="self-start"
        @click="submitForm(ruleFormRef)"
      >
        Add todo
      </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { apiService } from '@/services/api.service'

const emit = defineEmits(['added-todo'])

const ruleFormRef = ref()
const loading = ref(false)

const ruleForm = reactive({
  userId: '',
  title: '',
  completed: false
})

const rules = reactive({
  userId: [
    { required: true, message: 'Please input user id', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: 'Please only numbers', trigger: 'change' }
  ],
  title: [{ required: true, message: 'Please input title', trigger: 'blur' }]
})

function submitForm(formEl) {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true

        const res = await apiService.addTodo(ruleForm)

        emit('added-todo', res)

        ruleFormRef.value.resetFields()
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