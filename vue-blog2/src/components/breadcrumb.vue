<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/admin' }">管理首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{ path }}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script type="es6">
	export default {
		name: 'breadcrumb',
		props: {
			path: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="stylus">
	.breadcrumb
		position:absolute;
		left:20px;
		top:10px;
</style>