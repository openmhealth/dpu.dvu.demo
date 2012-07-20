/*******************************************************************************
 * D3.js is required, so let's make sure it's loaded.
 **/ 

if(typeof d3 == 'undefined'){
  alert('dvu.js requires d3.js.'+ 
    'Please include it in your document.');
}else{
  console.log('d3.js is loaded, great!')
}

omh.dvu = function(vis_container){
  var vis = d3.select(vis_container)
  .append('svg:svg').attr('class','main_graph')
  var hgt = vis.style('height').replace(/px$/, '')
  var wid = vis.style('width').replace(/px$/, '')
  
  //add some defs to the svg so we can crerate a clip path
  var defs = vis.append('defs')
  defs.append('clipPath')
  .attr('id',$(vis_container).attr('id') + '_scatter_clip')
  .append('rect')
  .attr('x',-6).attr('y',-6)
  .attr('width',wid-62)
  .attr('height',hgt-62)
  
  defs.append('clipPath')
  .attr('id',$(vis_container).attr('id') + '_path_clip')
  .append('rect')
  .attr('x',0).attr('y',0)
  .attr('width',wid-75)
  .attr('height',hgt-75)
  
  //add the canvas where we will do our plots
  vis.append('g')
  .attr('id','plot_canvas')
  .attr('transform','translate(50,25)')
  .append('rect')
  .attr('id','bounding_rect')
  .style('fill','transparent')
  .style('stroke','#ccc')
  .style('stroke-width','1px')
  .attr('x',0).attr('y',0)
  .attr('width',wid-75).attr('height',hgt-75)

  //create what will become the return value of omh.dvu() 
  var self = $.extend({
    container:vis_container,
    vis:vis,
    width:function(){
      var wid = d3.select(self.container+' #bounding_rect')
      .attr('width').replace(/px$/, '')
      return parseInt(wid)
    },
    height:function(){
      var hgt = d3.select(self.container+' #bounding_rect')
      .attr('height').replace(/px$/, '')
      return parseInt(hgt)      
    },
    canvas:function(){
      return d3.select(self.container+' #plot_canvas')
    },
    plot_clr:'#777',
    color:function(clr){
      self.plot_clr = clr
      return self
    },
    stroke_wid:2,
    x_inc:10,
    y_inc:10,
    xLabels:function(b){
      if(b)
        $(self.container+' #x_ticks text').show()
      else
        $(self.container+' #x_ticks text').hide()
      return self
    },    
    yLabels:function(b){
      if(b)
        $(self.container+' #y_ticks text').show()
      else
        $(self.container+' #y_ticks text').hide()
      return self
    },
    xRules:function(b){
      if(b)
        $(self.container+' #x_ticks line').show()
      else
        $(self.container+' #x_ticks line').hide()
      return self
    },    
    yRules:function(b){
      if(b)
        $(self.container+' #y_ticks line').show()
      else
        $(self.container+' #y_ticks line').hide()
      return self
    },
    line_plot : true,
    linePlot:function(b){
      self.line_plot = b
    },
    tick_spacing : 10,
    tickSpacing:function(b){
      self.tick_spacing = b
      return self
    },
    
    /***************************************************************************
     ****************************************************************************
     * 
     * Set the thickness of the next plot path
     * Arguments:   
     *    wid : (int or decimal) the width of the line in pixels
     *           
     **************************************************************************/ 
    strokeWidth:function(wid){
      self.stroke_wid = wid
      return self
    },
    /*
    scatter_plot : true,
    scatterPlot:function(b){
      scatter_plot = b
    },
     */
    /***************************************************************************
     ****************************************************************************
     * 
     * Set the graphs range in the Y axis
     * Arguments:   
     *    min :  (int) start of range
     *    max :  (int) end of range
     *    skip:  (int) number of labels/rules to skip 
     *           on graph
     *           
     **************************************************************************/ 
    yRange: function(min, max, skip){
      var canvas = d3.select(self.container+' #plot_canvas')
      var hgt = d3.select(self.container+' #bounding_rect')
      .attr('height').replace(/px$/, '')
      var inc = hgt / (max-min)
      self.y_inc = inc
      d3.select(self.container+' #y_ticks').remove()
      var y_ticks = canvas.append('g')
      .attr('id','y_ticks')
      
      self.range(min+1,max+1).each(function(i){
        if(i%skip == 0){
          i = i-min
          y_ticks.append('line')
          .style('stroke','#eee')
          .style('clip-path','url('+self.container+'_path_clip)')
          .attr('x1','0').attr('y1',i*inc)
          .attr('x2','100%').attr('y2',i*inc)
        }
      })
      
      self.range(min,max+1).each(function(i){
        if(i%skip == 0){
          i = i-min
          l = max - i
          y_ticks.append('text')
          .attr('x','-20').attr('y',i*inc)
          .attr("dy", ".25em")
          .attr("text-anchor", "middle")
          .text(l)
        }
      })
      return self
    }.defaults(0,10,1),
    /***************************************************************************
     ****************************************************************************
     * 
     * Set the graphs range in the X axis
     * Arguments:   
     *    min :  (int) start of range
     *    max :  (int) end of range
     *    rules: (true:false) draw rules
     *    skip:  (int) number of labels/rules to skip 
     *           on graph
     *           
     **************************************************************************/ 
    xRange: function(min, max, rules, skip){
      d3.select(self.container+' #x_ticks').remove()
      d3.select(self.container+' #x_labels').remove()
      var canvas = d3.select(self.container+' #plot_canvas')
      var wid = d3.select(self.container+' #bounding_rect')
      .attr('width').replace(/px$/, '')
      var hgt = d3.select(self.container+' #bounding_rect')
      .attr('height').replace(/px$/, '')
      var inc = wid / (max-min)
      self.x_inc = inc
      var x_ticks = canvas.append('g')
      .attr('id','x_ticks')
      var x_labels = canvas.append('g')
      .attr('id','x_labels')
      .attr('transform','translate(0,20)')

      self.range(min+1,max+1).each(function(i){
        if(i%skip == 0){
          i = i-min
          x_ticks.append('line')
          .style('clip-path','url('+self.container+'_path_clip)')
          .style('stroke','#eee')
          .attr('x1',i*inc).attr('y1',0)
          .attr('x2',i*inc).attr('y2','100%')
        }
      })

      self.range(min,max+1).each(function(i){
        if(i%skip == 0){
          i = i-min
          x_labels.append('text')
          .attr('x',i*inc).attr('y',hgt)
          .attr("dy", ".25em")
          .attr("text-anchor", "middle")
          .text(i)
        }
      })
      return self
    }.defaults(0,10,true,1),
    /***************************************************************************
     ****************************************************************************
     * function plotData(data)
     * Plots arrays of coordinates
     * Arguments:   
     *   data:{x:[],y:[]}
     *               
     *                           
     **************************************************************************/ 
    plotData:function(data){
      self.plot(data.x,data.y)
      return self
    },
    /***************************************************************************
     ****************************************************************************
     * 
     * Plots arrays of coordinates
     * Arguments:   
     *    xA :  (int[]) X coordinates
     *    yA :  (int[]) Y Coordinates
     *           
     **************************************************************************/ 
    plot:function(xA,yA){
      var len = xA.length < yA.length ? xA.length:yA.length
      var path = self.vis.append('g')
      .attr('transform','translate(50,25)')
      .attr('class','plot')
      .append('path')
      .style('clip-path','url('+self.container+'_path_clip)')
      .attr('stroke', self.plot_clr)
      .attr('stroke-width', self.stroke_wid)
      .attr('fill', 'none')
      console.log('this.x_inc',self.x_inc)
      var d = "M"+(xA[0]*self.x_inc)+" "+(yA[0]*self.y_inc)
      self.range(0,len).each(function(i){
        d += "L"+(xA[i]*self.x_inc)+" "+(yA[i]*self.y_inc)
      })
      path.attr('d',d)
      return self
    }.defaults([0,1,2,3,4,5,6,7,8,9,10],[10,2,7,4,7,9,3,5,9,3,7]),

    /***************************************************************************
     ****************************************************************************
     * 
     * Set the X Axis label title
     * Arguments:   
     *    label : (string) the string that will be displayed
     *           
     **************************************************************************/ 
    xTitle:function(label){
      var wid = self.vis.style('width').replace(/px$/, '')
      var hgt = self.vis.style('height').replace(/px$/, '')
      var x = wid/2
      var y = hgt
      d3.select(self.container+' #x_label').remove()
      self.vis.append('g')
      .attr('id','x_label')
      .style('tex-anchor','middle')
      .attr('transform','translate('+x+','+y+')')
      .append('text')
      .attr('class','label')
      .text(label)
      return self
    }.defaults('X AXIS'),
    /***************************************************************************
     ****************************************************************************
     * 
     * Set the Y Axis label title
     * Arguments:   
     *    label : (string) the string that will be displayed
     *           
     **************************************************************************/ 
    yTitle:function(label){
      var hgt = self.vis.style('height').replace(/px$/, '')
      var y = hgt/2
      d3.select(self.container+' #y_label').remove()
      self.vis.append('g')
      .attr('id','y_label')
      .style('tex-anchor','middle')
      .attr('transform','rotate(-90) translate(-'+y+',15)')
      .append('text')
      .attr('class','label')
      .text(label)
      return self
    }.defaults('Y AXIS')
  },omh())
  console.log('omh.dvu',self)
  return self
}