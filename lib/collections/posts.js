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
        var errors = validatePost(postAttributes);
        if (errors.title || errors.url) {
            throw new Meteor.Error('invalid-post',
                "You must set a title and URL for your post");
        }
        var postWithSameLink = Posts.findOne({
            url: postAttributes.url
        });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }
        var user = Meteor.user();
        /*_.extend() method is part of the Underscore library, and simply lets
        you “extend” one object with the properties of another.*/
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0, //Initialize to zero comments
            upvoters: [],
            votes: 0
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },
    postClick: function(postId) {
        check(postId, String);
        var clicksValue = Posts.findOne({
            _id: postId
        }).clicks;
        Posts.update(postId, {
                $set: {
                    clicks: (clicksValue !== undefined ?
                        clicksValue + 1 : 1)
                }
            },
            function(error) {
                if (error) {
                    throwError(error.reason);
                }
            });
    },
    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);

        var post = Posts.findOne(postId);
        if (!post)
          throw new Meteor.Error('invalid', 'Post not found');

        if (_.include(post.upvoters, this.userId))
          throw new Meteor.Error('invalid', 'Already upvoted this post');

        Posts.update(post._id, {
/*$addToSet adds an item to an array property as long as it doesn't already
exist, and $inc simply increments an integer field.*/
          $addToSet: {upvoters: this.userId},
          $inc: {votes: 1}
        });
    }
});
/*This enables update or remve when the function ownsDocument returns a valid value.
This means, is only posible to update or remove when allows is true.
https://www.discovermeteor.com/blog/allow-deny-a-security-primer/
*/
Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});
/*
We're taking the fieldNames array that contains a list of the fields being
modified, and using Underscore's without() Method to return a sub-array
containing the fields that are not url or title.

If everything's normal, that array should be empty and its length should be 0.
If someone is trying anything funky, that array's length will be 1 or more,
and the callback will return true (thus denying the update).
*/
Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function(post) {
    var errors = {};

    if (!post.title)
        errors.title = "Please fill in a headline";

    if (!post.url)
        errors.url = "Please fill in a URL";

    return errors;
}
