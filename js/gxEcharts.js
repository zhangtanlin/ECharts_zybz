$(document).ready(function(){

  //控制body背景图片大小
  var browserH = $(window).height();
  var browserW = $(window).width();
  $("#echartsBody").css("background-size",browserW+"px "+browserH+"px");

  //控制资源综合保障能力图背景图片大小
  var echartsSpecialH = $(".echartsSpecial").height();
  var echartsSpecialW = $(".echartsSpecial").width();
  $(".echartsSpecial").css("background-size",echartsSpecialW+"px "+echartsSpecialH+"px");

});


$(window).resize(function(){

  //控制body背景图片大小
  var browserH = $(window).height();
  var browserW = $(window).width();
  $("#echartsBody").css("background-size",browserW+"px "+browserH+"px");

  //控制资源综合保障能力图背景图片大小
  var echartsSpecialH = $(".echartsSpecial").height();
  var echartsSpecialW = $(".echartsSpecial").width();
  $(".echartsSpecial").css("background-size",echartsSpecialW+"px "+echartsSpecialH+"px");

});