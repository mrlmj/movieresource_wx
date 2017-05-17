// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: "",
    movieInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId: options.movieId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中...',
    });
    requestDetail(this);
  },
  copy: function(event){
    var torrent = event.currentTarget.dataset.torrent
    console.log(torrent);
    wx.setClipboardData({
      data: torrent,
      success: function(res) {
        wx.showToast({
          title: '链接已复制，快去下载吧！',
        })
      }
    })
  }
})

function requestDetail(that) {
  wx.request({
    url: 'http://localhost:3000/api/movies/detail/' + that.data.movieId,
    success: function(res) {
      console.log(res);
      that.setData({
        movieInfo: res.data
      });
      wx.hideLoading();
    }
  });
}