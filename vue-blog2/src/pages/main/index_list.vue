<template>
  <div class="articleList">

    <div class="article" v-for="content in data.contents" v-bind:title="message">
      <div class="article-time">{{ content.addTime }}</div>
      <div class="article-title" v-bind:title="message">
        <router-link :to="{path:'/view', query: {id: content._id}}">{{ content.title }}</router-link>
      </div>
      <div class="line"></div>
      <div class="article-body">
        <p class="article-info">
          <span>类别: <el-tag type="primary">{{ content.category.name }}</el-tag></span>
          <span>阅读量: <el-tag type="primary">{{ content.views }}</el-tag></span>
          <span>评论: <el-tag type="primary">{{ content.comments.length }}</el-tag></span>
        </p>
        <p class="summary">{{ content.description }}</p>
        <router-link :to="{path:'/view', query: {id: content._id}}" class="more" >阅读全文</router-link>
      </div>
    </div>


    <nav class="v-pager" v-if="data.pages>0">
      <ul>
        <li @click="previous" v-if="data.page > 1"><span class="enable">上一页</span></li>
        <li v-else><span class="disable">上一页</span></li>
        <li>
          {{data.page}}/{{data.pages}}
        </li>
        <li @click="next" v-if="data.page < data.pages"><span class="enable">下一页</span></li>
        <li v-else><span class="disable">下一页</span></li>
      </ul>
    </nav>
    <div v-else>抱歉！这个版块暂时还没有内容。</div>

  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        data: {
          contents: [],
          count: 0,
          limit: 0,
          pages: 0,
          page: 1,
          message: '页面加载于 ' + new Date().toLocaleString()
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let id = this.$route.query['id'] || '';
        this.$http.get('http://'+this.$url+':8081/category?id=' + id + '&page=' + this.data.page).then(response => {
          response.data.contents.forEach((content) => {
            content.addTime = this.formatDate(content.addTime);
          })
          this.data = response.data;
        }, response => {
          console.log('error:' + response);
        })
      },
      previous() {
        this.data.page = this.data.page - 1;
        if (this.data.page < 1) {
          this.data.page = 1;
          return;
        }
        this.getData();
      },
      next() {
        this.data.page = this.data.page + 1;
        if (this.data.page > this.data.pages) {
          this.data.page = this.data.pages;
          return;
        }
        this.getData();
      },
    },
    watch: { //避免同级路由（如收藏的歌单之间相互跳转url变化但是组件不变化）相互跳转组件不刷新
      '$route' (to, from) {
        this.getData();
      }
    },
  }
</script>

<style lang="stylus">
.line{
  border-bottom:1px solid rgba(7,17,27,0.2)
  margin-bottom:4px;
}
.articleList
    .article
      padding: 16px 20px 0;
      border-radius: 3px;
      background-color #fff;
      box-shadow:0 1px 2px rgba(151,151,151,0.58);
      margin-bottom 20px;
      min-height: 250px;
      .article-time
        margin-bottom: 5px;
        line-height: 24px;
        font-weight: bold;
        color: #727272;
      .article-title
        font-size: 24px;
        line-height: 32px;
        font-weight : 400;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &>a
          color:#000;
          text-decoration: none;
          &:hover
            border-bottom: 1px solid #42b983;
      .article-body
        padding:5px;
        .article-info
          font-size:12px;
          color: #777;
        .summary
          font-size: 14px;
          height: 80px
          padding-bottom: 20px;
          line-height: 1.8;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        .more
          display:inline-block;
          width:150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #42b983;
          border-radius: 3px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
    .v-pager
    	color:#42B983;
    	// position:absolute;
    	width:100%;
    	&>ul
    		display:flex;
    		&>li
    			flex:1;
    			text-align:center;
    			.enable
    				cursor:pointer;
				.disable
					cursor:pointer;			
</style>
