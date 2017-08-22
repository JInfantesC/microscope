# Microscope application
![meteor](https://d14xs1qewsqjcd.cloudfront.net/assets/logo-black.svg)

Following [Discover Meteor book](https://www.discovermeteor.com/) and other resources for the purpose of learning.

## 1. Getting Started
### Meteor rules
More like guidelines
- Code in the /server directory only runs on the server.
- Code in the /client directory only runs on the client.
- Everything else runs on both the client and server.
- Your static assets (fonts, images, etc.) go in the /public directory.

And it's also useful to know how Meteor decides in which order to load your files:
1. Files in /lib are loaded before anything else.
2. Any main.* file is loaded after everything else.
3. Everything else loads in alphabetical order based on the file name.

## 2. Templates
### Spacebars
Spacebars is simply HTML, with the addition of three things: inclusions (also sometimes known as “partials”), expressions and block helpers.
- Inclusions use the `{{> templateName}}` syntax, and simply tell Meteor to replace the inclusion with the template of the same name (in our case `templateName`).

- Expressions such as `{{title}}` either call a property of the current object, or the return value of a template helper as defined in the current template's manager.

- Block helpers are special tags that control the flow of the template, such as `{{#each}}…{{/each}}` or `{{#if}}…{{/if}}`.

[Spacebars on Blazejs.org](http://blazejs.org/guide/spacebars.html)

### Helpers
A helper is template's logic. The template displays the data and the helper(_Logic_) do the work behind scene.

## 3. Collections
### Client and server
On the server, the collection has the job of talking to the MongoDB database, and reading and writing any changes. In this sense, it can be compared to a standard database library.

On the client however, the collection is a copy of a subset of the real, canonical collection. The client-side collection is constantly and (mostly) transparently kept up to date with that subset in real-time.

### Find & Fetch

In Meteor, `find()` returns a cursor, which is a reactive data source. When we want to log its contents, we can then use `fetch()` on that cursor to transform it into an array.

Within an app, Meteor is smart enough to know how to iterate over cursors without having to explicitly convert them into arrays first. This is why you won't see `fetch()` that often in actual Meteor code.
