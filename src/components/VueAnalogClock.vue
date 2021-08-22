<template>
	<div class="vue-analog-clock" :class="themeClass" :style="{ width: mySize + 'px', height: mySize + 'px' }">
		<div class="clock-outer-ring">
			<div class="clock-container">
				<div class="center-dot pos-clock-center"></div>
				<div class="pointer hour-pointer" :style="hourPointerStyle"></div>
				<div class="pointer minute-pointer" :style="minutePointerStyle"></div>
				<div class="pointer second-pointer" :style="secondPointerStyle"></div>

				<div class="numbers">
					<div class="number" :class="'number-' + index" v-for="(n, index) in clockFaces" :key="n">
						<span :style="numberSpanStyle">{{ n }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

const defaultSize = () => 320;

export default Vue.extend({
	name: "vue-analog-clock",

	props: {
		theme: {
			type: String,
			default: "default"
		},
		size: {
			type: Number,
			default: defaultSize
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

	watch: {
		size() {
			this.mySize = this.size;
		},
		value() {
			this.date = new Date(this.value);
		},
		enableTimeFlow() {
			if (this.enableTimeFlow) {
				this.startInterval();
			}
			else {
				if (this.intVal != null) {
					window.clearInterval(this.intVal);
				}
			}
		}
	},

	data() { return {
		date: new Date(),
		dateTemp: new Date(),

		sDate: new Date(),
		eDate: new Date(),
		refreshFirstLoop: true,
		
		intVal: null as null|number,
		mySize: this.size
	}},

	beforeMount() {
		this.dateTemp = new Date(this.value);
		let value = new Date(this.value);
		value.setMilliseconds(0);
		this.date = new Date(value);

		if (this.enableTimeFlow) {
			this.startInterval();
		}
	},

	computed: {
		themeClass() : string {
			return "vue-analog-clock-" + this.theme;
		},

		hourAngle() : number {
			const hour = this.date.getHours();
			const hour12 = (hour > 11) ? (hour-12) : hour;

			const minutes = this.date.getMinutes();

			const minDecimal = (minutes/60);
			const hourWithMins = hour12 + minDecimal;
			const hourAsPercentage = (hourWithMins / 12);

			// 90 is the base angle (clock 15), 359 is max angle.
			const hourAngle = (359 * hourAsPercentage) - 90;

			return hourAngle;
		},

		minuteAngle() : number {
			const minutes = this.date.getMinutes();
			const seconds = this.date.getSeconds();
			const minuteAsPercentage = ((minutes + (seconds / 60)) / 60);

			const minuteAngle = (359 * minuteAsPercentage) - 90;

			return minuteAngle;
		},

		secondAngle() : number {
			const seconds = this.date.getSeconds();
			return (359 * (seconds/60)) - 90;
		},

		hourPointerStyle() : any {
			return this.calculatePointerStyle(this.hourAngle);
		},

		minutePointerStyle() : any {
			return this.calculatePointerStyle(this.minuteAngle);
		},

		secondPointerStyle() : any {
			return this.calculatePointerStyle(this.secondAngle);
		},

		clockFaces() : Array<number> {
			let arr = [12];
			for(let i = 1; i < 12; i++) {
				arr.push(i);
			}
			return arr;
		},

		numberSpanStyle() : any {
			let scaleBase = defaultSize();
			let scale = (this.mySize / scaleBase);

			let fontSize = 100 * scale;
			let padding = Math.round(8 * scale);

			return {
				"font-size": `${fontSize}%`,
				"padding": `${padding}px`
			};
		}
	},

	methods: {
		startInterval() {
			if (this.intVal != null) {
				window.clearInterval(this.intVal);
			}
			
			this.refreshFirstLoop = true;
			this.refresh();
			this.intVal = window.setInterval(() => {
				this.refresh();
			}, this.intValTime);
		},

		refresh() {
			this.sDate = new Date();

			if (this.refreshFirstLoop) {
				this.eDate = new Date(this.sDate);
				this.eDate.setMilliseconds(this.eDate.getMilliseconds() - this.intValTime);
				this.refreshFirstLoop = false;
			}

			var valueDiffFromLastInterval = this.sDate.valueOf() - this.eDate.valueOf();
			this.eDate = new Date();

			var newDate = new Date(this.date);
			newDate.setMilliseconds(newDate.getMilliseconds() + valueDiffFromLastInterval);
			this.date = new Date(newDate);

			this.$emit('input', this.date);	
			
			// Calculate clock size if auto-size is enabled
			if (this.autoSize) {
				const myEl = this.$el;
				const myParent = myEl.parentElement;

				if (!myParent) {
					throw "Clock must have a parent element when using auto-size";
				}

				const parentWidth = myParent.offsetWidth;

				this.mySize = parentWidth;
			}
		},

		calculatePointerStyle(angle : number) : any {
			let obj = {} as any;
			obj["transform"] = "rotate(" + angle.toFixed(2) + "deg)";

			// The pointer will animate counter-clockwise to 12 after full cycle
			// Prevent this by removing transition when pointer is around 12...
			if (angle < 265 && angle > -89) {
				obj["transition"] = `transform ${this.transitionSpeed}ms ease-in-out`;
			}
			return obj;
		}
	}
})
</script>

<style lang="scss">
	@use "sass:math";

	div.vue-analog-clock {
		font-size: 1.25rem;
		display: inline-block;

		div.clock-outer-ring {
			position: relative;
			width: 100%;
			height: 100%;
			border: 1px solid black;
			border-radius: 50%;
			box-shadow: 0px 0px 3px 3px rgba(0,0,0, 0.33);
			background-color: #117b49;
		}

		div.clock-container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 90%;
			height: 90%;
			border: 2px solid lighten(black, 10%);
			border-radius: 50%;
			background-color: lighten(beige, 7%);
			box-shadow: inset 0px 0px 8px 10px rgba(0,0,0, 0.15);

			div.pos-clock-center {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			div.center-dot {
				width: 7%;
				height: 7%;
				background-color: lighten(black, 20%);
				border-radius: 50%;
				z-index: 11;
			}

			div.pointer {
				position: absolute;
				left: 50%;
				background-color: lighten(black, 20%);
				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
				transform-origin: left;
			}

			@function pointerHeight($h) {
				@return (50% - math.div($h, 2));
			}

			div.hour-pointer {
				$height: 5%;
				top: pointerHeight($height);
				width: 32%;
				height: $height;
				z-index: 10;
			}

			div.minute-pointer {
				$height: 3%;
				top: pointerHeight($height);
				width: 40%;
				height: $height;
				z-index: 9;
			}

			div.second-pointer {
				$height: 2%;
				top: pointerHeight($height);
				width: 45%;
				height: $height;
				z-index: 8;

				border-top-right-radius: 500%;
				border-bottom-right-radius: 500%;
			}

			div.number {
				font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-weight: bold;
				position: absolute;
				text-align: left;
				user-select: none;

				@for $i from 0 through 11 {
					&.number-#{$i} {				
						$deg: (90.0 + (360 * math.div($i, 12)));

						width: 100%;
						top: 49%;
						left: 50%;
						transform: translate(-50%, -50%) rotate($deg + deg);

						span {
							display: inline-block;
							transform: rotate((-1*$deg) + deg);
						}
					}
				}
			}
		}
	}
</style>
