(function() {
    var Util = (function() {
        var element
        var getEl = function(selectorString) {
            element = document.querySelector(selectorString)
            return element
        }
        var addHandler = function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
        //添加类
        var addClass = function(element, className) {
            if (element.classList) { //其它浏览器
                element.classList.add(className);
            } else { //IE
                element.className = element[i].className + ' ' + className;
            }
            return element;
        };
        //移除类
        var removeClass = function(element, className) {
            element.classList.remove(className);
            return element;
        };
        return {
            getEl,
            addHandler,
            addClass,
            removeClass
        }
    })()

    var Dom = {
        advicedMusic: Util.getEl('#advicedMusic'),
        hotMusic: Util.getEl('#hotMusic'),
        searchMusic: Util.getEl('#searchMusic'),
        advice: Util.getEl('.advice'),
        hot: Util.getEl('.hot'),
        search: Util.getEl('.search'),
        tabsNav: Util.getEl('.tabsNav')
    }

    function Main() {
        EventHandler()
        // SongsUpdate()
    }

    // function SongsUpdate {

    // }

    function EventHandler() {
        Util.addHandler(Dom.tabsNav, 'click', function(e) {
            var clickedEl = e.target
            var clickedParentEl=clickedEl.closest('.tabsNav>ol')
            var index
            for(var i = 0;i < clickedParentEl.children.length; i++){
                // console.log(clickedParentEl.children[i])
                if(clickedParentEl.querySelector('.active')){
                    console.log(clickedParentEl.querySelector('.active').className)
                    clickedParentEl.querySelector('.active').className.replace(/active/g,'')
                    console.log('移除active',clickedParentEl.querySelector('.active').className,'00')
                }
                if(clickedParentEl.children[i] === clickedEl.parentNode){
                    index = i
                }
            }
            console.log('index',index)
            Util.addClass(clickedEl,'active')

            var clickedGlobalEl=clickedEl.closest('.globalTabs')
            var tabsContent = clickedGlobalEl.querySelector('.tabsContent')
            for(var j = 0;j < tabsContent.children.length;j++){
                if(tabsContent.children[j].matches('active')){
                    tabsContent.children[j].classList.remove('active')
                }
            }
            Util.addClass(tabsContent.children[index],'active')
        })

    }

    Main()
})()