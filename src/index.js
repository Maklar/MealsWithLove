import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes";
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/shards.min.css';

ReactDOM.render(Routes, document.getElementById('root'));
registerServiceWorker();
