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
			lazyValue: this.value,
		};
	},
	computed: {
		internalValue: {
			get() {
				return this.lazyValue;
			},
			set(value) {
				this.lazyValue = value;
				this.$emit('input', value);
			},

			get() {
				let {r, g, b, a} = toObjectColor(this.lazyValue);
				a = (a > 0) ? a : Number.EPSILON; // vuetify bug
				return this.noAlpha ? {r, g, b} : {r, g, b, a};
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
	watch: {
		value(value) {
			this.lazyValue = value;
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
							returnValue: this.internalValue,
							transition: 'scale-transition',
							value: this.menu,
						},
						on: {
							'input': (value => {
								this.menu = value;
							}),
							'update:returnValue': (value => {
								this.internalValue = value;
							}),
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
											[h(
												'div',
												{
													style: {
														background: this.internalValue,
														height: '100%',
														width: '100%',
													},
												},
											)],
										),
										...(this.label
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
													value: this.internalValue,
												},
												on: {
													input: (value => {
														this.internalValue = value;
													}),
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
																this.$refs.menu.save(this.internalValue);
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
