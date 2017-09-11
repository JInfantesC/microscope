Template.postPage.helpers({
    comments: function() {
        return Comments.find({
            //The template is inside a postPage, so this references the current post.
            postId: this._id
        });
    }
});
