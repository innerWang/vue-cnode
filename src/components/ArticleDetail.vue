<template>
  <div id="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="正在加载">
    </div>
    <div class="detail" v-else>
      <div class="topic">
        <div class="header">
          <div class="header-title">{{detail.title}}</div>
          <div class="header-detail">
            <span>发布于 {{detail.create_at | formatDate}}</span>
            <span>作者 {{detail.author.loginname}}</span>
            <span>{{detail.visit_count}} 次浏览</span>
            <span>来自 {{ getTab(detail)}}</span>
          </div>
        </div>
        <div v-html="detail.content" class="markdown-body content"></div>
      </div>
      <div class="replies">
        <div class="reply-count">{{detail.replies.length}} 回复</div>
        <ul>
          <li v-for="(reply,idx) in detail.replies" :key="reply.id" class="reply-item">
            <span class="reply-header">
              <router-link
                :to="{
                name: 'userinfo',
                params:{
                  name: reply.author.loginname
                }
              }"
              >
                <img :src="reply.author.avatar_url" alt>
              </router-link>
              <span class="loginname">{{reply.author.loginname}}</span>
              <span class="reply-time">
                {{idx+1}}楼
                <span >{{reply.create_at | formatDate}}</span>
              </span>
              <span v-if="reply.author.loginname === detail.author.loginname" class="label">作者</span>
            </span>
            <div class="reply-content markdown-body" v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ArticleDetail",
  data: function() {
    return {
      isLoading: true,
      detail: {}
    };
  },
  methods: {
    getArticle() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.detail = res.data.data;
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
          throw new Error(e);
        });
    },
    getTab: function(article) {
      if (article.tab === "share") {
        return "分享";
      } else if (article.tab === "ask") {
        return "问答";
      } else if (article.tab === "job") {
        return "招聘";
      } else if (article.tab === "good") {
        return "精华";
      } else {
        return "";
      }
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticle();
  },
  watch:{
    $route(to,from){
      this.getArticle()
    }
  }
};
</script>

<style>
@import url('../assets/github-markdown.css');
</style>


<style scoped>

#article{
  flex:1 1 0;
  width: 70%;
}

.loading {
  padding: 20px;
  text-align: center;
}

.loading > img{
   height: 300px;
}

.detail {
  background: #fff;
  border-radius: 3px;
}

.topic > .header {
  padding: 10px;
}

.topic > .header > .header-title {
  font-size: 22px;
  margin: 8px 0;
}

.topic > .header > .header-detail > span {
  color: #838383;
  font-size: 12px;
  margin-right: 4px;
}

.header-detail > span:before {
  content: "• ";
}

.topic > .content {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
}

.replies > .reply-count {
  background: #f6f6f6;
  padding: 10px;
}

.replies .reply-item {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}

.reply-header  img {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.reply-item > .reply-header {
  display: flex;
  align-items: center;
}

.reply-header  span {
  margin-left: 4px;
}

.reply-header  .loginname {
  color: #666;
  font-size: 12px;
}

.reply-header > .reply-time {
  color: #0088cc;
  font-size: 10px;
}

 .reply-time>span::before {
  content: "•";
}

.reply-header > .label {
  font-size: 12px;
  background: #6ba44e;
  color: #fff;
  padding: 2px;
}

.reply-item > .reply-content {
  padding-left: 48px;
}


.markdown-body img{
  max-width: 70% !important;
}
</style>
