# Vue HTML Analog Clock

Pretty simple analog clock, for whatever purpose it might be needed.

Features:
- Supports v-model and by default updates the time every second (this can be changed from props)
- Should be themeable with CSS, with `theme` prop.
- Can be pretty much any size, though it's forced 1:1 aspect ratio
- Can be automatically adjusted to container width

## Installation and usage
Install from npm:
```
npm install vue-html-analog-clock
```

Then you can use it in your vue component like this:
```javascript
import Clock from "vue-html-analog-clock";

...

components: {
	Clock,
},
```
Template:
```html
<clock v-model="myDate" />
```

# Configure with props
Use the following props to configure the clock.

Quick reference, more detailed below:
```javascript
props: {
	theme: {
		type: String,
		default: "default"
	},
	size: {
		type: Number,
		default: defaultSize // == 320px
	},
	autoSize: {
		type: Boolean,
		default: false
	},
	value: {
		type: Date as PropType<Date>,
		default: () => new Date()
	},
	enableTimeFlow: {
		type: Boolean,
		default: true
	},
	intValTime: {
		type: Number,
		default: 100
	},
	transitionSpeed: {
		type: Number,
		default: 80
	}
},
```

## theme
- type: string
- default: "default"

This prop adds a class to the component container: `.vue-analog-clock-{theme}`

This should allow you to alter the styling of the clock in the following manner:
```html
<!-- put the theme name to the 'theme' prop -->
<clock theme="purple" />
```
```scss
// Use eg. Sass, Less to use this syntax
div.vue-analog-clock.vue-analog-clock-purple {
	div.clock-outer-ring {
		background-color: purple;
	}

	div.clock-container {
		background-color: lighten(purple, 70%);
	}

	// if you're not following the hierarchy, you might need to use !important
	div.pointer {
		background-color: darken(purple, 10%) !important;
	}
}
```

## size
- type: Number
- default: 320

Clock size in pixels. This is both the width and the height of the clock.

If `auto-size` is enabled, this prop is ignored.

## auto-size
- type: Boolean,
- default: false

if `true`, clock will automatically adjust it's size to the container element. This size is checked everytime the clock "updates", so it should keep up even if the container width changes, though it will not be smooth if transitions are used.

## value 
- type: Date
- default: new Date()

The clock will show this object's time. Part of the v-model functionality. Obviously, the component only cares about the time part of the object.

## enable-time-flow
- type: Boolean
- default: true

If true, the time will update on it's own (just like a clock). If used with v-model, that value will be changed every second.

You can also use this to enable a play/pause functionality, where changing this to false will pause the clock, and then changing it back to true will continue the clock where it left off.

## int-val-time 
- type: Number,
- default: 100

Update interval time. Defaults to 100. Basically this is how often the clock "updates" itself.

## transition-speed
- type: Number
- default: 80

Transition speed, used for the pointers. Higher values are only recommended if `enable-time-flow` is false.

# Events
Well there's not much really, only the `update` event used for the `v-model`. This event fires every update cycle (check `int-val-time`).

# Caveats
### Time might not be 100% accurate
Because the component allows any time to be set on the clock and then updated automatically, the component tries to calculate seconds. This may or may not lead to the clock not being 100% in sync. Since javascript intervals are definitely not fired accurately (it is approximate), the clock tries to calculate the time offset between intervals and this way keep the seconds going accurately.

If you just want to show the current time (user's time) and be sure it's correct 100%, you can make this basic interval yourself:
```html
<clock theme="purple" 
	:value="myDate" 
	:enable-time-flow="false" 
/>
```
```javascript
data() { return {
	myDate: new Date()
}},

beforeMount() {
	window.setInterval(() => {
		this.myDate = new Date();
	}, 100);
}
```

### Transition not working when going from 59->0
This constraint is due to the rotation of the pointer. After full 360 it changes back to 0, and if transition is enabled when this occurs, the pointer will go counter-clockwise to the 0deg rotation. Current workaround is to disable the transition when it's going to happen.