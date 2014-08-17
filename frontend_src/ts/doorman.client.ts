module Client {
  var global = window;
  var raf = global.requestAnimationFrame ||
            global['webkitRequestAnimationFrame'] ||
            global['mozRequestAnimationFrame'] ||
            global['msRequestAnimationFrame'] ||
            (function(duration) { return (f) => { global.setTimeout(f); } })(1000/60);

  export function extend<T>(...args: T[]):T {
    var typeRE = /(object|array)/;
    var arg = null;
    var res = args.shift();

    if (args.length < 1) {
      return res; 
    }
         
    while (!!(arg = args.shift())) {
        __extend(res, arg);  
    }
    return res;

    function __extend(dist:any, src:any) {
      var distType = typeof dist;
      var srcType = typeof src;
      var distValType, srcValType, srcVal;

      if (src && distType !== srcType) {
        dist = (dist && srcType === 'object') ? {} : [];  
      }
      if (srcType === 'object') {
        for (var key in src) if (src.hasOwnProperty(key)) {
          srcVal = src[key];
          if (srcVal && typeRE.test(typeof srcVal)) {
            __extend(dist[key], srcVal);   
          } else {
            dist[key] = srcVal;        
          }
        } 
      } else if (srcType === 'array') {
        for (var i = 0, iz = src.length; i < iz; i++) {
          srcVal = src[i];
          if (srcVal && typeRE.test(srcVal)) {
            __extend(dist[i], srcVal);   
          } else {
            dist[i] = srcVal; 
          }
        }   
      }
    }
  };

  export interface IAppSetting {
    server: string
  }

  export class App {
    private startedAt:Number;
    private updatedAt:Number;
    private selfScriptId:string = 'doorman-client'; 
    private defaultSetting:IAppSetting = {
      server: 'http://localhost:8080'
    };
    public setting:IAppSetting = {
      server: ''
    }; 
    constructor () {
    }
    public setup () {
      var script = document.getElementById(this.selfScriptId);

      if (!script) {
          throw new Error('cannot find element of doorman.client'); 
      }

      extend<IAppSetting>(this.setting, this.defaultSetting, {
        server: script.dataset['doormanServer']
      });

      
    }
    public run () {
      this.startedAt = Date.time();
      this.update();
    }

    public stop () {
    
    }

    private update () {
      var lastUpdatedAt = this.updatedAt || this.startedAt;

      raf(() => {
        this.update();
      }); 
    }
  }
}

