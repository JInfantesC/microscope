/*
To Var Or Not To Var?

In Meteor, the var keyword limits the scope of an object to the current file.
Here, we want to make the Posts collection available to our whole app, which is
why we're not using the var keyword.
*/
Posts = new Mongo.Collection("posts");
