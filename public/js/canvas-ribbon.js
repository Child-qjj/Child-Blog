(function (b, a) {
    if (typeof window === "object") {
        window[b] = a()
    }
})("Ribbons", function () {
    var c = window,
        a = document.body,
        b = document.documentElement;
    var g = function () {
        if (arguments.length === 1) {
            if (Array.isArray(arguments[0])) {
                var i = Math.round(g(0, arguments[0].length - 1));
                return arguments[0][i]
            }
            return g(0, arguments[0])
        } else {
            if (arguments.length === 2) {
                return Math.random() * (arguments[1] - arguments[0]) + arguments[0]
            }
        }
        return 0
    };
    var h = function (i) {
        var m = Math.max(0, c.innerWidth || b.clientWidth || a.clientWidth || 0),
            j = Math.max(0, c.innerHeight || b.clientHeight || a.clientHeight || 0),
            k = Math.max(0, c.pageXOffset || b.scrollLeft || a.scrollLeft || 0) - (b.clientLeft || 0),
            l = Math.max(0, c.pageYOffset || b.scrollTop || a.scrollTop || 0) - (b.clientTop || 0);
        return {
            width: m,
            height: j,
            ratio: m / j,
            centerx: m / 2,
            centery: j / 2,
            scrollx: k,
            scrolly: l
        }
    };
    var e = function (i) {
        var l = h(i),
            j = i ? Math.max(0, i.pageX || i.clientX || 0) : 0,
            k = i ? Math.max(0, i.pageY || i.clientY || 0) : 0;
        return {
            mousex: j,
            mousey: k,
            centerx: j - l.width / 2,
            centery: k - l.height / 2
        }
    };
    var f = function (i, j) {
        this.x = 0;
        this.y = 0;
        this.set(i, j)
    };
    f.prototype = {
        constructor: f,
        set: function (i, j) {
            this.x = i || 0;
            this.y = j || 0
        },
        copy: function (i) {
            this.x = i.x || 0;
            this.y = i.y || 0;
            return this
        },
        multiply: function (i, j) {
            this.x *= i || 1;
            this.y *= j || 1;
            return this
        },
        divide: function (i, j) {
            this.x /= i || 1;
            this.y /= j || 1;
            return this
        },
        add: function (i, j) {
            this.x += i || 0;
            this.y += j || 0;
            return this
        },
        subtract: function (i, j) {
            this.x -= i || 0;
            this.y -= j || 0;
            return this
        },
        clampX: function (j, i) {
            this.x = Math.max(j, Math.min(this.x, i));
            return this
        },
        clampY: function (j, i) {
            this.y = Math.max(j, Math.min(this.y, i));
            return this
        },
        flipX: function () {
            this.x *= -1;
            return this
        },
        flipY: function () {
            this.y *= -1;
            return this
        }
    };
    var d = function (i) {
        this._canvas = null;
        this._context = null;
        this._sto = null;
        this._width = 0;
        this._height = 0;
        this._scroll = 0;
        this._ribbons = [];
        this._options = {
            colorSaturation: "80%",
            colorBrightness: "60%",
            colorAlpha: 0.65,
            colorCycleSpeed: 6,
            verticalPosition: "center",
            horizontalSpeed: 200,
            ribbonCount: 3,
            strokeSize: 0,
            parallaxAmount: -0.5,
            animateSections: true
        };
        this._onDraw = this._onDraw.bind(this);
        this._onResize = this._onResize.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this.setOptions(i);
        this.init()
    };
    d.prototype = {
        constructor: d,
        setOptions: function (j) {
            if (typeof j === "object") {
                for (var i in j) {
                    if (j.hasOwnProperty(i)) {
                        this._options[i] = j[i]
                    }
                }
            }
        },
        init: function () {
            try {
                this._canvas = document.createElement("canvas");
                this._canvas.style.display = "block";
                this._canvas.style.position = "fixed";
                this._canvas.style.margin = "0";
                this._canvas.style.padding = "0";
                this._canvas.style.border = "0";
                this._canvas.style.outline = "0";
                this._canvas.style.left = "0";
                this._canvas.style.top = "0";
                this._canvas.style.width = "100%";
                this._canvas.style.height = "100%";
                this._canvas.style["z-index"] = "-1";
                this._canvas.style["background-color"] = "#e8e8e8e";
                this._canvas.id = "bgCanvas";
                this._onResize();
                this._context = this._canvas.getContext("2d");
                this._context.clearRect(0, 0, this._width, this._height);
                this._context.globalAlpha = this._options.colorAlpha;
                window.addEventListener("resize", this._onResize);
                window.addEventListener("scroll", this._onScroll);
                document.body.appendChild(this._canvas)
            } catch (i) {
                console.warn("Canvas Context Error: " + i.toString());
                return
            }
            this._onDraw()
        },
        addRibbon: function () {
            var k = Math.round(g(1, 9)) > 5 ? "right" : "left",
                w = 1000,
                l = 200,
                n = 0 - l,
                m = this._width + l,
                o = 0,
                p = 0,
                u = k === "right" ? n : m,
                v = Math.round(g(0, this._height));
            if (/^(top|min)$/i.test(this._options.verticalPosition)) {
                v = 0 + l
            } else {
                if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
                    v = this._height / 2
                } else {
                    if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
                        v = this._height - l
                    }
                }
            }
            var t = [],
                q = new f(u, v),
                r = new f(u, v),
                s = null,
                i = Math.round(g(0, 360)),
                j = 0;
            while (true) {
                if (w <= 0) {
                    break
                }
                w--;
                o = Math.round((Math.random() * 1 - 0.2) * this._options.horizontalSpeed);
                p = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));
                s = new f();
                s.copy(r);
                if (k === "right") {
                    s.add(o, p);
                    if (r.x >= m) {
                        break
                    }
                } else {
                    if (k === "left") {
                        s.subtract(o, p);
                        if (r.x <= n) {
                            break
                        }
                    }
                }
                t.push({
                    point1: new f(q.x, q.y),
                    point2: new f(r.x, r.y),
                    point3: s,
                    color: i,
                    delay: j,
                    dir: k,
                    alpha: 0,
                    phase: 0
                });
                q.copy(r);
                r.copy(s);
                j += 4;
                i += this._options.colorCycleSpeed
            }
            this._ribbons.push(t)
        },
        _drawRibbonSection: function (n) {
            if (n) {
                if (n.phase >= 1 && n.alpha <= 0) {
                    return true
                }
                if (n.delay <= 0) {
                    n.phase += 0.02;
                    n.alpha = Math.sin(n.phase) * 1;
                    n.alpha = n.alpha <= 0 ? 0 : n.alpha;
                    n.alpha = n.alpha >= 1 ? 1 : n.alpha;
                    if (this._options.animateSections) {
                        var k = Math.sin(1 + n.phase * Math.PI / 2) * 0.1;
                        if (n.dir === "right") {
                            n.point1.add(k, 0);
                            n.point2.add(k, 0);
                            n.point3.add(k, 0)
                        } else {
                            n.point1.subtract(k, 0);
                            n.point2.subtract(k, 0);
                            n.point3.subtract(k, 0)
                        }
                        n.point1.add(0, k);
                        n.point2.add(0, k);
                        n.point3.add(0, k)
                    }
                } else {
                    n.delay -= 0.5
                }
                var m = this._options.colorSaturation,
                    j = this._options.colorBrightness,
                    i = "hsla(" + n.color + ", " + m + ", " + j + ", " + n.alpha + " )";
                this._context.save();
                if (this._options.parallaxAmount !== 0) {
                    this._context.translate(0, this._scroll * this._options.parallaxAmount)
                }
                this._context.beginPath();
                this._context.moveTo(n.point1.x, n.point1.y);
                this._context.lineTo(n.point2.x, n.point2.y);
                this._context.lineTo(n.point3.x, n.point3.y);
                this._context.fillStyle = i;
                this._context.fill();
                if (this._options.strokeSize > 0) {
                    this._context.lineWidth = this._options.strokeSize;
                    this._context.strokeStyle = i;
                    this._context.lineCap = "round";
                    this._context.stroke()
                }
                this._context.restore()
            }
            return false
        },
        _onDraw: function () {
            for (var l = 0, p = this._ribbons.length; l < p; ++l) {
                if (!this._ribbons[l]) {
                    this._ribbons.splice(l, 1)
                }
            }
            this._context.clearRect(0, 0, this._width, this._height);
            for (var j = 0; j < this._ribbons.length; ++j) {
                var o = this._ribbons[j],
                    n = o.length,
                    m = 0;
                for (var k = 0; k < n; ++k) {
                    if (this._drawRibbonSection(o[k])) {
                        m++
                    }
                }
                if (m >= n) {
                    this._ribbons[j] = null
                }
            }
            if (this._ribbons.length < this._options.ribbonCount) {
                this.addRibbon()
            }
            requestAnimationFrame(this._onDraw)
        },
        _onResize: function (i) {
            var j = h(i);
            this._width = j.width;
            this._height = j.height;
            if (this._canvas) {
                this._canvas.width = this._width;
                this._canvas.height = this._height;
                if (this._context) {
                    this._context.globalAlpha = this._options.colorAlpha
                }
            }
        },
        _onScroll: function (i) {
            var j = h(i);
            this._scroll = j.scrolly
        }
    };
    return d
});
new Ribbons();