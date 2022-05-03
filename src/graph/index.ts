import { Dijkstra, Graph, IDijkstra, WeightedGraph } from "./Graph";

const vertices = ["A", "B", "C", "D", "E"];

const edges = [
  { from: "A", to: "D", weight: 1 },
  { from: "A", to: "B", weight: 6 },
  { from: "B", to: "D", weight: 2 },
  { from: "B", to: "C", weight: 5 },
  { from: "E", to: "C", weight: 5 },
  { from: "E", to: "B", weight: 2 },
  { from: "E", to: "D", weight: 1 },
];
const graph: WeightedGraph = new Graph();

vertices.forEach((verticle) => graph.addVertex(verticle));
edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra: IDijkstra = new Dijkstra(graph.getList());

const d1 = dijkstra.findShortestPath("A", "B"); // { path: ['A', 'D', 'B'], distance: 3 }
const d2 = dijkstra.findShortestPath("C", "A"); // { path: ["C", "E", "D", "A"], distance: 7}
const d3 = dijkstra.findShortestPath("A", "F"); // { path: [], distance: Infinity }
console.log(d1, d2, d3);

const all=  dijkstra.findAllShortestPaths("D");
console.log(all)
/*
   { 
     'A': { path: ['D', 'A'], distance: 1 },
     'B': { path: ['D', 'B'], distance: 2 },
     'C': { path: ['D', 'E', 'C'], distance: 6 },
     'E': { path: ['D', 'E'], distance: 1 },
   }
  */
