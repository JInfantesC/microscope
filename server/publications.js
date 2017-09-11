Meteor.publish("posts", function(argument) {
    return Posts.find();
});
Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({
        postId: postId
    });
});
