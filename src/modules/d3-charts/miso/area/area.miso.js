'use strict';

d3.chart('Area', {
  initialize: function(config){
    let chart = this;
    let base = this.base.append('g')
      .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

    chart.config = config;
    chart.config.parent = this;
    chart.dotradius = 3 ;
    chart.axisWidth = 14;
    chart.axisHeight = 18;

    this.x = d3.time.scale();
    this.y = d3.scale.linear();
    this.width(chart.config.width);
    this.height(chart.config.height);


    this.layer('gridlines', base.append('g').attr('class', 'grid-lines'), {
      dataBind: function(data){
        chart.xExtent = d3.extent(data, function(d) { return chart.x(d.x); });
        chart.YExtent = d3.max(data, function(d) { return d.y; });
        chart.dataLength = data.length;
        return this.selectAll('line').data(chart.y.ticks(5));
      },
      insert: function(){
        return this.insert('line');
      },
      events: {
        'enter':function(){
          this
            .attr('x1', chart.xExtent[0])
            .attr('x2', chart.xExtent[1])
            .attr('y1', function(d){ return chart.y(d);})
            .attr('y2', function(d){ return chart.y(d);})
            .attr('class', 'gridline');
        },
        'merge:transition': function(){
          this
            .attr('y1', function(d){ return chart.y(d);})
            .attr('y2', function(d){ return chart.y(d);});
        },
        'exit': function(){
          this.remove();
        }
      }
    });

    let line   = d3.svg.line()
      .x(function(d) {  return chart.x(d.x); })
      .y(function(d){ return chart.y(d.y); });


    let line1  = d3.svg.line()
      .x(function(d) {  return chart.x(d.x); })
      .y(function(d){ return chart.y(d.y1); });


    this.layer('line', base.append('g').attr('class', 'line'), {
      dataBind: function(data){
        return this.selectAll('path').data([data]);
      },
      insert: function(){
        return this.insert('path');
      },
      events: {
        'enter': function(data){
          this.attr('d', function(d){ return line(d); })
            .style('stroke', 'blue');
        },
        'enter:transition': function(){
          this.duration(1000)
            .attr('opacity', 1);
        },
        'update': function(){
          this.attr('d', function(d){ return line(d); });
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

    this.layer('line1', base.append('g').attr('class', 'line1'), {
      dataBind: function(data){
        return this.selectAll('path').data([data]);
      },
      insert: function(){
        return this.insert('path');
      },
      events: {
        'enter': function(data){
          this.attr('d', function(d){ return line1(d); })
             .style('stroke', 'red')
             .attr('stroke-dasharray', '5,10,5')
             .attr('fill', 'none');
        },
        'enter:transition': function(){
          this.duration(1000)
            .attr('opacity', 1);
        },
        'update': function(){
          this.attr('d', function(d){ return line1(d); });
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

    chart.xAxis = this.base.select('g').chart('xAxis', config)
      .tickSize(1)
      .tickFormat(d3.time.format('%_m/%_d'))
      .tickPadding(5);

    this.attach('xAxis', chart.xAxis);

    chart.yAxis = this.base.select('g').chart('yAxis', config)
      .ticks(5)
      .tickSize(1)
      .tickPadding(5);

    this.attach('yAxis', chart.yAxis);
  },
  width: function(newWidth) {
    if (!arguments.length) {
      return this.w;
    }
    this.w = newWidth;
    this.x.range([(this.config.parent.dotradius + this.config.parent.axisWidth + 5), (this.w - this.config.margin.left - this.config.parent.dotradius - this.config.parent.axisWidth)]);
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
    let format = d3.time.format('%Y-%m-%d');
    let data   = dataSrc.map(function(d){
      let data = {};
      data.x   = format.parse(d[chart.config.graph.xKey]);
      data.y   = +d[chart.config.graph.yKey];
      data.y1   = +d[chart.config.graph.y1Key];
      data.key = 'Total';
      return data;
    });

    this.x.domain(d3.extent(data, function(d) { return d.x; }));
    this.y.domain([0, d3.max(data, function(d) { return d.y; })]);
    this.data = data;

    return data;
  }

});
