import React from 'react';

class CatchError extends React.Component {
    state = { error: null }
    static getDerivedStateFromError(error) {
        return { error: error };
    }

    render() {
        if (this.state.error !== null) {
            return <h1>{this.state.error.message}</h1>;
        }

        return this.props.children;
    }
}
export default CatchError;
