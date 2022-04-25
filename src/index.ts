import { Heap, JobRunner, PriorityQueue, Task } from "./JobRunner";

function queueJobs(jr:PriorityQueue) {
  for (let i = 0; i < 10000; i++) {

    jr.insert({ job: `task ${i}`, priority: Math.random() });
  }
}

// function waitFor(millis:number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(null), millis);
//   });
// }

const jobRunner = new JobRunner(new Heap<Task>());
queueJobs(jobRunner);

jobRunner.run()

