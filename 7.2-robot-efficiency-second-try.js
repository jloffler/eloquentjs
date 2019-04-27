/*
from problem hint:
"The main limitation of goalOrientedRobot is that it considers only one parcel
at a time. It will often walk back and forth across the village because the
parcel it happens to be looking at happens to be at the other side of the map,
even if there are others much closer.

One possible solution would be to compute routes for all packages and then take
the shortest one. Even better results can be obtained, if there are multiple
shortest routes, by preferring the ones that go to pick up a package instead
of delivering a package."

efficientRobot will pick the shortest route to either pickup, or deliver a
parcel. if pickup or deliver are the same length, pickup is prefered.
*/

function efficientRobot({place, parcels}, route) {
  if (route.length == 0) {
    // pick the best destination
    for (let i = 0; i < parcels.length; i++) {
      let parcel = parcels[i];
      let tempRoute = [];

      if (parcel.place != place) {

      }
    }
  }
}