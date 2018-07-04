<template>
  <div id="app">
    <div class="resume">
      <div class="left">
        <Brief></Brief>
        <ContextList title="联系方式" :icon="require('@/assets/title-contact.png')">
          <ListItemInfo title="18682361885" 
                        :image="require('@/assets/contact-phone.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo title="xutong1107@gmail.com" 
                        :image="require('@/assets/contact-mail.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo title="18682361885" 
                        :image="require('@/assets/social-wechat.png')"
                        slot="listItem">           
          </ListItemInfo>
          <ListItemInfo title="18682361885" 
                        :image="require('@/assets/social-qq.png')"
                        slot="listItem">           
          </ListItemInfo>
        </ContextList>
        <ContextList title="SOCIAL" :icon="require('@/assets/title-contact.png')">
          <ListItemInfo title="github.com/Composur" 
                        :image="require('@/assets/social-github.png')"
                        slot="listItem">      
          </ListItemInfo>
          <ListItemInfo title="blog.csdn.net/composurext" 
                        :image="require('@/assets/social-dribbble.png')"
                        slot="listItem">               
          </ListItemInfo>
          <ListItemInfo title="http://t.cn/RdZHudN" 
                        :image="require('@/assets/social-github.png')"
                        slot="listItem">      
          </ListItemInfo>
          <!-- <ListItemInfo title="i.ui.cn/ucenter/122744" 
                        :image="require('@/assets/social-uicn.png')"
                        slot="listItem">      
          </ListItemInfo> -->
        </ContextList>
      </div>
      <div class="right">
        <ContextList title="可编辑的简历">
          <ListItemAbout slot="listItem"></ListItemAbout>
        </ContextList>
        <ContextList title="技能">
          <ListItemSkill slot="listItem" title="JavaScript" :percent="70"></ListItemSkill>
          <ListItemSkill slot="listItem" title="Html5 + css3" :percent="70"></ListItemSkill>
          <ListItemSkill slot="listItem" title="Vue+React" :percent="40"></ListItemSkill>
          <ListItemSkill slot="listItem" title="NodeJS" :percent="40"></ListItemSkill>
        </ContextList>
        <ContextList title="工作经历">
          <ListItemEducation slot="listItem"></ListItemEducation>
          <ListItemEducation slot="listItem" school='富士康科技集团' major='linux运维' date='2016.9-2017.5'></ListItemEducation>
          <ListItemEducation slot="listItem" school='趣分期' major='前端开发工程师' date='2015.9-2016.5'></ListItemEducation>
        </ContextList>
        <ContextList title="项目经验">
          <ListItemExperience slot="listItem" company="ASIA"></ListItemExperience>
          <ListItemExperience slot="listItem" company="ASIA"></ListItemExperience>
          <!-- <ListItemExperience slot="listItem" company="Foxconn"></ListItemExperience> -->
          <ListItemExperience slot="listItem" company="Foxconn"></ListItemExperience>
          <ListItemExperience slot="listItem" company="闪分期" ></ListItemExperience>
          <!-- <ListItemExperience slot="listItem" company="闪分期" ></ListItemExperience> -->
        </ContextList>
      </div>
    </div>
    <!-- <div class="guide">
      <ul>
        <li>
          <img src="./assets/guide_click_left.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>Click On Content</h3>
            <p>To edit text or image</p>
          </div>
        </li>
        <li>
          <img src="./assets/guide_click_right.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>Right Click On Item</h3>
            <p>To delete item</p>
          </div>
        </li>
        <li>
          <img src="./assets/guide_add.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>Click Add Button</h3>
            <p>To add item</p>
          </div>
        </li>
        <li>
          <img src="./assets/guide_sai.png"  alt="">
          <div class="desc">
            <h3>Click Save Button</h3>
            <p>To download resume as image</p>
          </div>
        </li>
      </ul>
    </div> -->
    <button class="sap" @click="saveAsImage">另存为图片</button>
    <div class="footer">
      <a href="https://github.com/Composur" target="_blank">
        <img src="./assets/social-github.png" height="36" width="36" alt="">
      </a>
      vue-resume designed by <a href="https://github.com/Composur" target="_blank">Composure</a>
    </div>
  </div>
</template>

<script>
import ContextList from '@/components/context-list'
import ListItemAbout from '@/components/list-item-about'
import ListItemSkill from '@/components/list-item-skill'
import ListItemEducation from '@/components/list-item-education'
import ListItemExperience from '@/components/list-item-experience'
import ListItemInfo from '@/components/list-item-info'
import html2canvas from '@/assets/js/html2canvas.js'
import FileSaver from 'file-saver'
import Brief from '@/components/brief'

export default {
  name: 'app',
  components: {
    ContextList,
    ListItemAbout,
    ListItemSkill,
    ListItemEducation,
    ListItemExperience,
    ListItemInfo,
    Brief
  },
  methods: {
    saveAsImage: function () {
      let resume = document.querySelector('.resume')
      html2canvas(resume).then(function (canvas) {
        canvas.toBlob(function (blob) {
          FileSaver.saveAs(blob, 'Resume.png')
        })
      })
    }
  }
}
</script>

<style lang="less">
  body{
    padding: 0;
    margin: 0;
  }
  ul{
    padding: 0;
    margin: 0;
    li{
      list-style: none;
    }
  }
  p{
    margin: 0 0 12px 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: white;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    .resume{
      width: 1247px;
      height: 1754px;
      border: 1px solid #dad8d7;
      background-color: white;
      overflow: hidden;
      .left{
        width: 380px;
        height: 100%;
        box-sizing: border-box;
        float: left;
        background-color: #fdfefe;
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
      }
      .right{
        box-sizing: border-box;
        width: 867px;
        float: left;
        padding: 50px 40px;
        p{
          font-size: 20px;
          line-height: 32px;
          color: #555;
          text-align:justify;
        }
      }
      
    }
    button.sap{
      position: absolute;
      top: 65px;
      left: 50%;
      margin-left: 478px;
      background-color: white;
      border: 1px solid #dad8d7;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 4px;
      &:hover{
        background-color: #f8f8f8;
      }
    }
    .guide{
      border: 1px solid #dad8d7;
      width: 1247px;
      margin-top: 15px;
      height: 120px;
      ul{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
          display: flex;
          align-items: center;
          img{
            margin: 0 10px;
          }
          h3{
            margin: 0 0 6px 0;
          }
          p{
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
    .footer{
      line-height: 50px;
      a{
        text-decoration: none;
        color: #4aa74f;
        &:first-child{
          display: block;
          text-align: center;
          line-height: 0;
          margin-top: 15px;
        }
      }
    }
  }

</style>
