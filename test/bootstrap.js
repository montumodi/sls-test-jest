const { spawn} = require('child_process');

let slsOfflineProcess;

module.exports = async () => {
    console.log('[Tests Bootstrap] Start');
    await startSlsOffline((err) => {
        if (err) {
            console.log(err);
        }

        console.log('[Tests Bootstrap] Done');
    });
}

const startSlsOffline = (done) => {
    if (slsOfflineProcess) {
        slsOfflineProcess.kill('SIGINT');
        console.log('Serverless Offline stopped');
				done();
				return;
    }

    slsOfflineProcess = spawn('sls', [ 'offline', 'start', '--port', 3005 ]);

    console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid} and PORT: 3005`);

    slsOfflineProcess.stdout.on('data', (data) => {
        if (data.includes('Offline listening on')) {
            // console.log(data.toString().trim());
            done();
        }
    });

    slsOfflineProcess.stderr.on('data', (errData) => {
        console.log(`Error starting Serverless Offline:\n${errData}`);
        done(errData);
    });
};