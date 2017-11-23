(function(){
    

    function Main() {
        Init()

    }

    function Init() {
        AV_init()
        search()

        function AV_init(){
            var APP_ID = 'Pl6OltxSyIVbzE9fovztWdVr-gzGzoHsz';
            var APP_KEY = 'G1NOVIqTp7eLiyqf9TMYd4GQ';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        }

        function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function search() {
            searchPylst(getPylst)
        }
        
        function searchPylst(callback) {
            var id = getParameterByName('id') + '';
            var query = new AV.Query('Playlist');
            query.get(id).then(callback)
        }

        function getPylst(song) {
            var {name,singer,imgBg,img,url, lyric} = song.attributes
            var obj = {name,singer,imgBg,img,url, lyric}
            PlayerUI(obj,url)
        }
        
    }
    
    function PlayerUI(obj,url) {
        fillPlay(obj,url)
        
        function fillPlay(obj,url){
            fillImg(obj)
            fillTitle(obj)
            getLyrics(obj,url)
        }

        function fillImg(obj) {
            let img = document.createElement('img')
            img.src = obj.img
            $('.img').append(img)
        }
        
        function h2Template(obj) {
            return ` <h2>
                <strong>${obj.name} -</strong>
                ${obj.singer}
                </h2>`
        }
        function fillTitle(obj) {
            let h2 = h2Template(obj)
            $('.lyrics').prepend(h2)
        }

        var array = function getLyrics(obj,url) {
            var array = obj.lyric.split('\n')
            var regex = /^\[(.*)\](.*)$/
            array.map(function(string,index){
                var matches = string.match(regex)
                if(matches){
                    return {time: matches[1], words: matches[2]}
                }
            })
        }
        
        
        AutoScroll(array,url)
    }
    
    function AutoScroll(array,url) {
        var arraylyric = []
        var $ul = $('<ul></ul>')
        array.map(function(object){
            if(!object.words){return}
            var $li = $('<li></li>')
            $li.attr('data-time',object.time)
            $li.text(object.words)
            $ul.append($li)
            var matches = object.time.split(':')
            var minutes = ~~matches[0]
            var seconds = +matches[1]
            var time = minutes*60 + seconds
            arraylyric.push({
                time: time,
                lyric: object.words
            })       
        })
            $('.lyricsContent').append($ul)
            
            var video = document.createElement('video')
            video.src=url
            video.play()
            var onoff = false
            $('.video').append(video)
            $('.video').on('click',function(e){
                if(onoff){
                    video.play()
                }else{
                    video.pause()
                }
                e.preventDefault()
                onoff = !onoff
            })

            var lastline=-1
            var line
            var currentTime
            setInterval(function(){
                currentTime = video.currentTime
                for(var i=0;i<arraylyric.length;i++){
                    if(i === arraylyric.length-1){
                        return 
                    }else if( currentTime >= arraylyric[i].time && currentTime < arraylyric[i+1].time){
                        line = $('.lyricsContent>ul>li').eq(i)
                        break
                    }
                } 
                if(line){
                    if(line.text()===''){return}
                    var top = line.offset().top		
                    line.addClass('active').siblings().removeClass('active')
                    var linesTop = $('.lyricsContent>ul').offset().top
                    var delta = top - linesTop
                    $('.lyricsContent>ul').css({'transform':'translateY(-'+ delta+'px)'})
                } 
            },2000) 


    }

    Main()
})()
