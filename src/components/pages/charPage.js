import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';
import gotService from '../../services/gotService';

export default class CharPage extends Component {
  gotService = new gotService();

  state = {
    selectedChar: 130,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
        selectedChar: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllChars}
        renderItem={({name, gender}) => `${name} (${gender})`}/>
    );

    const itemDetails = (
      <ItemDetails 
        itemId={this.state.selectedChar}
        getData={this.gotService.getChar}>
          <Field field='gender' label='Gender'/>
          <Field field='born' label='Born'/>
          <Field field='died' label='Died'/>
          <Field field='culture' label='Culture'/>
      </ItemDetails>
    )
  
    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}