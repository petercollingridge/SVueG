Vue.component('control-point', {
    props: ['position', 'draggable'],
    template: '<circle :cx="position.x" :cy="position.y" v-on:mousedown="select" :r="radius" v-bind:class="{ draggable: draggable }"></circle>',
    methods: {
        select: function(evt) {
            if (this.draggable) {
                this.$parent.selected = this;
                this.startX = this.position.x - evt.clientX;
                this.startY = this.position.y - evt.clientY;
            }
        },
        drag: function(dx, dy) {
            this.position.x = this.startX + dx;
            this.position.y = this.startY + dy;
        }
    },
    computed: {
        radius: function() {
            return this.draggable ? 6 : 3;
        }
    }
});

Vue.component('svg-line', {
    props: ['p1', 'p2', 'draggable'],
    template: '<line :x1="p1.x" :y1="p1.y" :x2="p2.x" :y2="p2.y" v-on:mousedown="select" v-bind:class="{ draggable: draggable }"></line>',
    methods: {
        select: function(evt) {
            if (this.draggable) {
                this.$parent.selected = this;
                this.startX1 = this.p1.x - evt.clientX;
                this.startY1 = this.p1.y - evt.clientY;
                this.startX2 = this.p2.x - evt.clientX;
                this.startY2 = this.p2.y - evt.clientY;
            }
        },
        drag: function(dx, dy) {
            this.p1.x = this.startX1 + dx;
            this.p1.y = this.startY1 + dy;
            this.p2.x = this.startX2 + dx;
            this.p2.y = this.startY2 + dy;
        }
    },
});


function svueg(selector) {
    var data = {
        points: [],
        lines: [],
        selected: false,
    };

    var vueObject = new Vue({
        el: selector,
        data: data,
        methods: {
            drag: function(evt) {
                if (this.selected) {
                    this.selected.drag(evt.clientX, evt.clientY);
                }
            },
            deselect: function() {
                this.selected = false;
            }
        }
    });

    return {
        vueObject: vueObject,

        addPoint: function(attributes) {
            if (arguments.length > 1) {
                attributes = { x: arguments[0], y: arguments[1] };
            }

            if (attributes.draggable !== false) {
                attributes.draggable = true;
            }

            data.points.push(attributes);
            return attributes;
        },

        addStaticPoint: function(attributes) {
            if (arguments.length > 1) {
                attributes = { x: arguments[0], y: arguments[1] };
            }

            attributes.draggable = false;
            data.points.push(attributes);
            return attributes;
        },

        addLine: function(p1, p2) {
            data.lines.push({ p1: p1, p2: p2 });
        },

        addDraggableLine: function(p1, p2) {
            data.lines.push({ p1: p1, p2: p2, draggable: true });
        },
    };
}


