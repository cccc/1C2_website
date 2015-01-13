"use strict";

var DELAY = 500;
var smoothScroll = function(target) {
  var posX = window.pageXOffset
  var start = window.pageYOffset;
  var target = document.querySelector(target).offsetTop;
  var speed = (target - start) / DELAY;
  var ellapsed = 0;
  var id = window.setInterval(function() {
    ellapsed += 10;
    if (ellapsed === DELAY) { window.clearInterval(id); }
    window.scrollTo(posX, start + speed * ellapsed);
  }, 10);
};

var links = document.querySelectorAll("nav a");
var targets = [];
for (var i = 0; i < links.length; ++i) {
  var href = links[i].attributes.getNamedItem("href").value;
  if (href[0] === '#') {
    targets.push(document.querySelector(href));
  } else {
    targets.push(null);
  }
  links[i].onclick = function(ev) {
    smoothScroll(this.attributes.getNamedItem("href").value);
    ev.preventDefault();
  };
}

var lastLink;
var scrollspy = function(ev) {
  var pos = window.pageYOffset;
  var cur;
  for (var i = 0; i < targets.length; ++i) {
    if (targets[i] && targets[i].offsetTop <= pos) {
      cur = i;
    }
  }
  if (cur !== undefined) {
    if (lastLink) {
      lastLink.classList.remove("active");
    }
    links[cur].classList.add("active");
    lastLink = links[cur];
  }
};

window.onscroll = scrollspy;
scrollspy();
