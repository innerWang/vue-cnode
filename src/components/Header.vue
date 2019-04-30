<template>
  <div id="headerbar">
    <router-link :to="{name:'root'}">
      <img src="../assets/logo.svg" alt="cnode_svg">
    </router-link>
    <ul id="login" class="active list" v-if="!loggedIn">
      <li><a href="#" onclick="return false">首页</a></li>
      <li><a href="#" onclick="return false">未读消息</a></li>
      <li><a href="#" onclick="return false">新手入门</a></li>
      <li><a href="#" onclick="return false">API</a></li>
      <li><a href="#" onclick="return false">注册</a></li>
      <li><a href="#" onclick="return false">登录</a></li>
    </ul>
    <ul id="logout" class="list" v-else>
      <li><a href="#">首页</a></li>
      <li><a href="#">未读消息</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">设置</a></li>
      <li><a href="#">退出</a></li>
    </ul> 
  </div>
</template>
<script>
export default {
  name:'headerbar',
  data: function(){
    return {
      loggedIn: false
    }
  }
}
</script>

<style scoped>
  #headerbar{
    background: #444;
    height: 50px;
    display: flex;
    padding: 0 20px;
  }

  #headerbar > a{
    max-width: 120px;
    margin-left: 10px;
    margin-top: 8px;
  }
  #headerbar > a>img{
     min-width: 120px; 
  }
  .list{
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .list>li{
    padding: 5px 10px;
    flex-shrink: 0;
  }

  .list li a{
    color: #ccc;
    font-size: 14px;
  }

  .list li a:hover{
    color: #fff;
  }
</style>

