import { Heap, JobRunner, Task } from "../src/JobRunner/JobRunner";

describe("test job runner", () => {
  it("it works", () => {
    const jr = new JobRunner(new Heap());
    expect(jr.heap.size).toEqual(0);

    let task = {
      job: "task1",
      priority: 0,
    };

    jr.insert(task);
    expect(jr.heap.size).toEqual(1);

    task = {
      job: "task2",
      priority: 10,
    };
    jr.insert(task);

    task = {
      job: "task2",
      priority: 2,
    };

    jr.insert(task);
    expect(jr.heap.size).toEqual(3);

    task = jr.heap.extract() as Task;
    expect(task.priority).toEqual(10);
    expect(jr.heap.size).toEqual(2);

    task = jr.heap.extract() as Task;
    expect(task.priority).toEqual(2);
  });
});
