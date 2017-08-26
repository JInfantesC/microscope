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
/*
The special :_id syntax tells the router two things: first, to match any route
of the form /posts/xyz/, where “xyz” can be anything at all. Second, to put
whatever it finds in this “xyz” spot inside an _id property in the router's
params array.

Note that we're only using _id for convenience's sake here. The router has no
way of knowing if you're passing it an actual _id, or just some random string
of characters.

this corresponds to the currently matched route, and we can use this.params to
access the named parts of the route (which we indicated by prefixing them 
with : inside our path).
*/
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});
