import { mount } from "@vue/test-utils";
import VueAnalogClock from "@/components/VueAnalogClock.vue";

describe('Mounted App', () => {	
	it('Mounts succesfully', () => {
		const wrapper = mount(VueAnalogClock);
		expect(wrapper.vm).toBeTruthy()
	});

	it('Sets time correctly', async () => {
		const givenDate = new Date(2020, 1, 1, 15, 30, 45);
		const wrapper = mount(VueAnalogClock, {
			propsData: {
				value: new Date(givenDate)
			}
		});

		wrapper.vm.$data.date.setMilliseconds(0);
		const givenDateStr = givenDate.toISOString();
		const compDataStr = wrapper.vm.$data.date.toISOString();

		expect(givenDateStr).toEqual(compDataStr);
	});

	it('Auto updates time', async() => {
		const wrapper = mount(VueAnalogClock);
		const timeNow = new Date(wrapper.vm.$data.date);
		await new Promise((r) => setTimeout(r, 1000));
		const timeLater = new Date(wrapper.vm.$data.date);

		// Calculate millisecond difference. Should be ~1000
		const timeDiff = (timeLater.valueOf() - timeNow.valueOf());
		expect(timeDiff).toBeGreaterThan(850);
		expect(timeDiff).toBeLessThan(1150);	
	});

	it('Pauses time and then continues it', async() => {
		const givenDate = new Date(2020, 1, 1, 15, 30, 45);
		const wrapper = mount(VueAnalogClock, {
			propsData: {
				value: new Date(givenDate),
				enableTimeFlow: true,
				intValTime: 5
			}
		});

		await new Promise((r) => setTimeout(r, 50));
		wrapper.setProps({ enableTimeFlow: false });
		const time1 = new Date(wrapper.vm.$data.date);
		await new Promise((r) => setTimeout(r, 50));
		const time2 = new Date(wrapper.vm.$data.date);
		
		expect(time1.valueOf() - givenDate.valueOf()).toBeGreaterThan(40);
		expect(time2.valueOf()).toBe(time1.valueOf());
	});

	///
	/// This test seems pretty hard to do because offetWidth returns 0 
	/// I guess this is due to the DOM being fake.
	/// ---
	// it('Automatically resizes itself to container', async() => {
	// 	const div = document.createElement('div')
	// 	div.style.width = "500px";
	// 	div.style.height = "500px;"
   //  	document.body.appendChild(div);
		
	// 	const wrapper = mount(VueAnalogClock, {
	// 		propsData: {
	// 			autoSize: true,
	// 			intValTime: 10
	// 		},
	// 		attachTo: div
	// 	});

	// 	await new Promise((r) => setTimeout(r, 20));
	// 	div.style.width = "200px";

	// 	const compEl = wrapper.vm.$el as HTMLDivElement;
	// 	await new Promise((r) => setTimeout(r, 20));

	// 	expect(compEl.offsetWidth).toBe(200);
	// });
});