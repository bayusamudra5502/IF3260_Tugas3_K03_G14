import { Vector } from "./Vector.js";
var Face = /** @class */ (function () {
    function Face(options) {
        this.normalData = [];
        this.tangentData = [];
        this.verticesData = options.isInverted
            ? options.vertices.reverse()
            : options.vertices;
        if (options.color instanceof Array) {
            this.colorsData = options.color;
        }
        else {
            this.colorsData = [];
            for (var i = 0; i < this.verticesData.length; i++) {
                this.colorsData.push(options.color);
            }
        }
        this.makeTriangle();
        this.calculateNormal();
        this.calculateTangent();
    }
    Object.defineProperty(Face.prototype, "vertices", {
        get: function () {
            return this.verticesData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "colors", {
        get: function () {
            return this.colorsData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "indicies", {
        get: function () {
            return this.indiciesData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "normals", {
        get: function () {
            return this.normalData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "tangents", {
        get: function () {
            return this.tangentData;
        },
        enumerable: false,
        configurable: true
    });
    Face.prototype.makeTriangle = function () {
        var newIndicies = [];
        for (var i = 1; i < this.vertices.length - 1; i++) {
            newIndicies.push(0);
            newIndicies.push(i);
            newIndicies.push(i + 1);
        }
        this.indiciesData = newIndicies;
    };
    /* This function assumes that face is flat  */
    Face.prototype.calculateNormal = function () {
        if (this.indiciesData.length < 3) {
            throw new Error("vertices length at least 3");
        }
        var v1 = Vector.fromVertex(this.verticesData[0], this.verticesData[1]);
        var v2 = Vector.fromVertex(this.verticesData[1], this.verticesData[2]);
        var normal = Vector.normal(v1, v2);
        for (var i = 0; i < this.indiciesData.length; i++) {
            this.normalData.push(normal);
        }
    };
    Face.prototype.calculateTangent = function () {
        if (this.indiciesData.length < 2) {
            throw new Error("vertices length at least 2");
        }
        var v1 = Vector.fromVertex(this.verticesData[0], this.verticesData[1]);
        for (var i = 0; i < this.indiciesData.length; i++) {
            this.tangentData.push(v1);
        }
    };
    return Face;
}());
export { Face };
//# sourceMappingURL=Face.js.map