export interface PriorityQueue {
    insert(task: Task): void;
    run(): void;
  }
  
  export interface Task {
    job: string;
    priority: number;
  }
  
  interface Rankable {
    priority: number;
  }
  
  export class Heap<T extends Rankable> {
    private items: T[] = [];
  
    get size(): number {
      return this.items.length;
    }
    get isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    private heapifyUp() {
      let index = this.size - 1;
  
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (this.items[parent].priority > this.items[index].priority) {
          break;
        }
        this.swap(index, parent);
  
        index = parent;
      }
    }
  
    extract(): T | undefined {
      this.swap(0, this.size - 1);
      const maxItem = this.items.pop();
  
      this.heapifyDown(0);
      return maxItem;
    }
  
    private heapifyDown(index: number): void {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
  
      let largest = index;
  
      if (
        left < this.size &&
        this.items[left].priority > this.items[largest].priority
      ) {
        largest = left;
      }
      if (
        right < this.size &&
        this.items[right].priority > this.items[largest].priority
      ) {
        largest = right;
      }
      if (largest !== index) {
        this.swap(largest, index);
        this.heapifyDown(largest);
      }
    }
  
    private swap(a: number, b: number) {
      const tmp = this.items[a];
      this.items[a] = this.items[b];
      this.items[b] = tmp;
    }
  
    insert(item: T) {
      this.items.push(item);
  
      if (this.size > 1) {
        this.heapifyUp();
      }
    }
  }
  
  export class JobRunner implements PriorityQueue {
    heap: Heap<Task>;
  
    constructor(heap: Heap<Task>) {
      this.heap = heap;
    }
  
    run(): void {
      while (!this.heap.isEmpty) {
        console.log(this.heap.extract());
      }
    }
  
    insert(task: Task) {
      this.heap.insert(task);
    }
  }
  
  // O(N*log(N))
  