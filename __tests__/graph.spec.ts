import { Path } from "typescript";
import { Dijkstra, Graph, Info } from "../src/graph/Graph";

const res = {
  A: [
    { name: "B", weight: 6 },
    { name: "D", weight: 1 },
  ],
  B: [
    {
      name: "A",
      weight: 6,
    },
    {
      name: "D",
      weight: 2,
    },
    {
      name: "E",
      weight: 2,
    },
    {
      name: "C",
      weight: 5,
    },
  ],
  C: [
    {
      name: "B",
      weight: 5,
    },
    {
      name: "E",
      weight: 5,
    },
  ],
  D: [
    {
      name: "A",
      weight: 1,
    },
    {
      name: "B",
      weight: 2,
    },
    {
      name: "E",
      weight: 1,
    },
  ],
  E: [
    {
      name: "D",
      weight: 1,
    },
    {
      name: "B",
      weight: 2,
    },
    {
      name: "C",
      weight: 5,
    },
  ],
};

//  {
//   A: ["A", 0],
//   B: ["D", 3],
//   C: ["E", 7],
//   D: ["A", 1],
//   E: ["D", 2],
// };

const res2 = {
  path: ["A", "D", "B"],
  distance: 3,
};

describe("test graph", () => {
  it("it created adjacency list", () => {
    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");

    graph.addEdge("A", "B", 6);
    graph.addEdge("A", "D", 1);
    graph.addEdge("D", "B", 2);
    graph.addEdge("D", "E", 1);
    graph.addEdge("E", "B", 2);
    graph.addEdge("B", "C", 5);
    graph.addEdge("E", "C", 5);

    expect(graph.adjacencyList).toEqual(res);
  });

  //   it("find closest node", () => {
  //     const alg = new Dijkstra(res);

  //     const closest = alg.getClosestNode(res2, ["B", "D", "E"]);

  //     expect(closest).toEqual("D");
  //   });

  it("it created adjacency list", () => {
    const alg = new Dijkstra(res);

    const path = alg.findShortestPath("A", "B");

    expect(path).toEqual(res2);
  });
});
