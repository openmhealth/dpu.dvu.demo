/*******************************************************************************
 * This file provides a base for all dpu scripts to extend 
 ******************************************************************************/
/*******************************************************************************
 * Make sure jQuery and JSON scripts are loaded.
 **/ 
if(typeof omh == 'undefined'){
  alert('omh.dpu.js requires omh.js.');
}else{
  console.log("omh is loaded, terrific!")
}
/******************************************************************************
 * This little bit of utility code allows us to set defaults for 
 * function arg values. It's super fun, you can do this:
 * var foo = function(a, b){console.log(a,b)}.defaults(42, 'default_b')
 **/
Function.prototype.defaults = function() {
  var _f = this;
  var _a = Array(_f.length-arguments.length).concat(
    Array.prototype.slice.apply(arguments));
  return function(){
    return _f.apply(_f, Array.prototype.slice.apply(arguments).concat(
      _a.slice(arguments.length, _a.length)));
  }
}

/*****************************************************************************
 * DPU Object Declaration:
 * This is the object that will be extended to provide a js/json interface 
 * to dpus
 **/
omh.dpu = function(){
  var self = $.extend(omh(),{
    // Function to generate a random array of a specific size, range, and
    // rounded to a specific number 0f decimal places ----------------------------
    randArray:function(size, min, max, dec_places_to_round){
      var array = []
      var val
      max = max - min
      for(var i=0; i<size; i++){
        val = min + (Math.random() * max)
        val = self.round(val, dec_places_to_round)
        array.push(val)
      }
      return array
    }.defaults(10,0,10,2),
  
    // Function to round numbers ------------------------------------------------
    round:function(num,dec){
      return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    }.defaults(2)
  })
  return self
}