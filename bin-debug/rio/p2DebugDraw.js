var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var p2DebugDraw = (function () {
    function p2DebugDraw(world, sprite) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x7f7fe5;
        this.COLOR_S = 0x7fe57f;
        this.COLOR_BLACK = 0x000000;
        this.COLOR_RED = 0xff0000;
        this.isDrawAABB = false;
        this.factor = 30;
        this.winHeight = 800;
        this.world = world;
        this.sprite = sprite;
        canvas = document.getElementById("myCanvas");
        w = canvas.width;
        h = canvas.height;
        ctx = canvas.getContext("2d");
        ctx.lineWidth = 1 / zoom;
    }
    p2DebugDraw.prototype.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                this.drawShape(shape, body);
                if (this.isDrawAABB)
                    this.drawAABB(body);
            }
        }
        l = this.world.constraints.length;
        var jointType, joint;
        for (var j = 0; j < l; j++) {
            joint = this.world.constraints[j];
            switch (joint.type) {
                case p2.Constraint.DISTANCE:
                    this.drawDistanceJoint(joint);
                    break;
                case p2.Constraint.REVOLUTE:
                    this.drawRevoluteJoint(joint);
                    break;
                case p2.Constraint.GEAR:
                    this.drawGearJoint(joint);
                    break;
                case p2.Constraint.PRISMATIC:
                    this.drawPrismaticJoint(joint);
                    break;
                case p2.Constraint.LOCK:
                    this.drawLockJoint(joint);
                    break;
            }
        }
        l = this.world.springs.length;
        var springType, spring;
        for (var s = 0; s < l; s++) {
            spring = this.world.springs[s];
            if (spring instanceof p2.LinearSpring) {
                this.drawLinearSpring(spring);
            }
            else if (spring instanceof p2.RotationalSpring) {
                this.drawRotationalSpring(spring);
            }
        }
    };
    p2DebugDraw.prototype.drawShape = function (shape, body, color, fillColor) {
        var color = color == undefined ? this.getColor(body) : color;
        var fillColor = fillColor == undefined ? true : fillColor;
        if (shape instanceof p2.Convex) {
            this.drawConvexShape(shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Plane) {
            //this.drawPlaneShape(<p2.Plane>shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Circle) {
            //this.drawCircleShape(<p2.Circle>shape, body, color, fillColor);
        }
        else if (shape instanceof p2.Capsule) {
            //this.drawCapsule(<p2.Capsule>shape, body,color);
        }
        else if (shape instanceof p2.Particle) {
            //this.drawParticle(<p2.Particle>shape, body,color);
        }
        else if (shape instanceof p2.Line) {
            // this.drawLine(<p2.Line>shape, body,color);
        }
        else if (shape instanceof p2.Heightfield) {
            //this.drawHeightfeild(<p2.Heightfield>shape, body,color);
        }
    };
    p2DebugDraw.prototype.drawConvexShape = function (shape, b, color, fillColor) {
        ctx.beginPath();
        var x = body.interpolatedPosition[0], y = body.interpolatedPosition[1], s = body.shapes[0];
        ctx.save();
        ctx.translate(x, y); // Translate to the center of the box
        ctx.rotate(body.interpolatedAngle); // Rotate to the box body frame
        ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
        ctx.restore();
        var indexofShape = b.shapes.indexOf(shape);
        var offset = shape.position;
        var angle = shape.angle;
        var shapeCenter = [];
        var worldPoint = this.transformVec(shape.vertices[0], offset, angle);
        b.toWorldFrame(shapeCenter, offset);
        b.toWorldFrame(worldPoint, worldPoint);
        this.drawSegment(shapeCenter, worldPoint, color);
        var worldVertices = new Array();
        var l = shape.vertices.length;
        for (var i = 0; i < l; i++) {
            worldPoint = this.transformVec(shape.vertices[i], offset, angle);
            b.toWorldFrame(worldPoint, worldPoint);
            worldVertices.push(worldPoint);
        }
        //console.log(worldVertices[0]);
        this.drawConvex(worldVertices, color, 0.5, fillColor);
    };
    return p2DebugDraw;
}());
__reflect(p2DebugDraw.prototype, "p2DebugDraw");
//# sourceMappingURL=p2DebugDraw.js.map