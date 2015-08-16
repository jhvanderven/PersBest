ControlledInput = ReactMeteor.createClass({
  getInitialState:function(){
    return{
      value: this.props.value 
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
        value={this.state.value}
        autoFocus={this.props.autoFocus}
        autoSubmit={this.props.autoSubmit}
        type={this.props.type}
        min={this.props.min}
        max={this.props.max}
        pattern={this.props.pattern} // does not seem to work
        step={this.props.step} // hmmm. 1 for large distances, 0.01 for sprints
      >{innerhtml}</input>

    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onChange(this.props.id, this.state.value);
    // this.setState({
    //   value: ''
    // });
  },

  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
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
