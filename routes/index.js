var info=JSON.parse(JSON.stringify(require('../films.json').Search)); 
var films=info
exports.index=function(req,res){
    var pageNumber=req.params.number;
    if(!pageNumber){
        pageNumber=1;
    }
    res.render('index',{films:films,title:"home",pageNumber:pageNumber});
}

exports.film=function(req,res){
    var id=req.params.id;
    var filmArr=films.filter(function(row){
        if(row.imdbID==id)
            return row;
    })
    var film=filmArr[0]
    res.render('film',{title:'Film',film});
}
