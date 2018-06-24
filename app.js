var express=require('express');
var app=express();
var path=require('path');
var routes=require('./routes');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/:number?',routes.index);
app.get('/film/:id?',routes.film);

app.locals.search=null;
app.get('/*',function(req,res){
    res.status(404).render('error.ejs',{title:'Error'})
})

app.locals.searchfilm = function(films) {
    var searcharr = [];
    films.forEach(function(film){
        searcharr.push(film)
    })
    return searcharr;
}
app.post('/api/searchfilm', function(req, res) {
    var filmquery = req.body.filmquery;
    var result=[];
    var allfilms=JSON.parse(JSON.stringify(require('./films.json').Search)); 
    allfilms.forEach(function(film){
        var found = (film.Title).match(new RegExp(filmquery, "i"));
        if(filmquery != null && found!=null ){
            result.push(film)
        }
        })
    res.send(result);
});
app.locals.getFilms = function(films,num) {
var filmarr = [];
var arr=[];
var start=(num-1)*8
var end=8*num;
films.forEach(function(film){
    filmarr.push(film)
})
filmarr.forEach(function(choose){
    if(end<=filmarr.length){
    if(start<end){
    arr.push(filmarr[start])
    start++;    
    }
}
    else{
        if(start<filmarr.length){
        arr.push(filmarr[start])
        start++;  
        }  
}
})
return arr;
}
app.listen(5000);    
