<template>
  <div id="articleList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="正在加载">
    </div>
    <div class="lists" v-else>
      <div class="listHeader">
        <span class="active">全部</span>
        <span>精华</span>
        <span>分享</span>
        <span>问答</span>
        <span>招聘</span>
        <span>客户端测试</span>
      </div>
      <ul>
        <li v-for="article in articleLists" :key="article.id">
          <img :src="article.author.avatar_url" :alt="article.author.loginname">
          <span class="count">
            <span class="reply">{{article.reply_count}}</span>/
            <span class="visit">{{article.visit_count}}</span>
          </span>
          <span :class="[{active: article.good || article.top},'tab']">{{getTab(article) }}</span>
          <span class="title">
            <router-link
              :to="{
              name:'get_content',
              params:{
                id: article.id,
                name: article.author.loginname
              }
              }"
            >{{article.title}}</router-link>
          </span>
          <span class="time">{{ article.last_reply_at | formatDate}}</span>
        </li>
      </ul>
      <div id="paginator"><Pagination @handleList="renderlist"/></div>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination';
export default {
  name: "ArticleList",
  components:{
    Pagination
  },
  data: function() {
    return {
      isLoading: true,
      articleLists: [],
      currentPage: 1
    };
  },
  methods: {
    getList() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params:{
            page: this.currentPage,
            limit: 20
          }
        })
        .then(res => {
          this.articleLists = res.data.data;
          this.isLoading = false;
          //debugger
        })
        .catch(e => {
          console.log(e);
          throw new Error(e);
        });
    },
    getTab: function(article) {
      if (article.top) {
        return "置顶";
      } else if (article.good) {
        return "精华";
      } else if (article.tab === "share") {
        return "分享";
      } else if (article.tab === "ask") {
        return "问答";
      } else if (article.tab === "job") {
        return "招聘";
      } else {
        return "";
      }
    },
    renderlist(value){
      this.currentPage = value;
      this.getList()
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getList();
  }
};
</script>
<style scoped>

#articleList{
  flex:1;
  width: 90%;
}

.loading {
  padding: 20px;
  text-align: center;
}

.loading > img{
   height: 300px;
}

.listHeader {
  background: #f6f6f6;
  padding: 10px;
  border-radius: 3px 3px 0 0;
}

#paginator{
  background: #fff;
  padding: 10px;
  border-radius: 0px 0px 3px 3px;
}

.listHeader > span {
  font-size: 14px;
  padding: 3px 4px;
  margin: 0 10px;
  color: #80bd01;
  cursor: pointer;
}

.listHeader > span:hover {
  color: #005580;
}

.listHeader > span.active {
  color: #fff;
  background: #80bd01;
  border-radius: 3px;
}

li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  background: #fff;
}

li:hover {
  background: #f6f6f6;
}
li > * {
  flex-shrink: 0;
}

li > img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

li > .count {
  width: 70px;
  text-align: center;
}

li > .count > .reply {
  color: #9e78c0;
  font-size: 14px;
}

li > .count > .visit {
  color: #b4b4b4;
  font-size: 10px;
}

li > .tab {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  color: #999;
  background: #e5e5e5;
}

li > .tab.active {
  color: #fff;
  background: #80bd01;
}

li > .title {
  color: #333;
  font-size: 16px;
  max-width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 10px;
}

li > .title:hover {
  text-decoration: underline;
}

li > .time {
  font-size: 12px;
  color: #778087;
  margin-left: auto;
}
</style>
