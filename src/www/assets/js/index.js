(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by lee on 02/02/2016.
 */

var PlanetsModel = require('./planets');

// Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
// Could be stored in a separate utility library
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

ko.applyBindings(new PlanetsModel());
},{"./planets":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
