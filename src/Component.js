export default {
	name: 'VColorInput',
	inheritAttrs: false,
	props: {
		cancelText: {
			type: String,
			default: 'Cancel',
		},
		clearable: Boolean,
		clearIcon: {
			type: String,
			default: '$clear',
		},
		label: String,
		noAlpha: Boolean,
		saveText: {
			type: String,
			default: 'Save',
		},
		value: {},
	},
	data () {
		return {
			menuActive: false,
			lazyValue: this.value,
		};
	},
	computed: {
		hasLabel() {
			return !!(this.label);
		},
		hasValue() {
			return !!(this.valueAsInstance);
		},
		valueAsInstance() {
			let value = this.lazyValue;
			if (value) {
				let instance = this.parseColor(value);
				let {r, g, b, a} = instance.rgba;
				let object;
				let string;
				if (this.noAlpha) {
					object = {r, g, b};
					string = instance.hex;
				} else {
					object = {r, g, b, a};
					if (a < 1) {
						string = `rgba(${r}, ${g}, ${b}, ${a})`;
					} else {
						string = instance.hex;
					}
				}
				return {
					toObject() {
						return object;
					},
					toString() {
						return string;
					},
				};
			}
			return null;
		},
		valueAsObject() {
			let value = this.valueAsInstance;
			if (value) {
				return value.toObject();
			}
			return {r: 0, g: 0, b: 0, a: 0};
		},
		valueAsString() {
			let value = this.valueAsInstance;
			if (value) {
				return value.toString();
			}
			return null;
		},
	},
	watch: {
		value(value) {
			this.lazyValue = value;
		},
	},
	beforeCreate() {
		let [{handler}] = this.$createElement('VColorPicker').componentOptions.Ctor.options.watch.value;
		this.parseColor = function(value) {
			let result;
			handler.call({
				updateColor(value) {
					result = value;
				},
			}, value);
			return result;
		};
	},
	methods: {
		updateValue(value) {
			this.lazyValue = value;
			this.$emit('update:value', this.valueAsString);
		},
	},
	render(h) {
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
							offsetY: true,
							returnValue: this.valueAsObject,
							value: this.menuActive,
						},
						on: {
							'input': (value => {
								this.menuActive = value;
							}),
							'update:return-value': this.updateValue,
						},
						scopedSlots: {
							activator: ({
								attrs,
								on,
							}) => {
								return h(
									'div',
									{
										attrs,
										style: {
											alignItems: 'center',
											display: 'grid',
											gap: '8px',
											gridTemplateColumns: 'auto 1fr',
											userSelect: 'none',
										},
										on,
									},
									[
										h(
											'div',
											{
												style: {
													background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat',
													borderRadius: '50%',
													height: '24px',
													overflow: 'hidden',
													width: '24px',
												},
											},
											(this.hasValue
												? [h(
													'div',
													{
														style: {
															background: this.valueAsString,
															height: '100%',
															width: '100%',
														},
													},
												)]
												: []
											),
										),
										...(this.hasLabel
											? [h(
												'div',
												{
													class: 'text--secondary',
												},
												this.label,
											)]
											: []
										),
									],
								);
							},
							default: (() => {
								return h(
									'VCard',
									[
										h(
											'VColorPicker',
											{
												props: {
													flat: true,
													hideInputs: true,
													value: this.valueAsObject,
												},
												on: {
													input: this.updateValue,
												},
											},
										),
										h(
											'VCardActions',
											[
												...(this.clearable
													? [h(
														'VBtn',
														{
															props: {
																icon: true,
															},
															on: {
																click: (() => {
																	this.$refs.menu.save(null);
																}),
															},
														},
														[h(
															'VIcon',
															this.clearIcon,
														)],
													)]
													: []
												),
												h('VSpacer'),
												h(
													'VBtn',
													{
														props: {
															text: true,
														},
														on: {
															click: (() => {
																this.menu = false;
															}),
														},
													},
													this.cancelText,
												),
												h(
													'VBtn',
													{
														props: {
															color: 'primary',
															text: true,
														},
														on: {
															click: (() => {
																this.$refs.menu.save(this.valueAsObject);
															}),
														},
													},
													this.saveText,
												),
											],
										),
									],
								);
							}),
						},
					},
				),
			],
		);
	},
};
