import defaults from "./defaults";
import App from "./core/App.js";
import { VERSION } from './env/data.js';

function createInstance(defaultConfig){
    const context = new App(defaultConfig);

    return context;
}

const app = createInstance(defaults);

app.VERSION = VERSION;

export default app;