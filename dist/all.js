define(['jquery','av'],function($,AV){
    return  function PlayerUI(obj,url) {
                renderImg(obj)
                renderH2(obj)
                renderLyric(obj)
                function renderImg(obj) {
                    let img = document.createElement('img')
                    img.src = obj.img
                    $('.img').append(img)
                }
                function renderH2(obj) {
                    fillH2(obj)
                    function templateH2(obj) {
                        return ` <h2>
                        <strong>${obj.name} -</strong>
                        ${obj.singer}
                        </h2>`
                    }
                    function fillH2(obj) {
                        let h2 = templateH2(obj)
                        $('.lyrics').prepend(h2)
                    }
                    
                }
                function renderLyric(obj) {
                    getLyric(obj,obj.url)
                    function getLyric(obj,url) {
                        var array = obj.lyric.split('\n')
                        var regex = /^\[(.*)\](.*)$/
                        array = array.map(function(string,index){
                            var matches = string.match(regex)
                            if(matches){
                                return {time: matches[1], words: matches[2]}
                            }
                        })
                        lyricUI(array,url)
                    }
                    function lyricUI(array,url) {
                        var arraylyric = []
                        fillLyric(array)
                        videoUI(url,arraylyric)
                        function fillLyric(array) {
                            var $ul = $('<ul></ul>')
                            array.map(function(object){
                                if(!object.words){return}
                                var $li = $('<li></li>')
                                $li.attr('data-time',object.time).text(object.words)
                                $ul.append($li)
                                console.log(123)
                                timeArray(object)
                            })
                            $('.lyricsContent').append($ul)
                        }

                        function videoUI(url,arraylyric) {
                            var video = document.createElement('video')
                            video.src=url
                            video.play()
                            $('.video').append(video)
                            PlayBtn(video)
                            lyricScroll(video,arraylyric)
                        }
                        function PlayBtn(video) {
                            var onoff = false
                            $('.video').on('click',function(e){
                                e.preventDefault()
                                onoff ? video.play() : video.pause()
                                onoff = !onoff
                            })
                        }
                        function lyricScroll(video,arraylyric) {
                            var lastline=-1
                            var line
                            var currentTime
                            setInterval(function(){
                                currentTime = video.currentTime
                                currentLine(arraylyric,currentTime)                                             
                            },2000) 
                        }
                        function currentLine(arraylyric,currentTime) {
                            for(var i=0;i<arraylyric.length;i++){
                                if(i === arraylyric.length-1){
                                    return 
                                }else if( currentTime >= arraylyric[i].time && currentTime < arraylyric[i+1].time){
                                    line = $('.lyricsContent>ul>li').eq(i)
                                    scrollCurrentLine(line)
                                    break
                                }
                            } 
                        }
                        function scrollCurrentLine(line){
                            if(line){
                                if(line.text()===''){return}
                                var top = line.offset().top		
                                line.addClass('active').siblings().removeClass('active')
                                var linesTop = $('.lyricsContent>ul').offset().top
                                var delta = top - linesTop
                                $('.lyricsContent>ul').css({'transform':'translateY(-'+ delta+'px)'})
                            } 
                        }
                        function timeArray(object) {
                            var matches = object.time.split(':')
                            var minutes = ~~matches[0]
                            var seconds = +matches[1]
                            var time = minutes*60 + seconds
                            arraylyric.push({time: time})       
                        }
                    }
                }
            }
    
})