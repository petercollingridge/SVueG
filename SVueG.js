Vue.component('control-point', {
    props: ['position', 'draggable'],
    template: '<circle :cx="position.x" :cy="position.y" v-on:mousedown="select" :r="radius" v-bind:class="{ draggable: draggable }"></circle>',
    methods: {
        select: function(evt) {
            if (this.draggable) {
                this.$parent.selected = this;
                this.$parent.startX = this.position.x - evt.clientX;
                this.$parent.startY = this.position.y - evt.clientY;
            }
        }
    },
    computed: {
        radius: function() {
            return this.draggable ? 6 : 3;
        }
    }
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
                    this.selected.position.x = evt.clientX + this.startX;
                    this.selected.position.y = evt.clientY + this.startY;
                    
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
        }
    };
}


