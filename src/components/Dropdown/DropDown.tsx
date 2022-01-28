import React, { Component, ReactNode } from 'react';
import './DropDown.css'

interface IDropDownProps{
    items: IDropDownItem[]
    selectItem: (item:IDropDownItem)=>void
}

interface IDropDownState{
    isOpen: boolean
    selected: IDropDownItem
}
class Dropdown extends Component<IDropDownProps,IDropDownState>{
    state: IDropDownState = {
        isOpen: false,
        selected: this.props.items[0]
    }
    toggleList = () => {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
       }))
     }
    selectItem = (item : IDropDownItem) => {
        const { selectItem } = this.props;
      
        this.setState({
          selected: item,
          isOpen: false,
        }, () => selectItem(item));
    }
    close = () => {
        this.setState({
          isOpen: false,
        });
      }
      
    componentDidUpdate(){
        const { isOpen } = this.state;
        setTimeout(() => {
            if(isOpen){
              window.addEventListener('click', this.close)
            }
            else{
              window.removeEventListener('click', this.close)
            }
          }, 0)
    }
    
    render() : ReactNode {
        const { isOpen, selected } = this.state;
        const { items } = this.props;
      
        return (
          <div className="dd-wrapper">
            <button type="button"  className={`dd-header ${isOpen ? "focused" : ""}`} onClick={this.toggleList}>
                <div className="dd-header-title MulishText">{selected.title}</div>
                <span className={`dropDownArrow ${isOpen ? "closeArrow" : "openArrow"}`}></span>
            </button>
            {isOpen && (
              <div
                role="list"
                className="dd-list"
              >
                {items.map((item) => (
                  <button
                    type="button"
                    className="dd-list-item"
                    key={item.id}
                    onClick={() => this.selectItem(item)}
                  >
                    <div className="MulishText"> {item.title}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      }
}

export interface IDropDownItem{
    id: number,
    selected:boolean,
    title: string
}

export default Dropdown;