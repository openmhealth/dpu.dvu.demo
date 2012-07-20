/*******************************************************************************
 * Make sure dpu.js is loaded. */ 
if(typeof omh.dpu == 'undefined'){
  alert('dpu.opencpu.js requires dpu.js.'+ 
    'Please include it in your document.');
}else{
  console.log("dpu.js is loaded, sweet!")
}

/*****************************************************************************
 * Initialize Function */
omh.dpu.opencpu = function(){
  var self = $.extend(omh.dpu(), {
    //context_path:context_path,
    //base_path:"http://omh.opencpu.org/R/call/dpu.ptsd",
    base_path:"http://test-r.mobilizingcs.org/R/call/dpu.ptsd",
    output:"jsonp",
    /***************************************************************************
     * Process function, sends data to specific opencpu urls
     **/
    process:function(function_name, data, callback){
      if(self.output == "jsonp")
        self.processJsonp(function_name, data, callback) 
      else if(self.output == "json")
        self.processJson(function_name, data, callback) 
    }.defaults(function(result){ 
      console.log(result)
    }),
    /***************************************************************************
     * Process using jsonp
     **/
    processJsonp:function(function_name, data, callback){
      var callbackName = "callback_"+ new Date().getTime()
      window[callbackName] = function(jsonp){
        callback(jsonp)
      }
      $.jsonp({
        url: self.base_path+"/"+function_name+"/jsonp?!prefix='"+callbackName+"'&"+self.urlEncode(data),
        callbackParameter: callbackName
      });
    }.defaults(function(result){
      console.log(result)
    }),
    /***************************************************************************
     * Process using json
     **/
    processJson:function(function_name, data, callback){
      data['forwardURL'] = self.base_path+
      "/"+function_name+"/"+self.output
      $.ajax({
        url:context_path+"/proxy",
        data:self.urlEncode(data),
        success: callback,
        error:function(response){
          console.log(response);
        }
      });
    }.defaults(function(result){
      console.log(result)
    }),
    /***************************************************************************
     * Smooth Function 
     **/
    smooth:function(data, callback){
      if(!callback)
        this.process("smooth", data)
      else
        this.process("smooth", data, callback)
    },
    /***************************************************************************
     * bin function
     **/
    bin:function(data, callback){
      if(!callback)
        this.process("bin", data)
      else
        this.process("bin", data, callback)
    },
    /***************************************************************************
     * correlation function
     **/
    correlation:function(data, callback){
      if(!callback)
        this.process("correlation", data)
      else
        this.process("correlation", data, callback)
    },
    /***************************************************************************
     * quantiles function
     **/
    quantiles:function(data, callback){
      if(!callback)
        this.process("quantiles", data)
      else
        this.process("quantiles", data, callback)
    },
    /***************************************************************************
     * linear function
     **/
    linear:function(data, callback){
      if(!callback)
        this.process("linear", data)
      else
        this.process("linear", data, callback)
    },
    /***************************************************************************
     * urlEncode data into an opencpu url 
     **/
    urlEncode:function(data){
      var url = ""
      $.each(data,function(k,v){
        url += (k+"=")
        if(v instanceof Array)
          url += self.urlEncodeArray(v)
        else
          url += (v)
        url += "&"
      })
      url = url.slice(0, url.length - 1)
      return url 
    },
    /***************************************************************************
     * urlEncode array
     **/
    urlEncodeArray:function (array){
      var url = "["
      $.each(array,function(){
        url += this + ","
      })
      url = url.slice(0, url.length - 1)+ "]"
      return url
    }
  })
  return self
}


/*****************************************************************************
 * Extend jquery jsonp minified*/
var _tmp = function(a){
  function D(l){
    function W(a){
      if(!(O++)){
        P();
        I&&a!=u&&(y[K]=a);
        d(l.error,l,[l,a]);
        d(D,l,[l,a])
      }
    }
    function V(a){
      if(!(O++)){
        P();
        I&&(y[K]={
          s:[a]
        });
        E&&(a=E.apply(l,[a]));
        d(l.success,l,[a,t]);
        d(D,l,[l,t])
      }
    }
    l=a.extend({},B,l);
    var D=l.complete,E=l.dataFilter,F=l.callbackParameter,G=l.callback,H=l.cache,I=l.pageCache,J=l.charset,K=l.url,L=l.data,M=l.timeout,N,O=0,P=b,Q,R,S,T,U;
    l.abort=function(){
      !(O++)&&P()
    };
  
    if(d(l.beforeSend,l,[l])===!1||O){
      return l
    }
    K=K||h;
    L=L?typeof L=="string"?L:a.param(L,l.traditional):h;
    K+=L?e(K)+L:h;
    if(I&&(N=y[K])){
      N.s?V(N.s[0]):W(N)
    }else{
      v[G]=c;
      S=a(s)[0];
      S.id=k+z++;
      if(J){
        S[g]=J
      }
      C&&C.version()<11.6?(T=a(s)[0]).text="document.getElementById('"+S.id+"')."+n+"()":S[f]=f;
      if(!(o in S)&&p in S){
        S.htmlFor=S.id;
        S.event=m
      }
      S[o]=S[n]=S[p]=function(a){
        if(!S[q]||/loaded|complete/.test(S[q])){
          try{
            S[m]&&S[m]()
          }catch(b){}
          a=A;
          A=0;
          a?V(a[0]):W(i)
        }
      };
  
      S.src=K;
      P=function(a){
        U&&clearTimeout(U);
        S[p]=S[o]=S[n]=null;
        w[r](S);
        T&&w[r](T)
      };
  
      w[j](S,x);
      T&&w[j](T,x);
      U=M>0&&setTimeout(function(){
        W(u)
      },M)
    }
    return l
  }
  function e(a){
    return/\?/.test(a)?"&":"?"
  }
  function d(a,b,c,d){
    try{
      d=a&&a.apply(b.context||b,c)
    }catch(e){
      d=!1
    }
    return d
  }
  function c(a){
    A=[a]
  }
  function b(){}
  var f="async",g="charset",h="",i="error",j="insertBefore",k="_jqjsp",l="on",m=l+"click",n=l+i,o=l+"load",p=l+"readystatechange",q="readyState",r="removeChild",s="<script>",t="success",u="timeout",v=window,w=a("head")[0]||document.documentElement,x=w.firstChild,y={},z=0,A,B={
    callback:k,
    url:location.href
  },C=v.opera;
  D.setup=function(b){
    a.extend(B,b)
  };
  
  a.jsonp=D
}(jQuery)
