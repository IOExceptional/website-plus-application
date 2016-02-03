// this is a knockout demo application

var PlanetsModel = function() {
    this.planets = ko.observableArray([
        { name: "Mercury", type: "rock"},
        { name: "Venus", type: "rock"},
        { name: "Earth", type: "rock"},
        { name: "Mars", type: "rock"},
        { name: "Jupiter", type: "gasgiant"},
        { name: "Saturn", type: "gasgiant"},
        { name: "Uranus", type: "gasgiant"},
        { name: "Neptune", type: "gasgiant"}
    ]);

    this.typeToShow = ko.observable("all");
    this.displayAdvancedOptions = ko.observable(false);

    this.addPlanet = function(type) {
        this.planets.push({
            name: "New planet",
            type: type
        });
    };

    this.planetsToShow = ko.pureComputed(function() {
        // Represents a filtered list of planets
        // i.e., only those matching the "typeToShow" condition
        var desiredType = this.typeToShow();
        if (desiredType == "all") return this.planets();
        return ko.utils.arrayFilter(this.planets(), function(planet) {
            return planet.type == desiredType;
        });
    }, this);

    // Animation callbacks for the planets list
    this.showPlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).hide().slideDown() }
    this.hidePlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).slideUp(function() { $(elem).remove(); }) }
};

module.exports = PlanetsModel;