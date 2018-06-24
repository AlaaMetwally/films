
        function keyupFunction() {
           
        var searchQuery = document.getElementById('search').value;
        var filmUl = document.getElementById('options');
        $.post("/api/searchfilm",
        {
          filmquery: searchQuery,
        },
        function(data,status){
           var resultfilms = data;
           filmUl.innerHTML="";
           resultfilms.forEach(function(film) {
            var hrefDom=document.createElement("A");
            var li=document.createElement("LI");
            li.innerHTML=film.Title;
            hrefDom.href="/film/"+film.imdbID;
            hrefDom.appendChild(li);
            filmUl.appendChild(hrefDom);
           });
        });
        }
