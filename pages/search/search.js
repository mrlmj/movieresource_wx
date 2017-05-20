// search.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    page: 1,
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
      search: {
        value: options.searchValue,
        showClearSearch: true
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    requestSearchMovies(this);
  },
  searchFocus: function () {
    this.setData({
      search: {
        showClearSearch: true
      }
    });
  },
  searchBlur: function () {
    this.setData({
      search: {
        showClearSearch: false
      }
    });
  },
  clearSearch: function () {
    console.log("clear")
    this.setData({
      search: {
        value: ""
      }
    });
  },
  searchSubmit: function (event) {
    console.log(event.detail.value);
    this.setData({
      page: 1,
      movies: [],
      search: {
        value: event.detail.value,
        showClearSearch: true
      }
    });
    requestSearchMovies(this);
  },
  itemClick: function (event) {
    var movie_id = event.currentTarget.dataset.movieId;
    console.log("movieid:" + movie_id);
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movie_id
    })
  }
})

function requestSearchMovies(that) {
  wx.request({
    url: app.constants.base_url + 'search/' + that.data.search.value + "/10/" + that.data.page,
    success: function (res) {
      console.log(res.data);
      that.setData({
        movies: that.data.movies.concat(res.data),
        page: that.data.page + 1
      });
    }
  })
}