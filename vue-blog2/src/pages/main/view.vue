<template>
  <div class="view" v-if="!load">
    <div class="article">
      <div class="article-title">{{ content.title }}</div>
      <div class="line"></div>
      <div class="article-body">
        <p class="article-info">
          <span>时间: <el-tag type="primary">{{ content.addTime }}</el-tag></span>
          <span>类别: <el-tag type="primary">{{ content.category.name }}</el-tag></span>
          <span>阅读量: <el-tag type="primary">{{ content.views }}</el-tag></span>
          <span>评论: <el-tag type="primary">{{ content.comments.length }}</el-tag></span>
        </p>
        <div v-html="compiledMarkdown" class="content"></div>
      </div>
    </div>
    <div class="Comments-container">
      <div class="text-danger" v-if="Object.keys(user).length == 0">
        登录后方可发表评论
      </div>
      <div class="editing" v-else>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="写下你的评论"
          v-model="editing_comment">
        </el-input>
        <el-button type="primary" @click="onSubmit">发表评论</el-button>
      </div>
      <div class="commentList">
        <h2 class="CommentTopbar-title">{{ content.comments.length }} 条评论</h2>
        <ul>
          <li v-for="comment in content.comments" class="commentItem">
            <p class="commentTopbar">
              <span class="postman">{{ comment.username }}</span>
              <span class="time">{{ comment.postTime }}</span>
            </p>

            <p>
              {{ comment.content }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import marked from 'marked' // 引入markdown模块
  import highlight from 'highlight.js' // 引入highlight
  export default {
    props: {
      user: {
        type: Object,
        default: {},
      }
    },
    data() {
      return {
        load: false,
        content: {},
        editing_comment: "",
      }
    },
    created() {
      highlight.initHighlightingOnLoad();
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
      marked.setOptions({
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });
      this.load = true;
      this.$http.get('/view?contentid=' + this.$route.query['id']).then(response => {
        console.log(response.data);
        this.load = false;
        this.content = response.data.content
        this.content.addTime = this.formatDate(this.content.addTime);
        this.content.comments.reverse();
        this.content.comments.forEach((comment) => {
          comment.postTime = this.formatDate(comment.postTime);
        });
      }, response => {
        console.log('error:' + response);
      })
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.content.content, {sanitize: true})
      }
    },
    methods: {
      onSubmit() {
        if (Object.keys(this.user).length == 0 || this.editing_comment == '') {
          this.$message({
            message: '评论不能为空',
            type: 'warning'
          });
          return;
        }
        this.$http.withCredentials = true;
        this.$http.post('/comment/post', {
          contentid: this.$route.query['id'],
          content: this.editing_comment,
        }).then(response => {
          this.editing_comment = "";
          this.content = response.data.data;
          this.content.comments.reverse();
          this.content.comments.forEach((comment) => {
            comment.postTime = this.formatDate(comment.postTime);
          });
          // console.log(response.data);
        }, response => {
          console.log(response.data);
        })
      },
    }
  }
</script>

<style lang="stylus">
@import '../../common/style/github.css';
@import '../../common/style/markdown.css';

	.view
		font-size:14px;
		.article
			min-height: 100px;
			padding: 35px;
			box-shadow: 0 10px 30px rgba(0,0,0,0.2);
			width:100%;
			margin-bottom:10px;
			border-radius:4px;
			background-color #fff
			border 1px solid #e7eaf2
			.article-title
				font-size:32px;
				line-height:48px;
				font-weight:400;
				margin-bottom:20px;
			.article-body
				.content
					vertical-align: top;
					box-sizing: border-box;
					padding: 0 20px;
					&>pre
						background-color:#eee;
				.article-info
					margin-bottom:40px;
					&>span
						line-height: 14px;
						font-size: 13px;
						font-weight: bold;
						color: #727272;
		.Comments-container
			width:100%;
			box-shadow: 0 10px 30px rgba(0,0,0,0.2);
			background: #fff;
			margin-top: 12px;
			padding:10px;
			overflow: visible;
			border-radius: 4px;
			border:1px solid #e7eaf2;
			.editing
				.el-textarea
					margin-bottom:10px;
			.commentList
				.CommentTopbar-title
					display: inline-block;
					font-size: 15px;
					font-weight: 700;
					color: #1e1e1e;
				&>ul
					display:flex;
					flex-direction: column;
					.commentItem
						flex:1;
						padding: 12px 16px 10px;
						font-size: 15px;
						word-break:break-all;
						border-top:1px solid #e7eaf2;
						.commentTopbar
							.postman
								color: #259;
							.postTime
								color:#8590a6;
</style>
