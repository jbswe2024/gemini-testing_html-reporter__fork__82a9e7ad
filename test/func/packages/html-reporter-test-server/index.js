'use strict';

const path = require('path');
const express = require('express');

module.exports = (testplane, pluginConfig) => {
    if (pluginConfig.enabled === false) {
        return;
    }

    if (testplane.isWorker()) {
        return;
    }

    let server;
    const {port = 8080} = pluginConfig;

    testplane.on(testplane.events.RUNNER_START, () => {
        const app = express();
        app.use(express.static(path.resolve(__dirname, '../..')));
        server = app.listen(port, (err) => {
            if (err) {
                console.error('Failed to start test server:');
                throw new Error(err);
            }

            console.info(`Server is listening on http://localhost:${port}`);
        });
    });

    testplane.on(testplane.events.RUNNER_END, () => {
        server.close(() => console.info(`Server was closed`));
    });
};
