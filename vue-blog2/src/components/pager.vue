<template>
	<nav class="v-pager">
	    <ul>
	        <li @click="previous" v-if="page>1"><span class="enable">上一页</span></li>
	        <li v-else><span class="disable">上一页</span></li>
	        <li>
	            一共有 {{count}} 条数据, 每页显示 {{limit}} 条数据, 一共 {{pages}} 页, 当前第 {{page}} 页
	        </li>
	        <li @click="next" v-if="page<pages"><span class="enable">下一页</span></li>
	        <li v-else><span class="disable">下一页</span></li>
	    </ul>
	</nav>
</template>

<script type="es6">
	export default {
		name: 'pager',
		props: {
			url: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				count: 0,
		        limit: 0,
		        pages: 0,
		        page: 1,
			}
		},
		created(){
			this.getData();
		},
		methods: {
			getData() {
		    	this.$http.get(this.url + this.page).then(response => {
		    		this.count = response.data.count;
		    		this.limit = response.data.limit;
		    		this.page = response.data.page;
		    		this.pages = response.data.pages;
		    		this.$emit('getData', response);
		    	}, response => {
		          console.log('error:' + response);
		      })
		    },
			previous() {
		    	this.page = this.page - 1;
		    	if (this.page < 1) {
		    		this.page = 1;
		    		return;
		    	}
		    	this.getData(this.page, this.url);
		    },
		    next() {
		    	this.page = this.page + 1;
		    	if (this.page > this.pages) {
		    		this.page = this.pages;
		    		return;
		    	}
		    	this.getData(this.page, this.url);
		    }
		}
	}
</script>

<style lang="stylus">
.v-pager
	position:absolute;
	bottom:5px;
	width:100%;
	&>ul
		display:flex;
		&>li
			flex:1;
			text-align:center;
			.enable
				cursor:pointer;
			.disable
				cursor:default;
				color:#ccc;
</style>