var BookmarkModel = require('../model/database').BookmarkModel;
//Instanciando o BookmarkModel
var bookModel = new BookmarkModel();
//Criando o controller da Home.
var HomeController = {
  index:function(req, res){
    bookModel.findAll(function(err,items){
      res.render('index', {
        locals: {'links': items, 'title': 'Bookmarks Application'}
      });
    }, {limit:2});
  },
  listAll:function(req, res){
    bookModel.findAll(function(err,items){
      res.render('index', {
        locals: {'links': items, 'title': 'Bookmarks Application'}
      });
    });
  },
  create: function(req, res){
    res.render('add', {'title': 'Adicionar link'});
  },
  save: function(req, res){
    var doc = {name:req.body.book_name, url: req.body.book_url};
    bookModel.save(doc, function(){
        res.redirect('back');
    });
  },
  search: function(req, res){
    var where = {};
    if(req.param('keywords')) {
      where = {name:req.param('keywords')};
    }
    bookModel.filter(where, function(err, items){
      res.render('list', {
        locals: {'links': items,'title': 'Resultado da busca por %s'.replace('%s', where.name)}
      });
    })
  },
  remove: function (req, res){
    bookModel.delete({_id: bookModel.convertToId(req.param('id'))}, function(){
      res.redirect('back');  
    });
  }
}
exports.HomeController = HomeController;