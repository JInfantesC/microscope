Meteor.publish('posts', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});
Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({
        postId: postId
    });
});
/*
We solve this issue with publications. We can use our publications to specify
precisely which part of our collection we want to share with each browser.

To accomplish this, we need to return a different cursor in our publication
than Notifications.find(). Namely, we want to return a cursor that corresponds
to the current user's notifications.

Doing so is straightforward enough, as a publish function has the current
user's _id available at this.userId:
*/
Meteor.publish('notifications', function() {
    return Notifications.find({
        userId: this.userId,
        read: false
    });
});
