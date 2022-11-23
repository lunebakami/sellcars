import BeeQueue from 'bee-queue';
import Bee from 'bee-queue';
import ApprovationMail from '../app/jobs/ApprovationMail';
import redisConfig from '../config/redis';

const jobs = [ApprovationMail];

type FailedJob = {
  queue: {
    name: string;
  };
};

type QueueType = {
  [key: string]: {
    bee: BeeQueue;
    handle: Function;
  };
};

interface QueueLib {
  queues: QueueType;
}

class Queue implements QueueLib {
  queues: QueueType;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: string, jobData: Record<string, unknown>) {
    return this.queues[queue].bee.createJob(jobData).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle as any);
    });
  }

  handleFailure(job: FailedJob, err: Error) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
