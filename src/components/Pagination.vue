<template>
  <div class="pagination">
    <button :class="{'disable':isFirstPage}" @click="changePage">首页</button>
    <button :class="{'disable':isFirstPage}" @click="changePage">上一页</button>
    <button v-for="t in list" :key="t" 
    :class="[{active:t == currentPage}]"
    @click="changePage(t)">
      {{t}}
    </button>
    <button :class="{'disable':isLastPage}" @click="changePage">下一页</button>
    <button :class="{'disable':isLastPage}" @click="changePage">末页</button>
  </div>
</template>


<script>
export default {
  name:'Pagination',
  data(){
    return {
      list:[1,2,3,4,5],
      currentPage: 1,
      isFirstPage:true,
      isLastPage:false,
    }
  },
  props:{
    totalpages:{
      type:Number,
      default:10,
    }
  },
  beforeMount(){
    if(this.totalpages < 5){
      this.list=[]
      for(let i=0;i<this.totalpages;i++){
        this.list[i] = i+1;
      }
    }
  },
  methods:{
    changePage(page){
      //console.log(page)
      // 需要注意的是，调用函数时若不传参数，则默认传递事件对象
      if(typeof page !== 'number'){
        const target = page.target;
        switch(target.innerText.trim()){
          case '首页':{
            if(this.totalpages < 5){
              this.list=[]
              for(let i=0;i<this.totalpages;i++){
                this.list[i] = i+1;
              }
            }else{
              this.list=[1,2,3,4,5];
            }
            this.changePage(1)
            break;
          }
          case '上一页':{
            const event = new Event('click');
            document.querySelector('button.active').previousElementSibling.dispatchEvent(event);
            break;
          }
          case '下一页':{
            const event = new Event('click');
            document.querySelector('button.active').nextElementSibling.dispatchEvent(event);
            break;
          }
          case '末页':{
            this.list=[this.totalpages-4,this.totalpages-3,this.totalpages-2,this.totalpages-1,this.totalpages]
            this.list = this.list.filter(t=> t>0);
            this.changePage(this.totalpages)
            break;
          }
          default: break;
        }
        return 
      
      }

      this.currentPage = page
      if(page == this.list[4] && page!= this.totalpages){
        this.list.push(this.list[4]+1);
        this.list.shift();
      }else if(page == this.list[0] && page != 1){
        this.list.unshift(this.list[0]-1);
        this.list.pop()
      }

      if(this.currentPage === 1){
        this.isFirstPage = true;
        this.isLastPage = false;
      }else if(this.currentPage === this.totalpages){
        this.isFirstPage = false;
        this.isLastPage = true;
      }else{
         this.isFirstPage = false;
        this.isLastPage = false;
      }

      this.$emit('handleList',this.currentPage)
    }
  }
}
</script>


<style scoped>

.pagination > button{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size:14px;
  color:#666;
  background: #fff;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
  outline: none;
  margin-right: 4px;
  cursor: pointer;
}

button:hover{
  background: #888;
  color: #fff;
}

button.active{
  background: #444;
  color: #fff;
  border-color: #555;
}

button.disable{
  background: #eee;
  color: #ccc;
  cursor: not-allowed;
}


</style>
