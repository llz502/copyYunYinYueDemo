define(['jquery','av','./playBtn','./lyricScroll'],function($,AV,playBtn,lyricScroll){
return  function renderLyric(obj) {
            function getLyric(obj) {
                var array = obj.lyric.split('\n')
                var regex = /^\[(.*)\](.*)$/
                array = array.map(function(string,index){
                    var matches = string.match(regex)
                    if(matches){
                        return {time: matches[1], words: matches[2]}
                    }
                })
                return array
            }
            lyricUI(getLyric(obj),obj)
            function lyricUI(array,obj) {
                LyricsContent(array,obj)
                function LyricsContent(array,obj) {
                    fillLyric(array,obj)
                    function fillLyric(array,obj) {
                        var arraylyric = []
                        var $ul = $('<ul></ul>')
                        array.map(function(object,obj){
                            if(!object.words){return}
                            var $li = $('<li></li>')
                            $li.attr('data-time',object.time).text(object.words)
                            $ul.append($li)
                            arraylyric = timeArray(object,obj.url,arraylyric)
                        })
                        videoUI(obj.url,arraylyric)
                        $('.lyricsContent').append($ul)
                    }
                    function timeArray(object,url,arraylyric) {
                        var matches = object.time.split(':')
                        var minutes = ~~matches[0]
                        var seconds = +matches[1]
                        var time = minutes*60 + seconds
                        arraylyric.push({time: time})    
                        return  arraylyric
                    }
                }
                function videoUI(url,arraylyric) {
                    renderVideo(url,arraylyric)
                    function renderVideo(url,arraylyric) {
                        var video = document.createElement('video')
                        video.src=url
                        video.play()
                        $('.video').append(video)
                        playBtn(video)
                        lyricScroll(video,arraylyric)
                    }
                }
            }
        }
})