'use strict';

d3.chart('Bar', {
  initialize: function(config){
    let chart = this;
    let base = this.base.append('g')
      .attr('transform', 'translate(30, -15)');

    chart.config = config;
    chart.config.parent = this;
    chart.dotradius = 3 ;
    chart.axisWidth = 14;
    chart.axisHeight = 18;

    this.x = d3.scale.ordinal()
    this.y = d3.scale.linear();
    this.width(chart.config.width);
    this.height(chart.config.height);

    this.layer('bar', base.append('g').attr('class', 'bar'), {
      dataBind: function(data){
        return this.selectAll('rect').data(data, function(d){return d.x;});
      },
      insert: function(){
        return this.insert('rect');
      },
      events: {
        'enter': function(data){
          this.attr('opacity', 1)
            .attr('x', function(d){return chart.x(d.x);})
            .attr('width', chart.x.rangeBand())
            .attr('y', function(d){return chart.y(d.y);})
            .attr('height', function(d){return chart.config.height - chart.y(d.y);});
        },
        'enter:transition': function(){
          this.duration(1000)
            .attr('opacity', 1);
        },
        'update': function(){
          this.attr('opacity', 1)
            .attr('height', function(d){return chart.config.height - chart.y(d.y);});
        },
        'update:transition': function(){
           this.duration(1000)
            .attr('opacity', 1);
        },
        'exit:transition': function(){
          this.duration(1000)
            .attr('opacity', 0)
            .remove();
        }
      }

    });

    chart.xAxis = this.base.select('g').chart('xAxis', config).tickSize(1).tickPadding(5);
    this.attach('xAxis', chart.xAxis);

    chart.yAxis = this.base.select('g').chart('yAxis', config).tickSize(1).tickPadding(5);
    this.attach('yAxis', chart.yAxis);

  },
  width: function(newWidth) {
    if (!arguments.length) {
      return this.w;
    }
    this.w = newWidth;
    this.x.rangeRoundBands([0, this.w], 0.05)
    this.base.attr('width', this.w);
    return this;
  },
  height: function(newHeight) {
    if (!arguments.length) {
      return this.h;
    }
    this.h = newHeight;
    this.y.range([(this.h - this.config.parent.dotradius - this.config.parent.axisHeight), this.config.parent.dotradius + this.config.parent.axisHeight]);
    this.base.attr('height', this.h);
    return this;
  },
  transform: function(dataSrc){
   let chart  = this;
    let data   = dataSrc.map(function(d){
      let data = {};
      data.x   = d[chart.config.graph.xKey];
      data.y   = d[chart.config.graph.yKey];
      data. u        = Math.random(10);
      data.fulltext  = d[chart.config.graph.xKey];
      return data;
    });

    this.x.domain(data.map(function(d) { return d.x; }));
    this.y.domain([0, d3.max(data, function(d) { return d.y; })]);
    this.data = data;

    return data;
  }

});
