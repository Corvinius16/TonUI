import React from "react";
import ReactDOM from "react-dom"
import "./Modal.css"
class ModalPool extends React.Component {
    el: HTMLElement = document.createElement("div");
  
    componentDidMount() {
      document.body.appendChild(this.el);
      document.body.classList.add('disableOverflow');
    }
  
    componentWillUnmount() {
        document.body.removeChild(this.el);
        document.body.classList.remove('disableOverflow');
    }
  
    render() {
      this.el.classList.add("backAddPool");
      return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default ModalPool;