const mainContainer = document.getElementById("main");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const p1HealthBar = document.querySelector("#p1Health");
const p2HealthBar = document.querySelector("#p2Health");

canvas.width = 1024;
canvas.height = 576;

// adjusting main div width
mainContainer.style.maxWidth = canvas.width;

// add white background to the canvas
// c.fillRect(0, 0, canvas.width, canvas.height);