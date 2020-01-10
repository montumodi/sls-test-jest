const { spawn } = require('child_process');

let slsOfflineProcess;

beforeAll(async () => {
	console.log('[Tests Bootstrap] Start');

	await startSlsOffline((err) => {
		if (err) {
			console.log(err);
		}

		console.log('[Tests Bootstrap] Done');
	});
}, 30000);

afterAll(async () => {
	console.log('[Tests Teardown] Start');

	await stopSlsOffline();

	console.log('[Tests Teardown] Done');
});

// Helper functions

const startSlsOffline = (done) => {
	slsOfflineProcess = spawn('sls', [ 'offline', 'start', '--port', 3005 ]);

	console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid} and PORT: 3005`);

	slsOfflineProcess.stdout.on('data', (data) => {
		if (data.includes('Offline listening on')) {
			console.log(data.toString().trim());
			done();
		}
	});

	slsOfflineProcess.stderr.on('data', (errData) => {
		console.log(`Error starting Serverless Offline:\n${errData}`);
		done(errData);
	});
};

const stopSlsOffline = () => {
	slsOfflineProcess.kill('SIGINT');
	console.log('Serverless Offline stopped');
};
