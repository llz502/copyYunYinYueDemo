(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-erjiline" viewBox="0 0 1024 1024">'+""+'<path d="M512 0C229.248 0 0 229.248 0 512l0 384c0 70.72 57.28 128 128 128 70.72 0 128-57.28 128-128l0-192c0-70.72-57.28-128-128-128L128 512c0-212.096 171.904-384 384-384 212.096 0 384 171.904 384 384l0 64c-70.656 0-128 57.28-128 128l0 0 0 192c0 70.72 57.28 128 128 128 70.72 0 128-57.28 128-128L1024 512C1024 229.248 794.752 0 512 0z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-sousuo" viewBox="0 0 1024 1024">'+""+'<path d="M775.241691 790.419766c-19.251046 19.274075-50.446969 19.274075-69.688804 0L605.987694 690.70719c-0.365385-0.359244-0.602579-0.788342-0.950309-1.162939-35.853049 19.921943-77.076342 31.337163-120.989361 31.337163C346.01221 720.881415 234.122939 608.827106 234.122939 470.596318 234.122939 332.3686 346.01221 220.305847 484.048024 220.305847c138.038885 0 249.925085 112.062753 249.925085 250.290471 0 58.51922-20.201355 112.222417-53.789937 154.833559l95.058519 95.190549C794.4889 739.886057 794.4889 771.13648 775.241691 790.419766L775.241691 790.419766zM484.057235 295.013325c-96.830945 0-175.322771 78.605433-175.322771 175.582993 0 96.98063 78.491826 175.577619 175.322771 175.577619 96.830177 0 175.331214-78.59699 175.331214-175.577619C659.38845 373.618759 580.887412 295.013325 484.057235 295.013325L484.057235 295.013325zM484.057235 295.013325"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-bofang" viewBox="0 0 1024 1024">'+""+'<path d="M512 992C246.4 992 32 777.6 32 512S246.4 32 512 32s480 214.4 480 480-214.4 480-480 480z m0-912C275.2 80 80 275.2 80 512S275.2 944 512 944 944 748.8 944 512 748.8 80 512 80z" fill="#18BD8A" ></path>'+""+'<path d="M678.4 492.8c12.8 9.6 12.8 28.8 0 38.4l-252.8 182.4c-12.8 9.6-25.6 3.2-25.6-12.8V323.2c0-16 12.8-22.4 25.6-12.8l252.8 182.4z" fill="#18BD8A" ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)