Router.configure({
    layoutTemplate: "layout", //Tell router the name of the template we use as main frame "layout at layout.html"
    waitOn: function() {
        //We augmented our router to wait on an array containing both the comments and the posts subscriptions.
        //return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
        return [
            Meteor.subscribe('notifications')
        ];
    },
    loadingTemplate: "loading",
    notFoundTemplate: 'notFound',
});
/*
A route controller is simply a way to group routing features together in a
nifty reusable package that any route can inherit from extending RouteController
*/
PostsListController = RouteController.extend({
    /*We then set the template property just like we did before, and then a
    new increment property.*/
    template: 'postsList',
    increment: 5,
    /*
We then define a new postsLimit function which will return the current limit,
and a findOptions function which will return an options object. This might seem
like an extra step, but we'll make use of it later on.*/
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {
            sort: {
                submitted: -1
            },
            limit: this.postsLimit()
        };
    },

    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        /*So when we feed {postsLimit: this.postsLimit() + this.increment} to
        this.route.path(), we're telling the postsList route to build its own
        path using that JavaScript object as data context.*/
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({
            postsLimit: this.postsLimit() + this.increment
        });
        /*We're taking that path and adding it to the data context for our
        template, but only if there are more posts to display. The way we do
        that is a bit tricky.*/
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});
/*Because our controller is called the PostsListController and our route is
named postsList, Iron Router will automatically use the controller. */
Router.route('/:postsLimit?', {
    name: 'postsList'
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
    },
    waitOn: function() {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
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

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});
