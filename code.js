function tsp_hk(distance_matrix) {
    if (distance_matrix.length <= 1) {
        return 0;
    }
    // Resets cache every time the function is called
    let cache = {};

    let cities = Array.from({ length: distance_matrix.length }, (_, i) => i);

    let minTourLength = Infinity;

    // Loop through the matrix to find the shortest path
    for (let start = 0; start < cities.length; start++) {
        let tourLength = heldKarp(distance_matrix, start, cities, cache);
        minTourLength = Math.min(minTourLength, tourLength);
    }

    return minTourLength === Infinity ? 0 : minTourLength;
}

function heldKarp(dm, start, cities, cache) {
    let key = JSON.stringify([cities.slice().sort(), start]); 

    // Check if already in the cache
    if (cache[key] !== undefined) {
        return cache[key];
    }

    if (cities.length === 2) {
        cache[key] = dm[cities[0]][cities[1]];
        return cache[key];
    } else {
        let minimum = Infinity;

        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];

            if (city !== start) {
                let newCities = cities.filter(city => city !== start);
                let newMin = heldKarp(dm, city, newCities, cache) + dm[start][city];

                minimum = Math.min(minimum, newMin);
            }
        }

        cache[key] = minimum;
        return minimum;
    }
}



/*
Sources used : 

https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
Referred to - Cademaynard and Ryan Zafft Implementation

*/
