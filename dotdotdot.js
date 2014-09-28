var dotdotdot = {};

dotdotdot.run = function(canvas) {
  var ctx = canvas.getContext("2d");

  // start the fun
  var third = canvas.width / 3;
  var horizon = canvas.height / 6;
  var r = third / 5;

  var c = Math.cos(Math.PI / 2);
  var s = Math.sin(Math.PI / 2);

  var env = {r: r, s: s, c: c};

  var c1 = {x: 0.5 * third, y: horizon},
      c2 = {x: 0.5 * third + third, y: horizon},
      c3 = {x: 0.5 * third + 2 * third, y: horizon};

  ctx.save();

  for (var o = 1; o < 6; o += 2) {
    ctx.beginPath();
    ctx.arc(c1.x, c1.y * o, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c2.x, c2.y * o, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c3.x, c3.y * o, r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();

  // pt 1
  ctx.save();
  ctx.translate(c1.x, c1.y);

  dotdotdot.dots.lines(ctx, env);

  ctx.restore();

  // pt 1, variant 1
  ctx.save();
  ctx.translate(c2.x, c2.y);

  dotdotdot.dots.wildLines(ctx, env);

  ctx.restore();

  // pt 2, rectangles
  ctx.save();
  ctx.translate(c3.x, c3.y);

  dotdotdot.dots.rectangles(ctx, env);

  ctx.restore();

  // pt 3, triangles
  ctx.save();
  ctx.translate(c1.x, c1.y * 3);

  dotdotdot.dots.triangles(ctx, env);

  ctx.restore();

  // pt 5, spiral
  ctx.save();
  ctx.translate(c2.x, c2.y * 3);

  dotdotdot.dots.spiral(ctx, env);

  ctx.stroke();
  ctx.restore();

  // pt x, path
  ctx.save();
  ctx.translate(c3.x, c3.y * 3);

  dotdotdot.dots.connectedLines(ctx, env);

  ctx.stroke();
  ctx.restore();

  // pt ?, squigglies
  ctx.save();
  ctx.translate(c1.x, c1.y * 5);

  dotdotdot.dots.squigglies(ctx, env);

  ctx.stroke();
  ctx.restore();

  // pt z, in circles
  ctx.save();
  ctx.translate(c2.x, c2.y * 5);

  dotdotdot.dots.growingCircles(ctx, env);

  ctx.stroke();
  ctx.restore();

  // pt a, in rectangles
  ctx.save();
  ctx.translate(c3.x, c3.y * 5);

  dotdotdot.dots.growingRectangles(ctx, env);

  ctx.restore();
}

dotdotdot.dots = {};

dotdotdot.dots.lines = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  for (var i = 0; i < 20; i++) {
    ctx.rotate(Math.random() * 2 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(-r * c, -r * s);
    ctx.lineTo( r * c,  r * s);
    ctx.stroke();
  }
}

dotdotdot.dots.wildLines = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  for (var i = 0; i < 20; i++) {
    ctx.beginPath();
    
    ctx.save();
    ctx.rotate(Math.random() * 2 * Math.PI);
    ctx.moveTo(r * c, r * s);

    ctx.rotate(Math.PI / 2 + Math.random() * Math.PI);
    ctx.lineTo(r * c, r * s);
    ctx.restore();
    
    ctx.stroke();
  }
}

dotdotdot.dots.rectangles = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  var n = 9;
  for (var i = 0; i < n; i++) {
  //   ctx.rotate(2 * Math.PI / n); // breaks when n is even
    ctx.rotate(2 * Math.PI / n + Math.random() * Math.PI / 10); // generate many
    
    ctx.beginPath();
    ctx.moveTo(r * c, r * s);
    for (var j = 0; j < 4; j++) {
      ctx.rotate(Math.PI / 2);
      ctx.lineTo(r * c, r * s);
    }
    ctx.stroke();
  }
}

dotdotdot.dots.triangles = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  var n = 4;
  for (var i = 0; i < n; i++) {
  //   ctx.rotate(2 * Math.PI / n);
    ctx.rotate(2 * Math.PI / n + Math.random() * Math.PI / 10); // generate many
    
    ctx.beginPath();
    ctx.moveTo(r * c, r * s);
    for (var j = 0; j < 3; j++) {
      ctx.rotate(2 * Math.PI / 3);
      ctx.lineTo(r * c, r * s);
    }
    ctx.stroke();
  }
}

dotdotdot.dots.spiral = function(ctx, env) {
  ctx.beginPath();
  ctx.moveTo(0, 0);

  var a = 0, b = 0.1;
  var z = 0, theta = Math.random() * 2 * Math.PI;

  var n = 500 + Math.random() * 500;
  for (var i = 0; i < n; i++) {
    z = a + b * theta;
    ctx.translate(z * Math.cos(theta), z * Math.sin(theta));
    ctx.lineTo(0, 0);
  //   ctx.lineTo(Math.random() * 2, Math.random() * 2);
    theta += 0.1;
  }
}

dotdotdot.dots.connectedLines = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  ctx.beginPath();

  for (var i = 0; i < 20; i++) {
    ctx.rotate(Math.PI / 2 + Math.PI * Math.random());
    ctx.save();
    ctx.lineTo(r * c, r * s);
    ctx.restore();
  }
}

dotdotdot.dots.squigglies = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  ctx.beginPath();
  ctx.moveTo(0, 0);

  for (var i = 0; i < 10; i++) {
    var x = Math.random() * r * c,
        y = Math.random() * r * s;
    ctx.rotate(2 * Math.PI * Math.random());
    ctx.quadraticCurveTo(r * c, r * s, x, y);
  }
}

dotdotdot.dots.growingCircles = function(ctx, env) {
  var r = env.r;

  for (var i = 0; i < r; i += Math.random() * r * Math.random()) {
    ctx.beginPath();
    ctx.arc(0, 0, i, 0, Math.PI * 2);
    ctx.stroke();
  }
}

dotdotdot.dots.growingRectangles = function(ctx, env) {
  var r = env.r, c = env.c, s = env.s;

  for (var i = 0; i < r; i += Math.random() * r * Math.random()) {
    // ctx.rotate(Math.PI / 10);
    ctx.rotate(2 * Math.PI * Math.random());
    
    ctx.beginPath();
    ctx.moveTo(i * c, i * s);
    for (var j = 0; j < 4; j++) {
      ctx.rotate(Math.PI / 2);
      ctx.lineTo(i * c, i * s);
    }
    ctx.stroke();
  }
}

dotdotdot.standalone = function() {
  document.body.innerHTML = "<canvas id=\"canvas\"></canvas>";
  canvas.style.display = "block";
  document.body.style.margin = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.onresize = resize;

  dotdotdot.run(canvas);
}