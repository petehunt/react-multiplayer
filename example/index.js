/** @jsx React.DOM */
var React = require('react/addons');
var ReactMultiplayer = require('react-multiplayer');
var marked = require('react-marked');

ReactMultiplayer.setFirebaseRoot('https://YOUR_FIREBASE_ID.firebaseio.com/');

var Notepad = React.createClass({
  mixins: [ReactMultiplayer.Mixin, React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
        <textarea valueLink={this.linkState('text')} style={{position: 'absolute', left: 0, width: '50%', top: 0, bottom: 0}} />
        <div style={{position: 'absolute', right: 0, width: '50%', top: 0, bottom: 0, overflow: 'scroll'}}>{marked(this.state.text)}</div>
      </div>
    );
  }
});

React.renderComponent(<Notepad />, document.body);
