import React from 'react';
import ReactDom from 'react-dom';
require ('./bootstrap');

import App from "./app";

ReactDom.render(
    <App />,
    document.getElementById('main')
)
