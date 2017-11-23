define(['jquery'], function($) {
'use strict';
return    function lyricScroll(video,arraylyric){
    
    getPlayTime(video,arraylyric)
    function getPlayTime(video,arraylyric) {
        setInterval(function(){
            currentLine(arraylyric,video.currentTime)                                             
        },500) 
    }
    function currentLine(arraylyric,currentTime) {
        for(var i=0;i<arraylyric.length;i++){
            if(i === arraylyric.length-1){
                return 
            }else if( currentTime >= arraylyric[i].time && currentTime < arraylyric[i+1].time){
                scrollCurrentLine($('.lyricsContent>ul>li').eq(i))
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
    }
});