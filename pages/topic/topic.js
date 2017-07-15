/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * 
 *  *Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 */
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');


Page({
  data:{
    text:"Page topic",
    categoriesList:{},
    floatDisplay:"none"
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '代码之城',
      success: function (res) {
        // success
      }
    });
    wx.showLoading({
      title: '正在加载',
      mask:true
    })
   

    this.fetchCategoriesData();
  },
  //获取分类列表
  fetchCategoriesData: function () {
    var self = this;
    self.setData({
      categoriesList: []
    });

    wx.request({
      url: Api.getCategories(),
      success: function (response) {
        self.setData({
          //categoriesList: response.data,

          floatDisplay:"block",

          categoriesList: self.data.categoriesList.concat(response.data.map(function (item,index) {
            // if(item.count==0) {
            //   console.log(item.name);
            //   console.log(index);
            // }
            if (typeof (item.description) == "undefined" || item.description == "") 
            {
              item.description ="../../images/website.png";
            } else {
              var desc = item.description;
              if (desc.indexOf("http") > 0 && desc.indexOf(".jpg") > 0) {
                var realimg = desc.substring(desc.indexOf("http"), desc.indexOf(".jpg")+4);
                item.description = realimg;
              } else {
                item.description = "../../images/website.png";
              }
            }
            return item;        
          })),


        });

        setTimeout(function () {
          wx.hideLoading();
        }, 900)
        wx.hideNavigationBarLoading();;

      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: '分享“代码之城”小程序的专题栏目.',
      path: 'pages/topic/topic',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //跳转至某分类下的文章列表
  redictIndex: function (e) {
    //console.log('查看某类别下的文章');  
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.item;
    var url = '../list/list?categoryID=' + id;
    wx.navigateTo({
      url: url
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onPullDownRefresh: function () {
    
  },
  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})