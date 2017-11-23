define(['jquery','av'],function($,AV){
return    function renderH2(obj) {
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
    })