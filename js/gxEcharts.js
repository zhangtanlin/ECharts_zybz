;(function($){

  $.fn.extend({
    /*
    * 线条和柱状图方法
    * */
    echartLineBar:function (options) {
      var defaults = [];
      var opts = $.extend({}, defaults, options);

      //取值
      var chart = echarts.init(document.getElementById(this[0].id));
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
              formatter: '{value}',
              color:'#fff'//X轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#2eb3ff'//y轴【左侧】颜色
              }
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
              formatter: '{value}',
              color:'#fff'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#2eb3ff'//y轴【右侧】颜色
              }
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
              formatter: '{value}',
              color:'#fff'//X轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#2eb3ff'//y轴【左侧】颜色
              }
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
          {
            type:'line',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
              {offset:0,color:'#CD3B37'},
              {offset:1,color:'#9C2D2A'}
            ]
          },
          {
            type:'line',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
              {offset:0,color:'#3A7BCA'},
              {offset:1,color:'#2C5D98'}
            ]
          }
        ];

        //判断是柱状图显示还是折线显示
        var lineColor = ['#8064A2','#9BBB59'];
        if(seriesData[i].type == "bar"){
          var colorBar = "";
          i%2 == 1 ? colorBar = barColor[0]: colorBar = barColor[1];
          data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            data:seriesData[i].data,
            itemStyle:{
              normal:{
                color:colorBar
              }
            }
          }
          series.push(data);
        }else if(seriesData[i].type == "line"){
          var colorLine = "";
          i%2 == 1 ? colorLine = lineColor[0] : colorLine = lineColor[1];
          data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            yAxisIndex: 1,
            data:seriesData[i].data,
            lineStyle:{
              normal:{
                color: colorLine,//线条颜色
                width: 5//线条宽度
              }
            },
            itemStyle:{
              normal:{
                color: colorLine//折点边线颜色
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
    },

    /*
    * 线条色块方法
    */
    echartLineArea:function(options){
      var defaults = [];
      var opts = $.extend({}, defaults, options);

      //取值
      var echartLineArea = echarts.init(document.getElementById(this[0].id));
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;

      var seriesName = [],seriesData = [],seriesType = [];
      if(opts.series.length == 1){
        seriesName = opts.series[0].name;
        if(opts.series[0].type == "lineArea")seriesType = 'line';
        seriesData = opts.series[0].data;
      }

      echartLineArea.setOption({
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
          trigger:'axis',
          axisPointer:{
            type:'cross'
          }
        },
        legend:{
          show:false,
          data:legendData
        },
        xAxis:{
          type:'category',
          boundaryGap:false,//设置原点为起始点【是否以[1,1]为起始点】
          data:xAxisData,
          axisLine:{
            show:true,
            lineStyle:{
              color:'#8C8C8C'//X轴颜色
            }
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#8C8C8C'//纵向分割线颜色
            }
          },
          axisLabel:{
            rotate:30,//x轴刻度标签旋转
            color:'#fff'//X轴刻度标签颜色
          },
          axisTick:{
            data:'value'
          }
        },
        yAxis:[
          {
            type:'value',
            axisLabel : {
              formatter: '{value}',
              color:'#fff'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#8C8C8C'//y轴字颜色
              }
            },
            axisTick:{
              show:false//y轴【左侧】刻度不显示
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#8C8C8C'//横向分割线颜色
              }
            }
          },
          {
            position: 'right',
            axisLine:{
              lineStyle:{
                color:'#8C8C8C'//y轴【右侧】颜色
              }
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#8C8C8C'//横向分割线颜色
              }
            }
          }
        ],
        series: [
          {
            name:seriesName,
            type: seriesType,
            areaStyle:{normal:{}},
            data: seriesData,
            itemStyle:{
              normal:{
                color:{
                  type:'line',
                  x:0,
                  y:0,
                  x2:0,
                  y2:1,
                  colorStops:[
                    {offset:0,color:'#9ABA58'},
                    {offset:1,color:'#77933C'}
                  ]
                }
              }
            }
          }
        ]
      });
      return this;
    },

    /*
    * 柱状图【紫色】
    * */
    echartBar:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var echartBar = echarts.init(document.getElementById(this[0].id));

      //取值
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;
      var seriesName = [],seriesData = [],seriesType = [];
      if(opts.series.length == 1){
        seriesName = opts.series[0].name;
        seriesType = opts.series[0].type;
        seriesData = opts.series[0].data;
      }

      echartBar.setOption({
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
          trigger:'axis',
          axisPointer:{
            type:'shadow'//鼠标移入用透明柱状方式显示
          }
        },
        legend:{
          show:false,
          data:legendData
        },
        xAxis:{
          type:'category',
          axisLine:{
            show:true,
            lineStyle:{
              color:'#8C8C8C'//X轴颜色
            }
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#8C8C8C'//纵向分割线颜色
            }
          },
          axisLabel:{
            rotate:30,//x轴刻度标签旋转
            color:'#fff'//X轴刻度标签颜色
          },
          axisTick:{
            data:'value'
          },
          data:xAxisData
        },
        yAxis:{
          type:'value',
          axisLabel : {
            formatter: '{value}'
          },
          axisLine:{
            lineStyle:{
              color:'#8C8C8C'//y轴字颜色
            }
          },
          axisTick:{
            show:false//y轴【左侧】刻度不显示
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#8C8C8C'//横向分割线颜色
            }
          },
          axisLabel:{
            color:'#fff'//y轴刻度标签颜色
          }
        },
        series: [
          {
            name:seriesName,
            type: seriesType,
            barWidth:10,
            data: seriesData,
            itemStyle:{
              normal:{
                color:function(argument){
                  var number = argument.value;
                  if(number < 30){
                    return {
                      type:'line',
                      x:0,
                      y:0,
                      x2:0,
                      y2:1,
                      colorStops:[
                        {offset:0,color:'#E00000'},
                        {offset:1,color:'#7B0303'}
                      ]
                    };
                  }else{
                    return '#4F435E';
                  }
                },
                barBorderColor:'#8A5A92'
              }
            }
          }
        ]
      });
      return this;
    },

    /*
    * 折线、柱状图、折线色块
    * */
    echartLineBarArea:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var echartLineBarArea = echarts.init(document.getElementById(this[0].id));
      //获取值
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;
      //定义值
      var yAxis = [],series = [];
      //循环添加series数据
      for(var i=0;i<opts.series.length;i++){
        var seriesData = opts.series;
        //判断是柱状图显示还是折线显示
        if(seriesData[i].type == "bar"){
          var data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            data:seriesData[i].data,
            itemStyle:{
              normal:{
                color:{
                  type:'line',
                  x:0,
                  y:0,
                  x2:0,
                  y2:1,
                  colorStops:[
                    {offset:0,color:'#346EB5'},
                    {offset:1,color:'#2C5D98'}
                  ]
                }
              }
            }
          }
          series.push(data);
        }else if(seriesData[i].type == "line"){
          //定义折线颜色
          var lineColors = ['#B24D4C','#96B358'];
          var lineColor = "";
          i%2 == 0 ? lineColor = lineColors[0] : lineColor = lineColors[1];
          var data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            yAxisIndex: 1,
            data:seriesData[i].data,
            lineStyle:{
              normal:{
                color: lineColor,//线条颜色
                width: 2//线条宽度
              }
            },
            itemStyle:{
              normal:{
                color: lineColor//折点边线颜色
              }
            },
            symbol:'circle',//折点样式
            symbolSize:7//折点大小
          }
          series.push(data);
        }else if(seriesData[i].type == "lineArea"){
          //定义折线颜色
          var lineColors = ['#B24D4C','#96B358'];
          var lineColor = "";
          i%2 == 0 ? lineColor = lineColors[0] : lineColor = lineColors[1];
          var data = {
            name:seriesData[i].name,
            type:'line',
            areaStyle:{normal:{}},
            yAxisIndex: 1,
            data:seriesData[i].data,
            lineStyle:{
              normal:{
                color: lineColor,//线条颜色
                width: 2//线条宽度
              }
            },
            itemStyle:{
              normal:{
                color: lineColor//折点边线颜色
              }
            },
            symbol:'circle',//折点样式
            symbolSize:7//折点大小
          }
          series.push(data);
        }
      }

      //设置echarts的参数
      echartLineBarArea.setOption({
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
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#8C8C8C'//纵向分割线颜色
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLabel : {
              formatter: '{value}',
              color:'#fff'//X轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#8C8C8C'//y轴【左侧】颜色
              }
            },
            axisTick:{
              show:false//y轴【左侧】刻度不显示
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#5C5C5C'//纵向分割线颜色
              }
            }
          },
          {
            type : 'value',
            position: 'right',
            axisLabel : {
              formatter: '{value}',
              color:'#fff'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#8C8C8C'//y轴【右侧】颜色
              }
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
        ],
        series : series
      });
      return this;
    }
  })

})(jQuery);