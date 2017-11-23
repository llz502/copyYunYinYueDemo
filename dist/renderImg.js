define(['jquery','av'],function($,AV){
return  function renderImg(obj) {
            let img = document.createElement('img')
            img.src = obj.img
            $('.img').append(img)
        }
})