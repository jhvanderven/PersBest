ControlledCheckbox = ReactMeteor.createClass({
  getInitialState:function(){
    return{
      checked: this.props.checked 
    };
  },

  render: function() {
    var innerhtml='';
    if(this.props.text!==undefined){
      innerhtml = this.props.text;
    }
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        checked={this.state.checked}
        autoFocus={this.props.autoFocus}
        autoSubmit={this.props.autoSubmit}
        type="checkbox"
      >{innerhtml}</input>

    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onChange(this.props.id, this.state.checked);
    // this.setState({
    //   value: ''
    // });
  },

  _onChange: function(/*object*/ event) {
    // directly save the change as this is a "complete" event, unlike entering text
    console.log(event.target.checked);
    this.props.onChange(this.props.id, event.target.checked);
    this.setState({
      checked: event.target.checked
    });
  },

  _onKeyDown: function(event) {
    if(this.props.autoSubmit){
      if (event.keyCode === ENTER_KEY_CODE) {
        this._save();
      }
    }
  }
});
