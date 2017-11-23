define(['av'],function(AV){
    return function search(callback) {
        searchSong()
        function searchSong(){
            new AV.Query('Playlist').get(getParameter('id'))
            .then(renderSong,function(err){ console.log(err) })
        }
        function getParameter(name,url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return (decodeURIComponent(results[2].replace(/\+/g, " "))+'');
        }
        function renderSong(result) {
            var song = result.attributes
            callback(song,song.url)
        }
    }

})