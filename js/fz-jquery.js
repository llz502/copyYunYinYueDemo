window.$ = function (selectorOrElement) {

    var elements;
    if (typeof selectorOrElement === "string") {
        elements = document.querySelectorAll(selectorOrElement);//伪数组，有length对象
    } else if (selectorOrElement instanceof Element) {
        elements = { 0: selectorOrElement, length: 1 };//假数组
    } else if (selectorOrElement instanceof Array) {
        elements = {};
        for (var i = 0; i < selectorOrElement.length; i++) {
            elements[i] = selectorOrElement[i];
        }
        elements.length = selectorOrElement.length;
    }

    //添加事件
    elements.on = function (eventType, fn) {
        if (elements instanceof Element) {
            elements = { 0: elements, length: 1 };//假数组
        }
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.addEventListener) {
                element.addEventListener(eventType, fn);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventType, fn);
            }else {
                element["on" + type] = fn;
            }
        }
        return elements;
    };
    //添加类
    elements.addClass = function (className) {
        for (var i = 0; elements.length; i++) {
            if (elements[i].classList) {//其它浏览器
                elements[i].classList.add(className);
            } else {//IE
                elements[i].className = elements[i].className + ' ' + className;
            }
        }
        return elements;
    };
    //移除类
    elements.removeClass = function (className) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].classList) {//其它浏览器
                elements[i].classList.remove(className);
            } else {/*IE需要正则表达式，暂时不会*/ }
        }
        return elements;
    };
    //设置内容
    elements.text = function (string) {
        if (arguments.length === 0) {//string===undefined
            let result = [];
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent !== undefined) {
                    result.push(elements[i].textContent);
                } else if (elements[i].innerText !== undefined) {
                    result.push(elements[i].innerText);
                }
            }
            return result;
        } else {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent !== undefined) {//w3c
                    elements[i].textContent = string;
                } else if (elements[i], innerText !== undefined) {//IE
                    elements[i].innerText = string;
                }
            }
            return elements;
        }
    };
    //设置html
    elements.html = function (string) {
        if (arguments.length === 0) {//string===undefined
            let result = [];
            for (let i = 0; i < elements.length; i++) {
                result.push(elements[i].innerHTML);
            }
            return result;
        } else {
            for (let i = 0; i < elements.length; i++) {
                elements[i].innerHTML = string;
            }
            return elements;
        }
    };

    //获取指定索引成员
    elements.get = function (index) {
        return elements[index];
    };
    //获取所有元素的所有兄弟
    elements.siblings = function () {
        var result = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var children = element.parentNode.children;
            for (var j = 0; j < children.length; j++) {
                if (children !== element) {
                    result.push(children[j]);
                }
            }
        }
        var objectResult = $(result);
        return objectResult;
    };
    //返回伪数组对象
    return elements;
};