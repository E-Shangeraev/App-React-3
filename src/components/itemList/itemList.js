import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemList.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function ItemList(props) {
    function renderItems(arr) {
        return arr.map(item => {
            const {id} = item;
            const label = props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    const {data} = props;
    const items = renderItems(data);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        }
    
        static defaultProps = {
            onItemSelected: () => {}
        }
        
        static propTypes = {
            onItemSelected: PropTypes.func
        }
    
        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        error: false
                    });
                })
                .catch(() => {this.onError()});
        }

        componentDidCatch() {
            this.setState({
                data: null,
                error: true
            })
        }
    
        onError() {
            this.setState({
                charList: null,
                error: true
            })
        }

        render() {
            const {data, error} = this.state;

            if(error) {
                return <ErrorMessage/>
            }

            if(!data) {
                return <Spinner/>
            }

            return <View {...this.props} data={data}/>
        }
    };
}

const {getAllChars} = new gotService();
export default withData(ItemList, getAllChars);