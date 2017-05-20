// category.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    categories:[],
    time:[],
    countries:[],
    selector: ["all", "all", "all", "all"],
    page: 1,
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestTypes(this);
    requestCategories(this);
    requestTime(this);
    requestCountries(this);
    requestSelectMovies(this, false);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  loadMore: function(){
    console.log("loadmore");
    requestSelectMovies(this, true);
  },
  selectType: function(event) {
    console.log("select type:" + event.target.dataset.type);
    this.data.selector[0] = event.target.dataset.type;
    this.setData({
      selector: this.data.selector
    });
    requestSelectMovies(this, false);
  },
  selectCategory: function (event) {
    console.log("select category:" + event.target.dataset.category);
    this.data.selector[1] = event.target.dataset.category;
    this.setData({
      selector: this.data.selector
    });
    requestSelectMovies(this, false);
  },
  selectTime: function (event) {
    console.log("select time:" + event.target.dataset.time);
    this.data.selector[2] = event.target.dataset.time;
    this.setData({
      selector: this.data.selector
    });
    requestSelectMovies(this, false);
  },
  selectCountry: function (event) {
    console.log("select country:" + event.target.dataset.country);
    this.data.selector[3] = event.target.dataset.country;
    this.setData({
      selector: this.data.selector
    });
    requestSelectMovies(this, false);
  },
  itemClick: function (event) {
    var movie_id = event.currentTarget.dataset.movieId;
    console.log("movieid:" + movie_id);
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movie_id
    })
  },
})

function requestSelectMovies(that, append) {
  if (!append) {
    that.data.page = 1;
  }
  wx.request({
    url: app.constants.base_url + that.data.selector[0] + '/' + that.data.selector[1] + '/' + that.data.selector[2] + '/' + that.data.selector[3]+'/9/'+that.data.page,
    success: function(res) {
      that.setData({
        movies: append ? that.data.movies.concat(res.data) : res.data,
        page: that.data.page + 1
      });
    }
  })
}

function requestTypes(that) {
  wx.request({
    url: app.constants.base_url + 'type',
    success: function (res) {
      console.log(res.data);
      that.setData({
        types: res.data
      });
    }
  });
}

function requestCategories(that){
  wx.request({
    url: app.constants.base_url + 'category',
    success: function (res) {
      that.setData({
        categories: res.data
      });
    }
  });
}

function requestTime(that) {
  wx.request({
    url: app.constants.base_url + 'time',
    success: function (res) {
      that.setData({
        time: res.data
      });
    }
  });
}

function requestCountries(that) {
  wx.request({
    url: app.constants.base_url + 'country',
    success: function (res) {
      that.setData({
        countries: res.data
      });
    }
  });
}