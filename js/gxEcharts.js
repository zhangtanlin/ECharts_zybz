;(function($){
  $.fn.echartLineBar = function (options) {
    var defaults = [];
    var opts = $.extend({}, defaults, options);
    console.log(opts)
    //取值
    var chart = echarts.init(document.getElementById(this[0].id), null, {});
    var name = opts.name;
    var legendData = opts.legend;
    var xAxisData = opts.xAxis;
    //定义值
    var yAxis = [],series = [];

    //设置y轴两条竖线显示还是一条竖线显示
    if(opts.series.length > 1){
      yAxis = [
        {
          type : 'value',
          axisLabel : {
            formatter: '{value}'
          },
          axisLine:{
            lineStyle:{
              color:'#2eb3ff'//y轴【左侧】颜色
            }
          },
          axisLabel:{
            color:'#fff'//X轴刻度标签颜色
          },
          axisTick:{
            show:false//y轴【左侧】刻度不显示
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#5C5C5C'//横向分割线颜色
            }
          }
        },
        {
          type : 'value',
          position: 'right',
          axisLabel : {
            formatter: '{value}%'
          },
          axisLine:{
            lineStyle:{
              color:'#2eb3ff'//y轴【右侧】颜色
            }
          },
          axisLabel:{
            color:'#fff'//y轴刻度标签颜色
          },
          axisTick:{
            show:false//y轴【右侧】刻度不显示
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#5C5C5C'//横向分割线颜色
            }
          }
        }
      ];
    }else{
      yAxis = [
        {
          type : 'value',
          axisLabel : {
            formatter: '{value}'
          },
          axisLine:{
            lineStyle:{
              color:'#2eb3ff'//y轴【左侧】颜色
            }
          },
          axisLabel:{
            color:'#fff'//X轴刻度标签颜色
          },
          axisTick:{
            show:false//y轴【左侧】刻度不显示
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#5C5C5C'//横向分割线颜色
            }
          }
        }
      ];
    }

    //循环添加series数据
    for(var i=0;i<opts.series.length;i++){
      var seriesData = opts.series;
      var data = {};
      var barColor = [
        new echarts.graphic.LinearGradient(0, 0, 0, .8, [{
          offset: 0,
          color: '#CD3B37'
        }, {
          offset: 1,
          color: '#9C2D2A'
        }]),
        new echarts.graphic.LinearGradient(0, 0, 0, .8, [{
          offset: 0,
          color: '#3A7BCA'
        }, {
          offset: 1,
          color: '#2C5D98'
        }])
      ];
      var lineColor = ['#8064A2','#9BBB59'];
      //判断是柱状图显示还是折线显示
      if(seriesData[i].type == "bar"){
        var barColor = i%2==1?barColor[0]:barColor[1];
        data = {
          name:seriesData[i].name,
          type:seriesData[i].type,
          data:seriesData[i].data,
          itemStyle:{
            normal:{
              color:barColor
            }
          }
        }
        series.push(data);
      }else if(seriesData[i].type == "line"){
        var lineColor = i%2==1?lineColor[0]:lineColor[1];
        data = {
          name:seriesData[i].name,
          type:seriesData[i].type,
          yAxisIndex: 1,
          data:seriesData[i].data,
          lineStyle:{
          normal:{
            color: lineColor,//线条颜色
              width: 5//线条宽度
          },
        },
          itemStyle:{
            normal:{
              color: lineColor//折点边线颜色
            }
          },
          symbol:'circle',//折点样式
            symbolSize:16//折点大小
        }
        series.push(data);
      }
    }

    //设置echarts的参数
    chart.setOption({
      title:{
        text:name,
        textStyle:{
          color:'#fff',
          lineHeight:40,
          rich:{
            a:{
              lineHeight:40
            }
          }
        },
        left:'center'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:legendData,
        bottom: '10px',
        textStyle:{
          color:'#fff'
        }
      },
      xAxis : [
        {
          show:true,
          type : 'category',
          data : xAxisData,
          axisLine:{
            show:true,
            lineStyle:{
              color:'#A5A5A5'//X轴颜色
            }
          },
          axisTick:{
            show:false//X轴刻度不显示
          },
          axisLabel:{
            color:'#fff'//X轴刻度标签颜色
          }
        }
      ],
      yAxis : yAxis,
      series : series
    });

    return this;

  }
})(jQuery);