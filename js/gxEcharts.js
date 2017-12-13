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
              color:'#BDBDBD'//X轴刻度标签颜色
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
              color:'#BDBDBD'//y轴刻度标签颜色
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
              color:'#BDBDBD'//X轴刻度标签颜色
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
              color:'#BDBDBD'//X轴刻度标签颜色
            }
          }
        ],
        yAxis : yAxis,
        series : series
      });
      return chart;
    },

    /*
    * 线条色块方法
    * */
    echartLineArea:function(options){
      var defaults = [];
      var opts = $.extend({}, defaults, options);
      //取值
      var echartLineArea = echarts.init(document.getElementById(this[0].id));
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;
      //定义值
      var seriesName = [],seriesData = [],seriesType = [];
      if(opts.series.length == 1){
        seriesName = opts.series[0].name;
        if(opts.series[0].type == "lineArea")seriesType = 'line';
        seriesData = opts.series[0].data;
      }
      //设置echarts的参数
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
            color:'#BDBDBD'//X轴刻度标签颜色
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
              color:'#BDBDBD'//y轴刻度标签颜色
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
      return echartLineArea;
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
      //设置echarts的参数
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
            color:'#BDBDBD'//X轴刻度标签颜色
          },
          axisTick:{
            data:'value'
          },
          data:xAxisData
        },
        yAxis:{
          type:'value',
          axisLabel : {
            formatter: '{value}',
            color:'#BDBDBD'//y轴刻度标签颜色
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
      return echartBar;
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
      var leftMax = opts.leftMax;
      var leftMin = opts.leftMin;
      var rightMax = opts.rightMax;
      var rightMin = opts.rightMin;
      //定义值
      var yAxis = [],yAxisList = {},series = [];
      //循环添加series数据
      for(var i=0;i<opts.series.length;i++){
        var seriesData = opts.series;
        //定义折线颜色,及取值
        var lineColors = ['#B24D4C','#96B358'],lineColor = "";
        //定义series
        var data = [];
        //获取单位
        var monad = seriesData[i].monad;
        //判断是柱状图显示还是折线或者色块显示
        if(seriesData[i].type == "bar"){
          data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            data:seriesData[i].data,
            yAxisIndex:i,
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
          };
          series.push(data);
          yAxisList = {
            type : 'value',
            min:leftMin,
            max:leftMax,
            position: 'left',
            axisLabel : {
              formatter: '{value}'+monad,
              color:'#BDBDBD'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#7F7F7F'//y轴【左侧】颜色
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
          };
          yAxis.push(yAxisList);
        }else if(seriesData[i].type == "line"){
          i%2 == 0 ? lineColor = lineColors[0] : lineColor = lineColors[1];
          data = {
            name:seriesData[i].name,
            type:seriesData[i].type,
            data:seriesData[i].data,
            yAxisIndex:i,
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
          };
          series.push(data);
          yAxisList = {
            type : 'value',
            min:leftMin,
            max:leftMax,
            position: 'left',
            axisLabel : {
              formatter: '{value}'+monad,
              color:'#BDBDBD'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#7F7F7F'//y轴【左侧】颜色
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
          };
          yAxis.push(yAxisList);
        }else if(seriesData[i].type == "lineArea"){
          i%2 == 0 ? lineColor = lineColors[0] : lineColor = lineColors[1];
          data = {
            name:seriesData[i].name,
            type:'line',
            areaStyle:{normal:{}},
            data:seriesData[i].data,
            yAxisIndex:i,
            itemStyle:{
              normal:{
                color: {
                  type:'line',
                  x:0,
                  y:0,
                  x2:0,
                  y2:1,
                  colorStops:[
                    {offset:0,color:'#7B57A7'},
                    {offset:1,color:'#5B3F7B'}
                  ]
                }
              }
            }
          }
          series.push(data);
          yAxisList = {
            type : 'value',
            position: 'right',
            min:rightMin,
            max:rightMax,
            axisLabel : {
              formatter: '{value}'+monad,
              color:'#BDBDBD'//y轴刻度标签颜色
            },
            axisLine:{
              lineStyle:{
                color:'#7F7F7F'//y轴【右侧】颜色
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
          };
          yAxis.push(yAxisList);
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
              color:'#BDBDBD'//X轴刻度标签颜色
            },
            splitLine:{
              show:true,
              lineStyle:{
                color:'#8C8C8C'//纵向分割线颜色
              }
            }
          }
        ],
        yAxis : yAxis,
        series : series
      });
      return echartLineBarArea;
    },

    /*
    * 横向柱状图
    * */
    echartBaracross:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var echartBaracross = echarts.init(document.getElementById(this[0].id));
      //获取值
      var name = opts.name;
      var legendData = opts.legend;
      var yAxisData = opts.yAxis;
      var bottomMax = opts.bottomMax;
      var bottomMin = opts.bottomMin;
      //定义值
      var series = [], seriesList = {},
        xAxis = [], xAxisList = {},monad;
      var barColor = [
        {color:{
          type:'line',
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {offset:0,color:'#846C21'},
            {offset:1,color:'#F8CA3E'}
          ]
        },barBorderColor:'#BC4F4C'},
        {color:{
          type:'line',
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {offset:0,color:'#780303'},
            {offset:1,color:'#7B0303'}
          ]
        },barBorderColor:'#5376AC'}
      ]
      for(var i=0;i<opts.series.length;i++){
        var seriesData = opts.series;
        monad = seriesData[i].monad;
        seriesList = {
          name:seriesData[i].name,
          type:'bar',
          barGap:0,
          data:seriesData[i].data,
          barHeight:30,
          itemStyle:{
            normal:i%2 == 0 ? barColor[0] : barColor[1]
          }
        }
        series.push(seriesList);
        xAxisList = {
          type : 'value',
          min:bottomMin,
          max:bottomMax,
          axisLabel : {
            formatter: '{value}',
            color:'#BDBDBD'//y轴刻度标签颜色
          },
          axisLine:{
            lineStyle:{
              color:'#7F7F7F'//横向分割线颜色
            }
          },
          axisTick:{
            show:false//x轴刻度不显示
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#5C5C5C'//纵向分割线颜色
            }
          }
        };
        xAxis.push(xAxisList);
      }
      //设置echarts的参数
      echartBaracross.setOption({
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
          trigger: 'axis',
          axisPointer:'shodow'
        },
        legend: {
          data:legendData,
          orient:'vertical',
          x:'92%',
          y:'center',
          textStyle:{
            color:'#fff'
          }
        },
        xAxis : xAxis,
        yAxis : {
          type : 'category',
          data : yAxisData,
          axisLabel : {
            formatter: '{value}',
            color:'#BDBDBD'//y轴刻度标签颜色
          },
          axisLine:{
            lineStyle:{
              color:'#7F7F7F'//横向分割线颜色
            }
          },
          axisTick:{
            show:false//y轴刻度不显示
          }
        },
        series :series
      });
      return echartBaracross;
    },

    /*
    * 内嵌饼图
    * */
    echartPie:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var echartPie = echarts.init(document.getElementById(this[0].id));
      //获取数据
      var name = opts.name;
      var legendData = opts.legend;
      //定义数据
      var series = [],seriesData = {};
      var pieColor = ['#CD3B37','#9BC447','#3A7BC9'];//三种色块
      var radiuses = [[20, 60],[60, 100]];
      //给series赋值
      for(var i=0;i<opts.series.length;i++){
        var dataSeries = opts.series[i];
        //循环内环数据、markPoint的data、markLine的data和markLine的color
        var data = [],dataList = {},markPointData = {},markLineData = {};
        for(var j=0;j<dataSeries.data.length;j++){
          dataList = {value:dataSeries.data[j], name:legendData[j],itemStyle:{normal:{color:pieColor[j]}}};
          data.push(dataList);
        }
        markPointData = [{name :dataSeries.name,value:'', x:'15%', y:i%2==0?'40%':'80%', symbolSize:[80,30]}];
        markLineData = [[{x: '15%', y: i%2==0?'40%':'80%'}, {x: i%2==0?'45%':'40%', y: i%2==0?'50%':'75%',symbol:'circle'}]];
        //series里面的列表获取
        seriesData = {
          name:dataSeries.name,
          type:'pie',
          center : ['50%', '60%'],
          radius : i%2 == 0? radiuses[0] : radiuses[1],
          data:data,
          itemStyle:{
            normal:{
              label:{
                position : 'inner',
                formatter : function (params) {
                  return (params.percent - 0).toFixed(0) + '%'
                }
              }
            }
          },
          markPoint : {
            symbol: 'rectangle',
            data : markPointData,
            itemStyle:{
              normal: {
                color:'#4F81BD',
                label:{
                  show:true,
                  formatter:function (params) {
                    return params.name;
                  }
                }
              }
            }
          },
          markLine:{
            data : markLineData,
            lineStyle:{
              normal:{
                color:'#385D8A',
                width:'3',
                type:'solid'
              }
            }
          }
        };
        series.push(seriesData);
      }
      //设置echarts的参数
      echartPie.setOption({
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
          show: true,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'right',
          y : 'center',
          data:legendData,
          textStyle:{
            color:'#D9D9D9'
          }
        },
        series : series
      });
      return this;
    },

    /*
    * 多层柱状图
    * */
    echartBarLayer:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var echartBarLayer = echarts.init(document.getElementById(this[0].id));
      //取值
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;
      //设置柱状图各层颜色
      var barLayerColor = [
        [
          {offset:0,color:'#3A7BCA'},
          {offset:1,color:'#2C5D98'}
        ],
        [
          {offset:0,color:'#CD3B37'},
          {offset:1,color:'#9B2D2A'}
        ],
        [
          {offset:0,color:'#9BC447'},
          {offset:1,color:'#769535'}
        ]
      ];
      //获取series的data值
      var series = [],seriesData = {};
      for(var i=0;i<opts.series.length;i++){
        var dataSeries = opts.series[i];
        seriesData = {
          name:dataSeries.name,
          type:'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: {
                type:'line',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:barLayerColor[i]
              }
            }
          },
          data:dataSeries.data
        }
        series.push(seriesData);
      }
      //设置echarts的参数
      echartBarLayer.setOption({
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
        grid:{
          z:0,
          y:50,
          z2:'10px',
          y2:0,
          width:'540px'
        },
        tooltip : {
          show: true,
          trigger: 'item'
        },
        legend: {
          show:false,
          data:legendData
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : xAxisData
          }
        ],
        yAxis : [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴字颜色
              }
            },
            axisTick: {
              show: false//y轴【左侧】刻度不显示
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#8C8C8C'//横向分割线颜色
              }
            }
          }
        ],
        series : series
      });
      return echartBarLayer;
    },

    /*
    *多层柱状图
    * */
    barLayerLegendShow:function (options) {
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var barLayerLegendShow = echarts.init(document.getElementById(this[0].id));
      //取值
      var name = opts.name;
      var legendData = opts.legend;
      var xAxisData = opts.xAxis;
      //设置柱状图各层颜色
      var barLayerColor = [
        [
          {offset:0,color:'#7B57A7'},
          {offset:1,color:'#5E4180'}
        ],
        [
          {offset:0,color:'#9BC447'},
          {offset:1,color:'#769535'}
        ],
        [
          {offset:0,color:'#CD3B37'},
          {offset:1,color:'#9B2D2A'}
        ],
        [
          {offset:0,color:'#3A7BCA'},
          {offset:1,color:'#2C5D98'}
        ]
      ];
      //获取series的data值和legend的状态
      var series = [],seriesData = {},legend = false;
      //console.log(opts.series.length);
      for(var i=0;i<opts.series.length;i++){
        var dataSeries = opts.series[i];
        seriesData = {
          name:dataSeries.name,
          type:'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: {
                type:'line',
                x:0,
                y:0,
                x2:0,
                y2:1,
                colorStops:barLayerColor[i]
              }
            }
          },
          data:dataSeries.data
        }
        series.push(seriesData);
        //获取legend的值
        dataSeries.type == "barLayerLegendShow" ? legend = true : legend = false;
      }
      //设置echarts的参数
      barLayerLegendShow.setOption({
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
          show: true,
          trigger: 'item'
        },
        legend: {
          show:legend,
          data:legendData,
          orient:'vertical',
          textStyle:{
            color:'#fff'
          },
          x:'right',
          y:'center'
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : xAxisData,
            axisLabel: {
              formatter: '{value}',
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴颜色
              }
            }
          }
        ],
        yAxis : [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴颜色
              }
            },
            axisTick: {
              show: false//y轴【左侧】刻度不显示
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#8C8C8C'//横向分割线颜色
              }
            }
          }
        ],
        series : series
      });
      return barLayerLegendShow;
    },

    /*
    * 多层柱状图和色块
    * */
    barlayerLinearea:function(options){
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var barlayerLinearea = echarts.init(document.getElementById(this[0].id));
      var name = opts.name;
      //定义legend并获取
      var seriesDate = [],seriesList = {};
      var legendData = opts.legend;
      //获取xAxis的值
      var xAxisData = opts.xAxis;
      //定义yAxis
      var yAxisData = [],yAxisList = {},
        leftMin = opts.leftMin,leftMax = opts.leftMax,rightMin = opts.rightMin,rightMax = opts.rightMax;
      //获取yAxis最大值最小值
      var left
      //定义多层柱状图的色块
      var barLayerColor = [
        [
          {offset:0,color:'#FFD000'},
          {offset:1,color:'#DA9C00'}
        ],
        [
          {offset:0,color:'#4497E3'},
          {offset:1,color:'#3373AD'}
        ],
        [
          {offset:0,color:'#FF730F'},
          {offset:1,color:'#C6570C'}
        ],
        [
          {offset:0,color:'#A0A0A0'},
          {offset:1,color:'#797979'}
        ]
      ];
      for(var i=0;i< opts.series.length;i++){
        //获取series内的数据
        var dataSeries = opts.series[i];
        var seriesName = dataSeries.name,
          seriesData = dataSeries.data,
          seriesType = dataSeries.type,
          seriesMonad = dataSeries.monad;
        //判断色块展示还是层叠柱状图展示
        if(dataSeries.type == "linearea"){
          seriesList = {
            name:seriesName,
            type: 'line',
            areaStyle:{normal:{}},
            data: seriesData,
            yAxisIndex:i,
            itemStyle:{
              normal:{
                color:{
                  type:'line',
                  x:0,
                  y:0,
                  x2:0,
                  y2:1,
                  colorStops:[
                    {offset:0,color:'#69B735'},
                    {offset:1,color:'#53922A'}
                  ]
                }
              }
            }
          };
          seriesDate.push(seriesList);
          yAxisList = {
            type: 'value',
            min:rightMin,
            max:rightMax,
            position: 'right',
            axisLabel: {
              formatter: '{value}'+seriesMonad,
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              show:true,
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴颜色
              }
            },
            axisTick: {
              show: false//y轴刻度不显示
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#8C8C8C'//横向分割线颜色
              }
            }
          };
          yAxisData.push(yAxisList);
        }else if(dataSeries.type == "barLayerLegendShow"){
          seriesList = {
            name:seriesName,
            type:'bar',
            stack: seriesType,
            data:seriesData,
            yAxisIndex:i,
            barWidth : 30,
            itemStyle:{
              normal:{
                label:{
                  show:true,
                  color:'#D9D9D9'
                },
                color:{
                  type:'line',
                  y:0,
                  y2:1,
                  colorStops:barLayerColor[i]
                }
              }
            }
          };
          seriesDate.push(seriesList);
          yAxisList = {
            type: 'value',
            min:leftMin,
            max:leftMax,
            position: 'left',
            axisLabel: {
              formatter: '{value}'+seriesMonad,
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              show:true,
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴颜色
              }
            },
            axisTick: {
              show: false//y轴刻度不显示
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#8C8C8C'//横向分割线颜色
              }
            }
          };
          yAxisData.push(yAxisList);
        }
      }
      //设置echarts的参数
      barlayerLinearea.setOption({
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
          show: true,
          trigger: 'item'
        },
        legend: {
          show:true,
          data:legendData,
          textStyle:{
            color:'#fff'
          },
          x:'center',
          y:'bottom'
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : xAxisData,
            axisLabel: {
              formatter: '{value}',
              color: '#D9D9D9'//x轴刻度标签颜色
            },
            axisTick: {
              show: false//x轴刻度不显示
            },
            axisLine: {
              lineStyle: {
                show:false,
                color: '#8C8C8C'//x轴颜色
              }
            }
          }
        ],
        yAxis : yAxisData,
        series : seriesDate
      });
      return barlayerLinearea;
    },

    /*
    * 线条和色块
    * */
    echartLines:function(options){
      var defaults = [];
      var opts = $.extend({},defaults,options);
      var barlayerLinearea = echarts.init(document.getElementById(this[0].id));
      var name = opts.name;
      //定义legend并获取
      var seriesDate = [],seriesList = {};
      var legendData = opts.legend;
      //获取xAxis的值
      var xAxisData = opts.xAxis;
      //定义yAxis
      var yAxisData = [],yAxisList = {},
        leftMin = opts.leftMin,leftMax = opts.leftMax,leftMonad = opts.leftMonad;
      console.log(leftMin,leftMax,leftMonad);
      //颜色
      var barLayerColor = [
        [
          {offset:0,color:'#FFD000'},
          {offset:1,color:'#DA9C00'}
        ],
        [
          {offset:0,color:'#4497E3'},
          {offset:1,color:'#3373AD'}
        ],
        [
          {offset:0,color:'#FF730F'},
          {offset:1,color:'#C6570C'}
        ],
        [
          {offset:0,color:'#4472C4'},
          {offset:1,color:'#295AB0'}
        ],
        [
          {offset:0,color:'#69B735'},
          {offset:1,color:'#53922A'}
        ],
        [
          {offset:0,color:'#255E91'},
          {offset:1,color:'#0D487C'}
        ],
        [
          {offset:0,color:'#FFCD00'},
          {offset:1,color:'#EAB000'}
        ]
      ];
      for(var i=0;i< opts.series.length;i++){
        //获取series内的数据
        var dataSeries = opts.series[i];
        var seriesName = dataSeries.name,
          seriesData = dataSeries.data,
          seriesType = dataSeries.type;
        //判断色块展示还是层叠柱状图展示
        if(seriesType == "lines"){
          seriesList = {
            name:seriesName,
            type: 'line',
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
                  colorStops:barLayerColor[i]
                }
              }
            }
          };
          seriesDate.push(seriesList);
        }else if(dataSeries.type == "line"){
          seriesList = {
            name:seriesName,
            type: 'line',
            data: seriesData,
            // yAxisIndex:i,
            itemStyle:{
              normal:{
                color:{
                  type:'line',
                  x:0,
                  y:0,
                  x2:0,
                  y2:1,
                  colorStops:barLayerColor[i]
                }
              }
            }
          };
          seriesDate.push(seriesList);
        }
      }
      //设置echarts的参数
      barlayerLinearea.setOption({
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
          show: true,
          trigger: 'item'
        },
        legend: {
          show:true,
          data:legendData,
          textStyle:{
            color:'#fff'
          },
          x:'center',
          y:'bottom'
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : xAxisData,
            axisLabel: {
              formatter: '{value}',
              color: '#D9D9D9'//x轴刻度标签颜色
            },
            axisTick: {
              show: false//x轴刻度不显示
            },
            axisLine: {
              lineStyle: {
                show:false,
                color: '#8C8C8C'//x轴颜色
              }
            }
          }
        ],
        yAxis : [
          {
            type: 'value',
            min:leftMin,
            max:leftMax,
            axisLabel: {
              formatter: '{value}'+leftMonad,
              color: '#D9D9D9'//y轴刻度标签颜色
            },
            axisLine: {
              show:true,
              lineStyle: {
                show:false,
                color: '#8C8C8C'//y轴颜色
              }
            },
            axisTick: {
              show: false//y轴刻度不显示
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#8C8C8C'//横向分割线颜色
              }
            }
          }
        ],
        series : seriesDate
      });
      return barlayerLinearea;
    },


  });
})(jQuery);