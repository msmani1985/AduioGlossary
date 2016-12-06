
(function (window) {
    var browser,
        os,
        version,
        ua = window.navigator.userAgent,
        platform = window.navigator.platform;
		
    if ( /MSIE/.test(ua) ) {
        browser = 'Internet Explorer';
        if ( /IEMobile/.test(ua) ) {
            browser += ' Mobile';
        }
        version = /MSIE \d+[.]\d+/.exec(ua)[0].split(' ')[1];
    } else if ( /Chrome/.test(ua) ) {       
        browser = 'Chrome';
        version = /Chrome\/[\d\.]+/.exec(ua)[0].split('/')[1];       
    } else if ( /Opera/.test(ua) ) {      
        browser = 'Opera';    
        if ( /mini/.test(ua) ) {
            browser += ' Mini';
        } else if ( /Mobile/.test(ua) ) {
            browser += ' Mobile';
        }      
    } else if ( /Android/.test(ua) ) {     
        browser = 'Android Webkit Browser';
        mobile = true;
        os = /Android\s[\.\d]+/.exec(ua);     
    } else if ( /Firefox/.test(ua) ) {    
        browser = 'Firefox';    
        if ( /Fennec/.test(ua) ) {
            browser += ' Mobile';
        }
        version = /Firefox\/[\.\d]+/.exec(ua)[0].split('/')[1];     
    } else if ( /Safari/.test(ua) ) {      
        browser = 'Safari';      
        if ( (/iPhone/.test(ua)) || (/iPad/.test(ua)) || (/iPod/.test(ua)) ) {
            os = 'iOS';
        }   
    }
    if ( !version ) {        
         version = /Version\/[\.\d]+/.exec(ua);         
         if (version) {
             version = version[0].split('/')[1];
         } else {
             version = /Opera\/[\.\d]+/.exec(ua)[0].split('/')[1]
         }         
    }  
    if ( platform === 'MacIntel' || platform === 'MacPPC' ) {      
        os = 'Mac OS X ' + /10[\.\_\d]+/.exec(ua)[0];
        if ( /[\_]/.test(os) ) {
            os = os.split('_').join('.');
        }      
    } else if ( platform === 'Win32' ) {
        os = 'Windows 32 bit';
    } else if ( platform == 'Win64' ) {
        os = 'Windows 64 bit';
    } else if ( !os && /Linux/.test(platform) ) {
        os = 'Linux';
    } else if ( !os && /Windows/.test(ua) ) {
        os = 'Windows';
    }
    window.ui = {
        browser : browser,
        version : version,
        os : os
    };
}(this));



var Device = {};
Device.name=navigator.platform;
Device.isTouch=('createTouch' in document);
Device.Browser=window.ui.browser;//browser-detection.js //Chrome,Safari,Firefox,

if (navigator.userAgent.indexOf("Silk") !== -1) {
	Device.name="kindleFire";
	Device.Browser="silk";
}


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
	KF8: function() {
		//browser is silk for KF8
        return (navigator.userAgent.indexOf('Silk')!=-1);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()||isMobile.KF8());
    }
};

Device.isMobile=(isMobile.any())?true:false;
Device.isAndroid=(isMobile.Android())?true:false;
Device.isIos=(isMobile.iOS())?true:false;
Device.audioExtension="";
Device.audioMimeType="";
//if(Device.Browser=="Internet Explorer"||Device.Browser=="Safari"){
if(Device.Browser=="Safari"){
	Device.audioExtension='.m4a';
	Device.audioMimeType='audio/mp4';
  }
else if(Device.Browser=="Internet Explorer"){
	Device.audioExtension='.mp3';
	Device.audioMimeType='audio/mpeg';
  }
  else{
   Device.audioExtension='.ogg';
   Device.audioMimeType='audio/ogg';
  }

console.log("----------Device Info-----------");
console.log("Device OS      : "+Device.name);

/*console.log("Supports Touch : "+Device.isTouch);
console.log("Browser Name   : "+Device.Browser);
console.log("Is Mobile      : "+Device.isMobile);
console.log("Is Android     : "+Device.isAndroid);
console.log("Is Ios         : "+Device.isIos);
console.log("Supported audio: "+Device.audioExtension);
console.log("Audio mimeType : "+Device.audioMimeType);
console.log("-----------------------------");*/