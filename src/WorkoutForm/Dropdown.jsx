import React from 'react';
import './Dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        { value: 'Gym', id: 1 },
        { value: 'Jogging', id: 2 },
        { value: 'Cycling', id: 3 },
        { value: 'Swimming', id: 4 },
        { value: 'Hiking', id: 5 },
        { value: 'Walking', id: 6 },
      ],
      showItems: false,
      selectedItem: { value: 'Gym', id: 1 }
    };
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
    this.props.showDrop()
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    })
    this.props.showDrop(item.value)
  }

  render() {
    return(
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--arrow" onClick={this.dropDown}>
            {this.state.selectedItem.value}<span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`} />
          </div>
            <div style={{display: this.state.showItems ? 'block' : 'none'}}
              className="select-box--items">
            {
              this.state.items.map(item => {
                return <div key={item.id} onClick={() => this.selectItem(item)}
                        className={this.state.selectedItem === item ? 'selected' : ''}>
                        { item.value }
                      </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Dropdown;
