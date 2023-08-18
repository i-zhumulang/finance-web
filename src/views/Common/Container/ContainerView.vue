<script lang="ts">
import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance, ComponentPublicInstance } from "vue";
import ContainerClass from "@/typescripts/Common/Container/ContainerClass";
import { useRouter } from "vue-router";

export default {
  name: "ContainerView",
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const containerClass = new ContainerClass();
    containerClass.proxy = instance.proxy as ComponentPublicInstance;
    containerClass.router = useRouter();
    containerClass.init();

    return {containerClass};
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-left">
          <img src="@/assets/logo.png" alt="logo" width="200" height="200"/>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              text-color="#fff"
              router
              :default-active="containerClass.getAsideActivePath()"
              class="el-menu-vertical-demo"
          >
            <el-sub-menu
                v-for="aside in containerClass.data.aside"
                :index="aside.id + ''"
                :key="aside.id"
            >
              <template #title>
                <span>{{ aside.name_zh }} </span>
              </template>
              <el-menu-item
                  v-for="children in aside.children"
                  :index="containerClass.getUri(children.component)"
                  :key="children.id"
                  @click="containerClass.setAsideActivePath(children.component.toString())"
              >{{ children.name_zh }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
}

/* 顶部样式 */
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
}

.el-header .header-left {
  height: 60px;
  display: flex;
  align-items: center;
}

/* 侧边栏样式 */
.el-aside {
  background-color: #333744;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
}

.el-aside .el-menu {
  border-right: none;
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 右侧内容体样式 */
.el-main {
  background-color: #eaedf1;
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  padding: 10px;
  overflow-y: scroll;
}
</style>