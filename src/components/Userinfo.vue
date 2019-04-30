<template>
  <div id="userinfo">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="正在加载">
    </div>
    <div  v-else>
      <section id="homepage">
        <div class="header">
          <router-link :to="{
            name:'root'
          }">
            主页 
          </router-link> /
        </div>
        <div class="detail">
          <div class="name">
            <img :src="userinfo.avatar_url" alt>
            <span class="text">{{userinfo.loginname}}</span>
          </div>
          <div class="score">{{userinfo.score}} 积分</div>
          <div class="register-time">注册时间 &nbsp; {{userinfo.create_at | formatDate}}</div>
        </div>
      </section>
      <section id="create-topics">
        <div class="header">最近创建的话题</div>
        <div class="detail" v-if="userinfo.recent_topics.length >0">
          <ul>
            <li v-for="item in userinfo.recent_topics" :key="item.id" class="listItem">
              <img :src="item.author.avatar_url" alt="">
              <span class="title">
                <router-link :to="{
                  name:'get_content',
                  params:{
                    id: item.id
                  }
                }">{{item.title}}</router-link>
              </span>
              <span class="last-reply">{{item.last_reply_at | formatDate}}</span>
            </li>
          </ul>
          <div class="learnmore">查看更多»</div>
        </div>
        <div v-else class="notopics">无话题</div>
        
      </section>
      <section id="reply-topics">
        <div class="header">最近参与的话题</div>
        <div class="detail" v-if="userinfo.recent_replies.length >0">
          <ul>
            <li v-for="item in userinfo.recent_replies" :key="item.id" class="listItem">
              <img :src="item.author.avatar_url" alt="">
              <span class="title">
                <router-link :to="{
                  name:'get_content',
                  params:{
                    id: item.id
                  }
                }">{{item.title}}</router-link>
              </span>
              <span class="last-reply">{{item.last_reply_at | formatDate}}</span>
            </li>
          </ul>
          <div class="learnmore">查看更多»</div>
        </div>
        <div v-else class="notopics">无话题</div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "Userinfo",
  data: function() {
    return {
      isLoading: false,
      userinfo: {}
    };
  },
  methods: {
    getUserinfo() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.userinfo = res.data.data;
        })
        .catch(e => {
          console.log(e);
          throw new Error(e);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserinfo();
  }
};
</script>
<style scoped>

#userinfo{
  flex: 1;
  width: 90%;
}

.loading {
  padding: 20px;
  text-align: center;
}

.loading > img{
   height: 300px;
}

section{
  background: #fff;
  margin-bottom: 20px;
  border-radius: 3px;
}
section > .header{
  padding: 10px;
  background: #f6f6f6;
  font-size: 14px;
  border-radius: 3px 3px 0 0;
}

#homepage > .header a{
  color: #80bd01;
}

section:nth-of-type(1)> .detail{
  padding: 10px;
}

.name > img{
  width: 40px;
  height: 40px;
  vertical-align: middle
}

.name > .text{
  color: #778087;
  margin-left: 10px;
}

.score{
  margin: 10px 0;
}

.register-time{
  color: #ababab;
  margin-bottom: 10px;
}

.listItem{
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.listItem > img{
  width: 30px;
  height: 30px;
}

.listItem > .title{
  margin: 0 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  
}

.listItem > .title > a{
  color: #0088cc;
}

.listItem > .title > a:hover{
  text-decoration: underline;
}

.listItem > .last-reply {
  margin-left: auto;
  flex-shrink: 0;
  color: #777;
  font-size: 12px;
}

.learnmore{
  padding: 10px;
  color: #666;
  cursor: pointer;
}

.notopics{
  padding: 10px;
  color: #666;
}

</style>
