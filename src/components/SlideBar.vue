<template>
  <div id="slidebar">
    <section class="userinfo">
      <div class="header">
        作者
      </div>
      <div class="detail">
        <div class="name">
          <img :src="userinfo.avatar_url" alt>
          <span class="text">{{userinfo.loginname}}</span>
        </div>
        <div class="score">积分：{{userinfo.score}}</div>
      </div>
    </section>

    <section class="other-topics">
      <div class="header">
        作者其他话题
      </div>
      <ul class="detail">
        <li v-for="t in getCreateTopicsLimitsFive" :key="t.id" class="item">
          <router-link :to="{
            name:'get_content',
            params:{
              id:t.id
            }
          }">
            {{t.title}}
          </router-link>
        </li>
      </ul>
    </section>

    
  </div>
</template>
<script>
export default {
  name:'Slidebar',
  data(){
    return {
      userinfo:{}
    }
  },
  methods:{
    getUserinfo(){
      //console.log(this.$route.params)
      //debugger
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      .then(res=>{
        this.userinfo = res.data.data
      })
      .catch(e=>{
        console.log(e)
      })
    }
  },
  computed:{
    getCreateTopicsLimitsFive(){
      //const sixTopics = this.userinfo.recent_topics.slice(0,6)
      if(this.userinfo.recent_topics){
        return this.userinfo.recent_topics.slice(0,6)
                  .filter(t=> t.id !== this.$route.params.id).slice(0,5)
      }
      return []
      
    }
  },
  beforeMount(){
    this.getUserinfo()
  }
}
</script>

<style scoped>
  #slidebar{
    width: 300px;
    margin-left: 20px;
    flex-shrink: 0;
  }

  #slidebar section{
    background: #fff;
    margin-bottom: 20px;
    border-radius: 3px;
  }

  section .header{
    background: #f6f6f6;
    color: #444;
    border-radius: 3px 3px 0 0;
    padding: 10px;
  }

  section .detail{
    padding: 10px;
  }

  .name{
    display: flex;
    align-items: center;
  }

  .name img{
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }

  .name .text{
    color:#778087;
    margin-left: 12px;
  }


  .item{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .other-topics .item a{
    color: #778087;
    line-height: 2em;
  }

</style>
