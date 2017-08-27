/*
To Var Or Not To Var?

In Meteor, the var keyword limits the scope of an object to the current file.
Here, we want to make the Posts collection available to our whole app, which is
why we're not using the var keyword.
*/
Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var user = Meteor.user();
        /*_.extend() method is part of the Underscore library, and simply lets
        you “extend” one object with the properties of another.*/
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});
