<template>
  <div class="brief">
    <div class="avatar">
      <EditImage :src="require('@/assets/logo_name.png')" width="212" height="212" :isCircle="true" class="img"></EditImage>
      <!-- <img src="./assets/photo.png" alt="photo"> -->
      <div class="name" contenteditable="true">Composure</div>
      <div class="job" contenteditable="true">前端工程师</div>
      <div class="location">
        <img src="../assets/location.png"  alt="">
        <div class="location-name" contenteditable="true">深圳</div>
      </div>
    </div>
    <div class="info">
      <ul>
        <li>
          <div class="value" contenteditable="true">CS</div>
          <div class="key" contenteditable="true">网络编程方向</div>
        </li>
        <li>
          <div class="value" contenteditable="true">26</div>
          <div class="key" contenteditable="true">男</div>
        </li>
        <li>
          <div class="value" contenteditable="true">本科</div>
          <div class="key" contenteditable="true">河南理工大学</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import EditImage from '@/components/edit-image'
  export default {
    name: 'Brief',
    components: {
      EditImage
    }
  }
</script>
<style lang="less">
  .brief{
    height: 630px;
    background-color: #f6f7f7;
    .avatar{
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &>.img{
        margin-bottom: 45px;
      }
      .name{
        font-size: 32px;
        margin-bottom: 14px;
      }
      .job{
        font-size: 24px;
        color: #555;
        margin-bottom: 16px;
      }
      .location{
        display: flex;
        align-itmes: center;
        .location-name{
          font-size: 20px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
    }
    .info{
      height: 128px;
      ul{
        height: 100%;
        display: flex;
        border-top: 1px solid #dad8d7;
        border-bottom: 1px solid #dad8d7;
        li:not(:last-child){
          border-right: 1px solid #dad8d7;
        }
        li{
          width: 33.3333333%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          .value{
            margin-bottom: 10px;
            font-size: 24px;
            font-weight: bold;
          }
          .key{
            font-size: 16px;
            font-weight: bold;
            color: #555;
          }
        }
      }
    }
  }
</style>
