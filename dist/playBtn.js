define(['jquery'], function($) {
'use strict';
return  function playBtn(video) {
            var onoff = false
            $('.video').on('click',function(e){
                e.preventDefault()
                onoff ? video.play() : video.pause()
                onoff = !onoff
            })
        }
    
});