
//begin-------------------ARE.DomElement---------------------begin

ARE.DomElement = ARE.DisplayObject.extend({
    "ctor": function(selector) {
        this._super();
        this.element = typeof selector == "string" ? document.querySelector(selector) : selector;
        var element = this.element;
        var observer = ARE.Observable.watch(this, ["x", "y", "scaleX", "scaleY", "perspective", "rotation", "skewX", "skewY", "regX", "regY"]);
        var self = this;
        observer.propertyChangedHandler = function() {
            var mtx = self._matrix.identity().appendTransform(self.x, self.y, self.scaleX, self.scaleY, self.rotation, self.skewX, self.skewY, self.regX, self.regY);
            self.element.style.transform = self.element.style.msTransform = self.element.style.OTransform = self.element.style.MozTransform = self.element.style.webkitTransform = "matrix(" + mtx.a + "," + mtx.b + "," + mtx.c + "," + mtx.d + "," + mtx.tx + "," + mtx.ty + ")";
        };
        delete this.visible;
        Object.defineProperty(this, "visible", {
            set: function(value) {
                this._visible = value;
                if (this._visible) {
                    this.element.style.visibility = "visible";
                } else {
                    this.element.style.visibility = "hidden";
                }
            },
            get: function() {
                return this._visible;
            }
        });
        delete this.alpha;
        Object.defineProperty(this, "alpha", {
            set: function(value) {
                this._opacity = value;
                this.element.style.opacity = value;
            },
            get: function() {
                return this._opacity;
            }
        });
        this.visible = true;
        this.alpha = 1;
        this.element.style.visibility = "hidden";
        this.element.style.position = "absolute";
    },
    "isVisible": function() {
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
    }
});

//end-------------------ARE.DomElement---------------------end
