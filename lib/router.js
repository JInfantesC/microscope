Router.configure({
    layoutTemplate: "layout", //Tell router the name of the template we use as main frame "layout at layout.html"
    waitOn: function() {
        return Meteor.subscribe('posts');
    },
    loadingTemplate: "loading",
    notFoundTemplate: 'notFound',
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
/*
But wait, what if someone enters a URL of the form
http://localhost:3000/posts/xyz, where xyz is not a valid post _id? This is
still a valid route, just not one that points to any data.

This tells Iron Router to show the “not found” page not just for invalid routes
but also for the postPage route, whenever the data function returns a “falsy”
(i.e. null, false, undefined, or empty) object.
*/
Router.onBeforeAction('dataNotFound', {
    only: 'postPage'
});

Router.route('/submit', {
    name: 'postSubmit'
});


var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}
Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
});
