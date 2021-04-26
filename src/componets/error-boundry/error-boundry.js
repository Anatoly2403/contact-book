import React from 'react';
import ErrorMessage from '../error-message';


export default class ErrorBoundry extends React.Component {
    state = { hasError: false }
    componentDidCatch() {
        this.setState({ hasError: true })
    }
    render() {
        return (this.state.hasError) ? <ErrorMessage /> : this.props.children
    }
}