export interface WeightedGraph {
  addVertex(key: string): void;
  addEdge(vertex1: string, vertex2: string, weight: number): void;
  getList(): AList;
}

interface AList {
  [key: string]: Node[];
}

interface Node {
  name: string;
  weight: number;
}

export class Graph implements WeightedGraph {
  adjacencyList: AList = {};

  addVertex(key: string): void {
    if (!this.adjacencyList[key]) {
      this.adjacencyList[key] = [];
    }
  }
  addEdge(vertex1: string, vertex2: string, weight: number): void {
    this.adjacencyList[vertex1].push({ name: vertex2, weight });
    this.adjacencyList[vertex2].push({ name: vertex1, weight });
  }
  getList() {
    return this.adjacencyList;
  }
}

interface Path {
  path: string[];
  distance: number;
}

export interface Info {
  [key: string]: [string | null, number];
}

export interface IDijkstra {
  findShortestPath(vertex1: string, vertex2: string): Path;
  findAllShortestPaths(vertex: string): Record<string, Path>;
}

export class Dijkstra implements IDijkstra {
  adjacencyList: AList;

  constructor(list: AList) {
    this.adjacencyList = list;
  }

  findShortestPath(vertex1: string, vertex2: string): Path {
    let visited: string[] = [];
    let unvisited = Object.keys(this.adjacencyList);

    let distanceInfo: Info = {};

    unvisited.forEach((el) => (distanceInfo[el] = [null, Infinity]));
    distanceInfo[vertex1] = [vertex1, 0];

    if (!distanceInfo[vertex2]) {
      return { path: [], distance: Infinity };
    }

    while (unvisited.length > 0) {
      const closestNode = this.getClosestNode(distanceInfo, unvisited);

      this.adjacencyList[closestNode!].forEach(({ name, weight }) => {
        let lastDistance = distanceInfo[closestNode][1];
        const newDistance = weight + lastDistance;
        if (distanceInfo[name][1] > newDistance) {
          distanceInfo[name][1] = newDistance;
          distanceInfo[name][0] = closestNode;
        }
      });
      visited.push(closestNode);
      unvisited.splice(unvisited.indexOf(closestNode), 1);
    }

    let endNode = vertex2;
    let path = [];

    while (endNode != vertex1) {
      path.push(endNode);
      endNode = distanceInfo[endNode][0]!;
    }
    path.push(vertex1);

    return { path: path.reverse(), distance: distanceInfo[vertex2][1] };
  }

  findAllShortestPaths(source: string): Record<string, Path> {
    const nodes: string[] = [];
    Object.keys(this.adjacencyList).forEach((el) => {
      if (el !== source) {
        nodes.push(el);
      }
    });

    const paths: Record<string, Path> = {};

    nodes.forEach(
      (node) => (paths[node] = this.findShortestPath(source, node)),
    );

    return paths;
  }

  private getClosestNode(distanceInfo: Info, unvisited: string[]) {
    let closest = unvisited[0];

    unvisited.forEach((node) => {
      if (distanceInfo[node][1] < distanceInfo[closest][1]) {
        closest = node;
      }
    });
    return closest;
  }
}
