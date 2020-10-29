import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import './itemList.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner/';


export default class ItemList extends Component {
    gotService = new gotService();
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllChars()
            .then(charList => {
                this.setState({charList});
            })
    }

    renderItems(arr) {
        // const id = Math.floor(Math.random() * 100);
        return arr.map((item, i) => {
            return (
                <li 
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}>
                    {item.name}
                </li>
            )
        })
    }

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }
    componentDidMount() {
        this.gotService.getAllChars()
            .then((charList) => {
                this.setState({
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }
    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            charList: null,
            error: true
        })
    }
    renderItems(arr) {
        return arr.map(item => {
            const {id, name} = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}
                    >
                    {name}
                </li>
            )
        })
    }


    render() {
<<<<<<< HEAD
        const {charList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if(!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

=======
        const {charList} = this.state;

        if(!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList);
 
>>>>>>> 802bb0c2006dba692bebd3a7d9b02f2caf0b25d6
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}