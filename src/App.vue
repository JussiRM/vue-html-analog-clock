<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		
		<div>
			<button type="button" @click.prevent="size = 160">Pieni</button>
			<button type="button" @click.prevent="size = 320">Normaali</button>
			<button type="button" @click.prevent="size = 640">Suuri</button>
			<button type="button" @click.prevent="size = 1200">JÄTTI</button>
		</div>

		<div style="margin-top: 10px;">
			<button type="button" @click.prevent="enableTimeFlow = !enableTimeFlow">
				Play/Pause
			</button>
		</div>

		<div style="margin-top: 10px;">
			<input type="text" placeholder="HH:MM:SS" v-model="setDateInput">
			<button type="button" @click.prevent="setDateFromInput">Set Time</button>
		</div>

		<div style="margin: 40px auto; width: 500px;">
			<clock :size="size" 
				:auto-size="true"
				v-model="myDate"
				:enable-time-flow="enableTimeFlow"
				:transition-speed="80"
			/>
			<p>myDate.....: {{myDate.toISOString().split("T")[1]}}</p>
			<p>Actual date: {{actualDate.toISOString().split("T")[1]}}</p>
		</div>
		<div>&nbsp;</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Clock from "./components/VueAnalogClock.vue";

export default Vue.extend({
	name: "App",
	components: {
		HelloWorld,
		Clock,
	},
	data() { return {
		size: 320,
		animate: false,
		actualDate: new Date(), // debug
		myDate: new Date(), //new Date(2021, 1, 1, 15, 0, 0)
		enableTimeFlow: true,
		setDateInput: ""
	}},

	mounted() {
		let d = new Date(this.myDate);
		d.setMilliseconds(0);
		this.actualDate = new Date(d);
		window.setInterval(() => {
			this.actualDate = new Date();
		}, 100);
	},

	methods: {
		setDateFromInput() {
			const val = this.setDateInput;
			this.setDateInput = "";

			if (/\d+\:\d+\:\d+/.test(val)) {
				let splitValStr = val.split(":");
				let splitVal = splitValStr.map(x => parseInt(x));
				let newDate = new Date(this.myDate);
				newDate.setHours(splitVal[0]);
				newDate.setMinutes(splitVal[1]);
				newDate.setSeconds(splitVal[2]);

				this.myDate = new Date(newDate);
			}
			else {
				alert("Regex fail");
			}
		}
	}
});
</script>

<style lang="scss">
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}
#app {
	text-align: center;
	width: 100%;
	max-width: 1280px;
	margin: 50px auto;
	font-family: Consolas;
}
</style>
