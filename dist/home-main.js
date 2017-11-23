define(['./AV_init','jquery','av'], function(AVInit,$,AV) {
    'use strict';
    AVInit()
    componentSongForm()
    componentlastestSong()
    componentHotestSong()
    componentSearchResults()
    EventHandler()
    function componentSongForm() {
        new AV.Query('Songform').find().then(function(result){
            renderA(result)
            function renderA(result){
                var $ol = $('<ol></ol>')
                result.map(function(options,index){
                    var A = viewA(options)
                    $ol.append(A)
                })
                $('.advice>.songForm').append($ol)
            }
            function viewA(options){
                return` <a href="./songform.html?id=${options.id}">
                            <div class="musicImg"><img src="${options.attributes.img}" alt=""></div>
                            <p class="summary">${options.attributes.title}</p>
                        </a>`
            }
        },function(err){
            alert(err)
        })
    }
    function componentlastestSong() {
        searchPlyst()
        function searchPlyst() {
            new AV.Query('Playlist').find().then(function(result){                        
                renderA(result,viewA)
            })
        }
        function renderA(result,callback) {
            var $ol1 = $('<ol></ol>')
            result.map(function(value,index){ 
                var template = callback(value)
                $ol1.append(template)
            })
            $('.lastest').append($ol1)                            
        }
        function viewA(options){
            return`                        
            <a href="./player.html?id=${options.id}">
            <div class="lastestSong musicItem">
            <h3>${options.attributes.name}</h3>
            <small>${options.attributes.singer}</small>
            </div>
            <div class="bofangBtn">
            <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-bofang"></use> </svg>
            </div>
            </a>`
        }
    }
    function componentHotestSong() {
        searchPlyst()
        function searchPlyst() {
            new AV.Query('Playlist').find().then(function(result){                        
                renderComponent(result,viewRankFront,viewRank)
            })
        }
        function renderComponent(result,viewRankFront,viewRank) {
            var $ol2 = $('<ol></ol>')                        
            result.map(function(value,index){ 
                index<3 ? renderTpl(value,index,$ol2,viewRankFront) : renderTpl(value,index,$ol2,viewRank)
            })
            $('.hotest').append($ol2)
        }
        function renderTpl(value,index,$ol2,callback){
            index = (index+1)<10?'0'+(index+1):(index+1)+'';
            var template = callback(value,index);
            console.log(index)
            $ol2.append(template);
        }
        function viewRankFront(value,index){
            return`
            <a href="./player.html?id=${value.id}">
            <div class="rank rank-font">${index}</div>
            <div class="hotSong musicItem">
            <h3>${value.attributes.name}</h3>
            <small>${value.attributes.singer}</small>
            </div>
            <div class="bofangBtn">
            <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-bofang"></use> </svg>
            </div>
            </a>`
        }
        function viewRank(value,index) {
            return `
            <a href="./player.html?id=${value.id}">
            <div class="rank">${index}</div>
            <div class="hotSong musicItem">
            <h3>${value.attributes.name}</h3>
            <small>${value.attributes.singer}</small>
            </div>
            <div class="bofangBtn">
            <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-bofang"></use> </svg>
            </div>
            </a>`
        }
    }
    function componentSearchResults() {
        searchPlyst()
        function searchPlyst() {
            new AV.Query('Playlist').find().then(function(result){                        
                renderSearchResult(result)
            })
        }
        function renderSearchResult(result) {
            var $ul = $('<ul></ul>')                    
            result.map(function(value,index){ 
                var template = `<li><a>${value.attributes.name}</a></li>`
                $ul.append(template)
            })
            $('.adviceSearch').append($ul)                                
        }
    }        
    
    function EventHandler() {
        tabs()
        searchInput()
        function tabs (){
            $('.tabsNav').on('click', 'li', function (e) {
                let $li = $(e.currentTarget);
                let index = $li.index();
                $li.find('span').addClass('active');
                $li.siblings().find('.active').removeClass('active');
                $li.closest('.globalTabs').find('.tabsContent>section').eq(index).addClass('active').siblings('.active').removeClass('active');
            });
        }
        function searchInput (){
            let timer = null
            $('.songInput>.input').focus(function(e){
                let $input = $(e.target)
                $input.siblings('.holder').hide()
            })
            $('.songInput>.input').focusout(function(e){
                let $input = $(e.target)
                if($input.val()===''){
                    $input.siblings('.holder').show()
                }
            })
            $('.songInput>.input').on('input',function(e){
                if(timer){window.clearTimeout(timer)}
                timer = setTimeout(function(){
                    let $input = $(e.target)
                    let value = $input.val().trim() + ''
                    if(value===''){return}
                    SearchPlaylist(value)
                },700)
                
            })

            $('.search>.adviceSearch').on('click',function(e){
                let $a = $(e.target).find('a')
                let value = $a.text()
                $a.closest('.search').find('.input').val(value)
                $('.songInput>.input').focus()
                SearchPlaylist(value)
            })
        }
        function SearchPlaylist(value){

            var query1 = new AV.Query('Playlist');
            query1.contains('singer', value);
            var query2 = new AV.Query('Playlist');
            query2.contains('name', value);
            var queryAll = AV.Query.or(query1, query2);
            queryAll.find().then(function (Playlist) {
                $('.search>.adviceSearch').addClass('active')
                $('.search>.result').addClass('active')
                if(Playlist.length === 0){
                    let li = `
                        <li><a href="about:blank">
                                <svg class="icon icon-searchResult" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg>                            
                                <span>没有搜索到任何结果..........................</span>
                            </a>
                            </li>
                            `
                    $('.search>.result>ul').append(li)
                }else{
                    for(var i = 0;i < Playlist.length;i++){
                        var song = Playlist[i].attributes
                        let li = `
                        <li data-id="${Playlist[i].id}">
                            <a href="./player.html?id=${Playlist[i].id}">
                                <svg class="icon icon-searchResult" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg>                            
                                <span>${song.singer} ${song.name}</span>
                            </a>
                            </li>
                            `
                            $('.search>.result>ul').append(li)
                        }
                    }
                    let h2 = `<h2>搜索“<strong>${song.singer}</strong>”</h2>`
                    $('.search>.result').prepend(h2)
            }, function (error) {
                console.log(error)
            });
        }

    }
});