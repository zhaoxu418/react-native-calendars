import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor from './style';

class Day extends Component {
  static propTypes = {
    // TODO: selected + disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marked: PropTypes.any,
    onPress: PropTypes.func,
    markingExists: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    return ['state', 'children', 'marked', 'onPress', 'markingExists'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];

    let marked = this.props.marked || {};
    if (marked && marked.constructor === Array && marked.length) {
      marked = {
        marked: true
      };
    }
    let dot;
    if (marked.marked) {
      dotStyle.push(this.style.visibleDot);
      dot = (<View style={dotStyle}/>);
    } else if (!this.props.markingExists) {
      textStyle.push(this.style.alignedText);
    }

    let dotText = null;
    if (marked.marked) {

    } else {
      if (marked.textValue) {
        dotText = <Text style = {{fontSize:8, color:'#cccccc'}}>{marked.textValue}</Text>
      }
    }

    if (this.props.state === 'selected' || marked.selected) {
      // containerStyle.push(this.style.selected);
      dotStyle.push(this.style.selectedDot);
      textStyle.push(this.style.selectedText);
    } else if (this.props.state === 'disabled' || marked.disabled) {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      textStyle.push(this.style.todayText);
    }
    // onPress = { marked.textValue || marked.marked || this.props.state === 'disabled' || marked.disabled ? this.props.onPress : () => { console.log('没有记录') } }
    return (
      <TouchableOpacity style={[containerStyle, {height:39}]} onPress={this.props.onPress}>
      {
        this.props.state === 'selected' || marked.selected ?
        (
          <View style = {{height:32, width:32, borderRadius:16, backgroundColor:'rgb(129, 159, 249)', position:'absolute', top:0, left:0}}>
          </View>
        ) : 
        (
          null
        )
      }
      <Text style={{ color: this.props.state === 'selected' || marked.selected ? 'white' : '#8b8b8b', opacity: this.props.state === 'disabled' || marked.disabled ? 0.5 : 1, marginTop:7, fontSize:14, backgroundColor:'transparent'}}>{String(this.props.children)}</Text>
        {
          marked.marked ?
          (
            dot
          ) : 
          (
            this.props.state === 'selected' || marked.selected ?
            (
              null
            ) : 
            (
              dotText
            )
          )
        }
      </TouchableOpacity>
    );
  }
}

export default Day;
