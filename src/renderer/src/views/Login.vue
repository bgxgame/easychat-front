<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'

const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <el-button type="primary" @click=''> 按钮</el-button>
  </div>
</template>

<style scoped lang="less">

</style>
