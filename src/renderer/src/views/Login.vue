<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const formData = ref({})
const formDataRef = ref()


const isLogin = ref(true)
const changeOpType = () => {
  isLogin.value = !isLogin.value
  console.log('isLogin :', isLogin.value);
  // 渲染进程给主进程发送登录状态
  window.loginOrRegister.isLogin(isLogin.value)
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = {};
    clearVerify();
  })
}

// 获取验证码



const errorMsg = ref(null)

const sumbit = () => {

  // 清空校验
  clearVerify();

  // 检查用户输入
  if (!checkValue('checkEmail', formData.value.email, '请输入正确邮箱')) { //s@qq.com
    return
  }

  if (!isLogin.value && !checkValue(null, formData.value.nickName, '请输入昵称')) {
    return
  }

  if (!checkValue('checkPassword', formData.value.password, '密码为数字、字母、特殊字符8-12位')) { //sas234445$
    return
  }

  if (!isLogin.value && formData.value.password != formData.value.rePassword) {
    errorMsg.value = '两次密码不一致'
    return
  }

  if (!checkValue(null, formData.value.checkcode, '请输入正确验证码')) {
    return
  }
}

// 检查用户输入是否合法
const checkValue = (type, value, msg) => {

  debugger // 可以打开页面调试 不需要在前端手动打断点

  if (proxy.Utils.isEmpty(value)) {
    errorMsg.value = msg
    return false
  }

  if (type && !proxy.Verify[type](value)) {
    errorMsg.value = msg
    return false
  }
  return true
}

const clearVerify = () => {
  errorMsg.value = null
}
</script>

<template>
  <div class="login-panel">
    <div class="title drag">EasyChat</div>
    <div class="login-form">
      <div class="error-msg">{{ errorMsg }}</div>
      <el-form :model="formData" ref="formDataRef" label-width="0px" @submit.prevent>
        <!-- 邮箱输入 -->
        <el-form-item prop="email">
          <el-input clearable placeholder="请输入邮箱" maxLength="25" v-model.trim="formData.email" @focus="clearVerify">
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册 昵称输入 -->
        <el-form-item prop="nickName" v-if="!isLogin">
          <el-input clearable placeholder="请输入昵称" maxLength="15" v-model.trim="formData.nickName" @focus="clearVerify">
            <template #prefix>
              <span class="iconfont icon-user-nick"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input show-password clearable placeholder="请输入密码" v-model.trim="formData.password" @focus="clearVerify">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <!--注册 再次 密码输入 -->
        <el-form-item prop="rePassword" v-if="!isLogin">
          <el-input show-password clearable placeholder="请再次输入密码" v-model.trim="formData.rePassword"
            @focus="clearVerify">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 验证码输入 -->
        <el-form-item prop="checkcode">
          <el-input clearable placeholder="请输入验证码" v-model.trim="formData.checkcode" @focus="clearVerify">
            <template #prefix>
              <span class="iconfont icon-checkcode"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item prop="login">
          <el-button type="primary" class="login-btn" @click="sumbit">{{ isLogin ? '登录' : '注册' }}</el-button>
        </el-form-item>
        <div class="bottom-link">
          <span class="a-link" @click="changeOpType">{{ isLogin ? '没有账号?' : '已有账号?' }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.email-select {
  width: 250px;
}

.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 300px;
  }
}

.login-panel {
  background: #fff;
  border-radius: 3px;
  border: 1px soild #ddd;

  .title {
    height: 30px;
    padding: 5px 0px 0px 10px;
  }

  .login-form {
    padding: 0px 15px 29px 15px;

    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: none;
    }

    .el-form-item {
      border-bottom: 1px solid #ddd;
    }

    .email-panel {
      align-items: center;
      width: 100%;
      display: flex;

      .input {
        flex: 1;
      }

      .icon-down {
        margin-left: 3px;
        width: 16px;
        cursor: pointer;
        border: none;
      }
    }
  }

  .error-msg {
    line-height: 30px;
    height: 30px;
    color: #fb7373;
  }

  .check-code-panel {
    display: flex;

    .check-code {
      cursor: pointer;
      width: 120px;
      margin-left: 5px;
    }
  }

  .login-btn {
    margin-top: 20px;
    width: 100%;
    background: #07c160;
    height: 36px;
    font-size: 16px;
  }

  .bottom-link {
    text-align: right;
  }
}
</style>
