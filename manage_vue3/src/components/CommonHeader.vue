<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h1 style="color:#fff">首页</h1> -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ name: item.name }">{{item.lable}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" szie="mini">
                <span>
                    <img :src="userImg" class="user">
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'CommonHeader',
    data(){
        return{
            userImg:require('../assets/images/user.png'),
        }
    },
    methods:{
        handleMenu(){
            this.$store.commit('CollapseMenu')
        }
    },
    computed:{
        ...mapState(
            {
                tags: state => state.tab.tabsList
            }
        )
    }
}
</script>

<style scoped>
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-content{
        display: flex;
        align-items: center;
    }
    .l-content .el-button{
        margin-right: 20px;
    }
    .r-content .user{
        width: 40px;
        height: 40px;
        border-radius:50%;
    }
</style>