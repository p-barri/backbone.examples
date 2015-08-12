$(function(){

     
  var Todo = Backbone.Model.extend({
    urlRoot: "http://localhost:8000",

    defaults: function() {
      return {
        title: "empty todo...",
      };
    },

  });
 
  var TodosCollection = Backbone.Collection.extend ({
    url : '/',
    model: Todo,
  });

  var Todos = new TodosCollection;

  var AppView = Backbone.View.extend({

    el: $("#lista"),

    template: _.template($('#data-template').html()),

    events: {
      "keypress #new-todo":  "createOnEnter",
      "dblclick .view"  : "search",
    },

    initialize: function() {
        var that = this;
        Todos.fetch({
            success: function(){
                that.render(Todos.models);
            }
        });
    },
    render : function(todosList) {

        _(todosList).each(function(item){
            this.$el.append(this.template(item.attributes));
        }, this);

       return this;
    },

    createOnEnter: function(e) {
        if (e.keyCode != 13) return;

        var todo1 = new Todo({title: $("#new-todo").val()});
        todo1.save();
        
        Todos.add(todo1);
        Todos.sync()

    },

    search: function() {
        
         var algo = Todos.where({title: "title1"})
        console.log(algo[0].attributes.title);
    }

  });


  // Finally, we kick things off by creating the **App**.
  var App = new AppView();

});