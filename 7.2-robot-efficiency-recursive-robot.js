// recursiveRobot always takes the shortest route possible
// average 10.8 turns

function recursiveRobot(state, memory) {
  if (memory.length == 0) {
    // find the shortest solution
    memory = recursiveSearch(state);
  }
  // run like routeRobot()
  return {direction: memory[0], memory: memory.slice(1)};
}


// finds the shortest route by trying all possibilities
function recursiveSearch(stateArg) {
  // end of route is reached
  if (stateArg.parcels.length == 0) {
    return [];
  }

  let parcels = stateArg.parcels;
  let place = stateArg.place;
  let shortestRoute = [];

  for (let i = 0; i < parcels.length; i++) {
    let parcel = parcels[i];
    let tempRoute = [];

    if (parcel.place != place) {
      // make route to parcel location
      tempRoute = findRoute(roadGraph, place, parcel.place);
    } else {
      // parcel at robot: make route to parcel destination
      tempRoute = findRoute(roadGraph, place, parcel.address);
    }
    // create new "virtual" state so recursiveRobot's real state is unchanged
    let state = new VillageState(place, parcels);
    // change the virtual state to go to/deliver package i
    state = runVirtualRobot(state, tempRoute);
    // add completed route together
    tempRoute = tempRoute.concat(recursiveSearch(state));
    // compare this completed route against current shortest
    if (tempRoute.length < shortestRoute.length || shortestRoute.length == 0) {
      shortestRoute = tempRoute;
    }
  }

  return shortestRoute;
}


// runVirtualRobot changes the place and package state
function runVirtualRobot(state, memory) {
  for (let turn = 0;; turn++) {
    if (memory.length == 0) {
      break;
    }
    let action = {direction: memory[0], memory: memory.slice(1)};
    state = state.move(action.direction);
    memory = action.memory;
  }
  return state;
}


// test case
runRobot(VillageState.random(), recursiveRobot, []);


/*
goalOrientedRobot focuses on only 1 parcel at a time. The hint says a better
robot should look at all parcels, prefer the shortest route, and prefer picking
up parcels versus dropping them off of same route length.

Is there a way to plan out the route to prevent backtracking?
  One might have to calculate the shortest route each package could take to get
    to its destination.
  How would each package take into account the other packages?
  One could come up with a list of all the places that must be visited at least
    once (package origins and desitinations)
  Would choosing a search branch that picks up the most parcels in the least
    turns be preferable at the start?
  Would prefering a route with common nodes be best? (If 1 package is out of the
    way and the rest are grouped, should it be gotten first or last?)
  Just go with the provided solution? shortest distance, pickup preference?
  Shortest RECURSIVELY tests all routes to packages and deliveries and chooses
    the absolute best.
*/

/*
recursive route{ unpicked and undelivered}
get route for unpicked[b, c, d, e]
  use: findRoute(graph, from, to); it should find the shortest path from a to b
get route for undelivered[a]
return shortest
then! turns into mailDelivery robot and just follows the path.
In our starting state we have a starting place (post office) and an array of parcels
*/

/*
1. recursively find the best route using findRoute() and a modified
   goalOrientedRobot(), will have to drop any delivered parcels
2. store the best route as an array similar to mailRoute[]
3. complete pickup and delivery by RUNNING routeRobot();
4. possible problems: will have to decide to run route robot if memory is empty?
     then: how to differentiate between having completed the task or starting
     the task? -- Could use a simple boolean: let start = true; if (start) {... start = false}
     would need to pass this to memory though...
  Although: it looks as if it shouldn't matter. (see routeRobot and goalOrientedRobot)

  how does it know packages are delivered?
  they are taken out of the array of parcels
*/


// dependancies
var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
