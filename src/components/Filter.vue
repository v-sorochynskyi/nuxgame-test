<template>
  <div class="flex flex-wrap gap-5">
    <el-select
      :model-value="status"
      placeholder="Filter by status"
      class="flex-1 min-w-[200px]"
      @update:model-value="$emit('update:status', $event)"
    >
      <el-option
        v-for="item in statusOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-select
      :model-value="userId"
      placeholder="Filter by user"
      class="flex-1 min-w-[200px]"
      @update:model-value="$emit('update:userId', $event)"
    >
      <el-option
        label="All"
        :value="-1"
      />
      <el-option
        v-for="item in userIdOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input
      :model-value="title"
      placeholder="Search by title"
      class="flex-1 min-w-[200px]"
      @update:model-value="$emit('update:title', $event)"
    />
  </div>
</template>

<script setup>
  defineProps({
    title: String,
    userId: Number,
    status: String,
    userIdOptions: Array
  })

  defineEmits(['update:title', 'update:userId', 'update:status'])

  const statusOptions = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'uncompleted',
    label: 'Uncompleted',
  },
  {
    value: 'favorites',
    label: 'Favorites',
  },
]
</script>