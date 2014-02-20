# react-multiplayer

Make your React apps multiplayer! This leverages [Firebase](http://firebase.com) to magically make a React component's state shared across multiple users.

## Tutorial: multiplayer notepad

Creating [multiplayer notepad](http://bash.org/?85514) is very simple. First, create a simple [controlled textarea](http://facebook.github.io/react/docs/forms.html), just like you would with any form in React. We'll use [React's two-way binding helpers](http://facebook.github.io/react/docs/two-way-binding-helpers.html) to save us some typing:

```javascript
/** @jsx React.DOM */

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {text: ''};
  },
  render: function() {
    return <textarea valueLink={this.linkState('text')} />;
  }
});

React.renderComponent(<App />, document.body);
```

Next, let's make it multiplayer by adding two lines of code.

```javascript
/** @jsx React.DOM */

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactMultiplayer.Mixin],
  getInitialState: function() {
    return {text: ''};
  },
  render: function() {
    return <textarea valueLink={this.linkState('text')} />;
  }
});

ReactMultiplayer.setFirebaseRoot('https://YOUR_ID_HERE.firebase.com/');
React.renderComponent(<App />, document.body);
```

Bam. You're done.

## Extra features

If you want finer control over how state is shared (i.e. multiple chat rooms), override `getFirebaseURL()`:

```javascript
/** @jsx React.DOM */

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactMultiplayer.Mixin],
  getInitialState: function() {
    return {text: ''};
  },
  getFirebaseURL: function() {
    return 'https://YOUR_ID_HERE.firebaseio.com/' + this.props.chatroom;
  },
  render: function() {
    return <textarea valueLink={this.linkState('text')} />;
  }
});

React.renderComponent(<App chatroom="mychat" />, document.body);
```
