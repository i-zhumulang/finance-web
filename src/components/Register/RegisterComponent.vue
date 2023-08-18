<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance, ComponentPublicInstance } from "vue";
import RegisterClass from "@/typescripts/Register/RegisterClass";
import { useRouter } from "vue-router";

export default {
  name: "RegisterComponent",
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const currentClass = new RegisterClass();
    currentClass.proxy = instance.proxy as ComponentPublicInstance;
    currentClass.router = useRouter();

    return {currentClass};
  }
}
</script>

<template>
  <div class="container">
    <!-- form表单容器 -->
    <div class="forms-container">
      <div class="register">
        <!-- 注册 -->
        <el-row class="register-form">
          <el-col :span="24">
            <el-row>
              <el-col :span="24" class="register-form-header">
                <h1>注册</h1>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form
                    :ref="currentClass.formRef"
                    :model="currentClass.data"
                    :rules="currentClass.rule"
                    @submit.prevent="currentClass.register(currentClass.formRef.value)"
                >
                  <el-form-item prop="account">
                    <el-input
                        size="large"
                        v-model="currentClass.data.account"
                        placeholder="请输入手机号码"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                        size="large"
                        v-model="currentClass.data.password"
                        type="password"
                        placeholder="请输入密码"
                    />
                  </el-form-item>
                  <el-form-item prop="passwordConfirm">
                    <el-input
                        size="large"
                        v-model="currentClass.data.passwordConfirm"
                        type="password"
                        placeholder="请再次输入密码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                        size="large"
                        type="primary"
                        native-type="submit"
                        class="submit-btn"
                    >注册
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="tip-area">
                <p>已有帐号？ <a @click="currentClass.toLogin()">去登录</a></p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 左右切换动画 -->
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>以人为镜,可明得失, 以代码为镜,可通逻辑!</h3>
          <p>学习编程,让你的生活更有趣</p>
        </div>
        <img
            src="@/assets/img/register/register.png"
            class="image"
            alt="注册"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.register {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 70%;
  width: 25%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

/* register */
.register-form {
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}

.register-form-header {
  text-align: center;
}

.submit-btn {
  width: 100%;
}

.tip-area {
  text-align: right;
  font-size: 15px;
  color: #333;
}

.tip-area p a {
  cursor: pointer;
  color: #409eff;
}
</style>