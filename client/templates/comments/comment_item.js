Template.commentItem.helpers({
    submittedText: function() {
        return moment(this.submitted).format('DD MMM YYYY HH:mm:ss');;
    }
});
