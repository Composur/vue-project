<template>
  <ListItem class="list-item-experience">
    <div class="heading">
      <span class="company" contenteditable="true">{{ company }}</span>
      <span class="job" contenteditable="true">{{ job }}</span>
      <span class="date" contenteditable="true">{{ date }}</span>
    </div>
    <p contenteditable="true">
     {{work}}
    </p>
  </ListItem>
</template>
<script>
  import ListItem from '@/components/list-item'
  export default {
    name: 'ListItemExperience',
    components: {
      ListItem
    },
    props: {
      company: {
        type: String,
        default: ''
      },
      job: {
        type: String,
        default: ''
      },
      date: {
        type: String,
        default: ''
      },
      work: {
        type: String,
        default: '1、负责AMSS系统（angular+nodejs+MongoDB）的开发，使用bootstrap等搭建前台页面，负责定制化图标的制作，负责导出报表的制作，负责数据库的搭建维护。2、负责AMSS网站(前端React+Antd、后端NodeJS+MongoDB)（http://www.amssasia.com.cn/）搭建与后期维护。3、负责项目的上线后期的维护'
      }
    }
  }
</script>
<style lang="less">
  .list-item-experience{
    .heading{
      font-size: 18px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .company{
        width: 40%
      }
      .job{
        width: 35%;
      }
      .date{
        width: 25%;
        text-align: right;
      }
    }
  }
</style>
