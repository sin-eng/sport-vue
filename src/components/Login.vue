<template>
    <div class="login_container">
        <div class="login_box">
            <div class="login_avatar">
                <img src="../assets/logo.png" alt="" style="width: 100px;height: 100px">
            </div>
            <div class="login_form">
                <el-form ref="loginformRef" :model="loginForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="iconfont iconuser-fill"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" prefix-icon="iconfont icon3" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="login_btns">
                <el-button plain @click="login">登录</el-button>
                <el-button type="primary" plain @click="reset">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 重置表单
            reset: function () {
                this.$refs.loginformRef.resetFields()
            },
            login: function () {
                this.$refs.loginformRef.validate(async (valid) => {
                    if (!valid) {
                        this.reset()
                        return;
                    } else {
                        const {data: res} = await this.$http.post("/login", this.loginForm)
                        if (res.flag == "ok") {
                            this.$message.success("登录成功！！！")
                            window.sessionStorage.setItem("user",res.user)
                            this.$router.push({path: "/home"})
                        } else {
                            this.$message.error("登录失败！！！")
                        }
                    }
                })
            }


        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        height: 100%;
        background: #2b4b6b;
    }

    .login_box {
        width: 450px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 30%;
        /*  margin-left: -225px;
          margin-top: -150px;*/
        //反方向移动物体，其基点默认为元素 中心点
        transform: translate(-50%, -30%);
        background: white;
        border-radius: 5px;

        .login_avatar {
            margin: 0 auto;
            width: 130px;
            height: 130px;

            img {
                width: 100%;
                height: 100%;
            }
        }

    }

    .login_btns {
        display: flex;
        padding: 0 10px;
        justify-content: flex-end;
    }

    .login_form {
        box-sizing: border-box;
        // 前面一个是上下边距，后面是左右边距
        padding: 0 10px;

    }
</style>