if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Microscope',
        url: 'http://192.168.1.103:3000/',
        author: "This Meteor App",
        submitted: new Date()
    });
}
