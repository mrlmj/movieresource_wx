// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      showClearSearch: false,
      value: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      value: options.searchValue,
      showClearSearch: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }
})