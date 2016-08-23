import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, FormGroup, FormControl, InputGroup, Panel} from 'react-bootstrap';
import DataPanel from './DataPanel';
import {step} from '../types/step';

export default class Editor extends Component {
  constructor(props){
    super(props);
    this.api = impress();
  }
  newSlide(actions){
    let _move = document.getElementsByClassName('step').length;
    let _step = new step({
      content: '<div>New Slide</div>',
      data: {
        x: _move*300
      }
    });
    actions.addSlide(_step);
  }
  deleteSlide(actions){
    let _steps = [...document.getElementsByClassName('step')];
    let _cur = document.getElementsByClassName('step active')[0];
    let _target = _steps.indexOf(_cur);
    actions.delSlide(_target);
  }
  handleClick(e){
    let {actions} = this.props;
    
    if (e.target.name === 'add')
      this.newSlide(actions);
    else if (e.target.name === 'del')
      this.deleteSlide(actions);
    else if (e.target.name === 'overview')
      this.api.goto('overview');
  }
  
  render() {
    return (
      <div>
        <Button name="add" onClick={this.handleClick.bind(this)}>ADD</Button>
        <Button name="del" onClick={this.handleClick.bind(this)}>DEL</Button>
        <Button name="overview" onClick={this.handleClick.bind(this)}>Overview</Button>
        <DataPanel />
      </div>
    );
  }
}
