//index.js
//获取应用实例
var app = getApp()

var isLoadingMore = false;

Page({
  data: {
    page: 1,
    movies:[]
  },
  onShow: function(options) {
    wx.showNavigationBarLoading();
    requestMovies(this);
  },
  loadMore: function() {
    if (!isLoadingMore) {
      console.log("loadmore...");
      wx.showLoading({
        title: '努力加载中...',
        mask: true
      });
      isLoadingMore = true;
      requestMovies(this);
    }
  },
  itemClick: function(event){
    var movie_id = event.currentTarget.dataset.movieId;
    console.log("movieid:" + movie_id);
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movie_id
    })
  }
})

function requestMovies(that){
  setTimeout(function(){
    wx.request({
      url: 'http://localhost:3000/api/movies/all/all/all/10/' + that.data.page,
      success: function (res) {
        that.setData({
          movies: that.data.movies.concat(res.data),
          page: that.data.page + 1
        });
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        isLoadingMore = false;
      }
    })
  },200);
  
}
