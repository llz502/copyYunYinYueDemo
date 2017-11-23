require(['./AV_init','./search','./renderImg','./renderH2','./renderLyric'], function(AVInit,search,renderImg,renderH2,renderLyric){
    AVInit()
    search(renderImg)
    search(renderH2)
    search(renderLyric)
  })