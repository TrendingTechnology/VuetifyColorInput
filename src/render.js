import chroma from 'chroma-js';

export default {
	name: 'VColorInput',
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		cancelText: {
			type: String,
			default: 'Cancel',
		},
		clearable: {
			type: Boolean,
			default: false,
		},
		label: String,
		modelValue: {},
		noAlpha: {
			type: Boolean,
			default: false,
		},
		saveText: {
			type: String,
			default: 'Save',
		},
	},
	data() {
		return {
			menu: false,
		};
	},
	computed: {
		color() {
			let {value} = this;
			return chroma(value).css();
		},
		value: {
			get() {
				let {
					value,
					noAlpha,
				} = this;
				let {r, g, b, a} = toObjectColor(value);
				a = (a > 0) ? a : Number.EPSILON; // vuetify bug
				return noAlpha ? {r, g, b} : {r, g, b, a};
			},
			set(value) {
				if (value) {
					let [r, g, b, a] = chroma(value).rgba();
					a = (a > Number.EPSILON) ? a : 0; // vuetify bug
					this.$emit('update:modelValue', chroma({r, g, b, a}).css());
				} else {
					this.$emit('update:modelValue', this.resetValue);
				}
			},
		},
	},
	render(h) {
		let self = this;
		return h(
			'div',
			{
				style: {
					display: 'flex',
				},
			},
			[
				h(
					'VMenu',
					{
						ref: 'menu',
						props: {
							closeOnContentClick: false,
							returnValue: this.value,
							offsetY: true,
							transition: 'scale-transition',
						},
						on: {
							'update:returnValue': function($event) {
								self.value = $event
							},
							'update:return-value': function($event) {
								self.value = $event
							}
						},
						scopedSlots: {
							activator({
								attrs,
								on,
							}) {
								return h(
									'div',
									self._g(
										self._b(
											{
												staticStyle: {
													'align-items': 'center',
													display: 'flex'
												}
											},
											'div',
											attrs,
											false
										),
										on
									),
									[
										h(
											'div',
											{
												class: 'mr-2',
												style: {
													background:
														'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat',
													'border-radius': '50%',
													height: '24px',
													overflow: 'hidden',
													width: '24px'
												}
											},
											[
												h('div', {
													staticStyle: { height: '100%', width: '100%' },
													style: { background: self.color }
												})
											]
										),
										self.label
											? h('div', { staticClass: 'text--secondary' }, [
													self._v(self._s(self.label))
												])
											: self._e()
									]
								);
							},
						},
						self._u([
							{
								key: 'activator',
								fn: function(ref) {
									var attrs = ref.attrs
									var on = ref.on

								}
							}
						]),
						model: {
							value: self.menu,
							callback(value) {
								self.menu = value;
							},
							expression: 'menu'
						},
					},
					[
						h(
							'v-card',
							[
								h(
									'v-color-picker',
									{
										props: {
											flat: true,
											hideInputs: true,
										},
										model: {
											value: self.value,
											callback(value) {
												self.value = value;
											},
											expression: 'value',
										},
									},
								),
								h(
									'v-card-actions',
									[
										...(self.clearable
											? [h(
												'v-btn',
												{
													props: {
														icon: true,
													},
													on: {
														click() {
															self.$refs.menu.save(null);
														},
													},
												},
												[h('v-icon', self.clearIcon)],
											)]
											: []
										),
										h('v-spacer'),
										h(
											'v-btn',
											{
												props: {
													text: true,
												},
												on: {
													click() {
														self.menu = false;
													},
												},
											},
											self.cancelText,
										),
										h(
											'v-btn',
											{
												props: {
													color: 'primary',
													text: true,
												},
												on: {
													click() {
														return self.$refs.menu.save(self.value);
													},
												},
											},
											self.saveText,
										),
									],
								),
							],
						),
					],
				),
			],
		);
	},
};
