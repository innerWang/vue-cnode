<template>
  <div id="app">
    <HeaderBar/>
    <main>
      <router-view name="main"></router-view>
      <router-view name="slidebar"></router-view>
    </main>
  </div>
</template>


<script>
import HeaderBar from './components/Header'
//import ArticleList from './components/Articlelist'
export default {
  name:'app',
  components:{
    HeaderBar
  }
}
</script>


<style>

*{
  margin:0;
  padding:0;
}

body{
  background: #e1e1e1;
  font-size:14px;
/*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句*/
  word-wrap: wrap;
  word-break: break-word;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif;
}

ul li{
  list-style: none;
}

a{
  text-decoration: none;
  color:  #222;
}

main{
  width:90%;
  margin:15px auto;
  max-width: 1200px;
  min-height: 400px;
  min-width: 780px;
  display: flex;
}

/* main.clearfix{
  content: '';
  display: block;
  clear: both;
} */

@media (max-width:979px){
  main > #slidebar{
    display: none;
  }
}
</style>
