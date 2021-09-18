import React from 'react';
import ReactDom from 'react-dom';
import('./bootstrap');

const App = () => {
    return (
        <div>
            React App
        </div>
    );
}

ReactDom.render(
    <App />,
    document.getElementById('main')
)
