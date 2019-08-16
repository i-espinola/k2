import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import React from 'react';

// Start App
import App from './views/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
