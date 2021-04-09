<template>
    <el-container class="m-container">
        <el-header>
            <div class="m-header">
                <img src="../assets/logo.png" alt="">
                <span>MK platform</span>
            </div>
            <el-button @click="loginout" type="info" size="mini">安全退出</el-button>
        </el-header>

        <el-container>

            <el-aside :width="isCollapse?'64px':'200px'">

                <div v-model="isCollapse" class="toggle-button" @click="toggle">|||</div>
                <!--unique-opened-->
                <!--:collapse-transition="false"  侧边栏关闭无动画-->
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                         active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition="false" unique-opened
                         :router="true">
                    <el-submenu :index="index+''" v-for="(item,index) in menuList" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.title}}</span>
                        </template>

                        <el-menu-item :index="it.path" v-for="(it,inx) in item.slist">
                            <template slot="title">
                                <i class="el-icon-apple"></i>
                                <span>{{item.title}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>


            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
    export default {
        name: "Home",
        created() {
            this.getMenuList()
        },
        data() {
            return {
                menuList: [],
                isCollapse: true

            }
        },
        methods: {
            loginout: function () {
                window.sessionStorage.clear()
                this.$router.push("/login")
            },
            getMenuList: async function () {
                const {data: res} = await this.$http.get("/menu")
                if (res.flag != 200) return this.$message.error("获取菜单失败")
                this.menuList = res.menu
            },
            toggle() {
                this.isCollapse = !this.isCollapse
            }

        }

    }
</script>

<style scoped>
    .m-container {
        height: 100%;
        width: 100%;
    }

    .m-header {
        display: flex;
        align-items: center;
    }

    .toggle-button {
        background: #4a5064;
        line-height: 24px;
        font-size: 10px;
        /*鼠标在上面显示小手*/
        cursor: pointer;
    }

    img {
        width: 55px;
        height: 55px;
    }

    .el-header {
        background-color: #373d41;
        /*字体颜色*/
        color: #fff;
        display: flex;
        /*左右贴边*/
        justify-content: space-between;
        font-size: 20px;
    }


    .el-button {
        align-items: center;
        padding: 10px;
        margin: 10px;
    }

    .el-menu {
        border-right: none;
    }

    .el-aside {
        background-color: #333744;
        color: #333;
        text-align: center;

    }

    .el-main {
        background-color: #eaedf1;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>