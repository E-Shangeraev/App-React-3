import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {
    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = item => {
        this.setState({
            item,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            char: null,
            error: true
        })
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })

        this.setState({
            loading: true
        })

        this.gotService.getChar(itemId)
            .then( this.onItemDetailsLoaded )
            .catch( () => this.onError() );
    }

    render() {
        const {item, error} = this.state;

        if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <span className="select-error">Please select an item</span>
        }

        
        const {name} = item;
        

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   { 
                        React.Children.map(this.props.children, child => {
                            return React.cloneElement(child, {item});
                        }) 
                   }
                </ul>
            </div>
        );
    }
}
