import { Worker } from 'worker_threads';
import os from 'os';

const performCalculations = async () => {
  const numWorkers = os.cpus().length;
  const workerPath = new URL('./worker.js', import.meta.url);

  const calculateNthFibonacci = async (data) => {
    const worker = new Worker(workerPath, { workerData: data });

    try {
      const message = await new Promise((resolve) => {
        worker.on('message', resolve);
        worker.on('error', () => resolve({ status: 'error', data: null }));
      });
      return message;
    } finally {
      worker.terminate();
    }
  };

  const results = await Promise.all(
    Array(numWorkers).fill(null).map((_, index) =>
      calculateNthFibonacci(index + 10).then((result) => ({
        status: 'resolved',
        data: result,
      }))
    )
  );

  console.log(results);
};

performCalculations();