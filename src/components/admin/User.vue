<template>
    <div style="line-height: 0;text-align: left">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" style="padding: 0px">
            <!--输入框-->
            <el-row :gutter="24" style="margin-top: 10px">
                <el-col :span="8" style="padding-right: 2px">
                    <el-input size="small" placeholder="请输入内容" v-model="pageInfo.query" clearable @clear="getUserList">
                    </el-input>
                </el-col>
                <el-col :span="5" style="padding-left: 2px">
                    <el-input size="small" placeholder="请选择日期" prefix-icon="el-icon-date">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="getUserList">搜索</el-button>
                </el-col>
            </el-row>
            <!--用户列表-->
            <el-table border stripe style="margin-top: 10px" :data="users">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="password" label="密码"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        <!--{{scope.row}}-->
                        <el-switch v-model="scope.row.state" @change="updateState(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <el-button type="warning" icon="el-icon-star-off" size="mini" disabled></el-button>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="sizes,prev, pager, next,jumper,->,total" style="margin-top: 10px"
                           :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" :total="total"
                           :page-sizes="[1,2,4,10]"
                           @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                users: [],
                pageInfo: {query: '', pageNum: 1, pageSize: 5},
                total: 0

            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList: async function () {
                const {data: res} = await this.$http.get('/allUser', {params: this.pageInfo})
                this.users = res.data
                this.total = res.total
            },
            updateState: function (info) {
                this.$http.get(`/updateState?id=${info.id}&state=${info.state}`)
            },
            // 监听pageSize改变的事件
            handleSizeChange(newPageSize) {
                this.pageInfo.pageSize = newPageSize
                this.getUserList(); // 数据发生改变重新申请数据
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPageNum) {
                this.pageInfo.pageNum = newPageNum
                this.getUserList(); // 数据发生改变重新申请数据
            }
        }

    }
</script>

<style lang="less" scoped>


</style>