import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharPage from '../charPage/';
import './app.css';
export default class App extends Component {
    state = {
        showChar: true,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    toggleChar = () => {
        this.setState(state => {
            return {
                showChar: !state.showChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showChar ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                className="toggle-btn"
                                onClick={this.toggleChar}>
                                Toggle character
                            </button>
                        </Col>
                    </Row>
                    <CharPage/>
                </Container>
            </>
        );
    }
}
