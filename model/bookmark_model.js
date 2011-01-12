var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
var configDB = require('../lib/database.js');
var BookmarkModel = function() {
  var self = this;
  configDB.getDatabaseSettings(function(host, database, port){
    self.db = new mongo.Db(database, new mongo.Server(host, port, {auto_reconnect: true}),{});
    self.db.open(function(){});
  });
};

BookmarkModel.prototype = {
  convertToId:function(hexID){
    return ObjectID.createFromHexString(hexID);
  },
  save:function(post, onSuccess){
    this.db.collection('bookmarks', function(err, collection){
      collection.insert(post, onSuccess);
    });
  },
  findAll:function(onSuccess,limit){
    this.filter({},onSuccess, limit);
  },
  filter:function(where, onSuccess, limit){
    this.db.collection('bookmarks', function(err, collection){
      collection.find(where||{},limit||{}, function(err, cursor){
        cursor.toArray(onSuccess);
      });
    });
  },
  delete:function(where, onSuccess){
    this.db.collection('bookmarks', function(err, collection){
      collection.remove(where, onSuccess);
    });
  }
};
exports.BookmarkModel = BookmarkModel;