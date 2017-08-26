Router.configure({
    layoutTemplate: "layout", //Tell router the name of the template we use as main frame "layout at layout.html"
    waitOn: function() {
        return Meteor.subscribe('posts');
    },
    loadingTemplate: "loading"
});
Router.route("/", { //We define a new route when we are at / that will load template postsList
    name: "postsList"
});
