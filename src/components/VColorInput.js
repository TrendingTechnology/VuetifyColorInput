
export default {
	name: 'VColorInput',
	inheritAttrs: false,
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		appendIcon: String,
		cancelText: {
			type: String,
			default: 'Cancel',
		},
		clearable: Boolean,
		clearIcon: {
			type: String,
			default: '$clear',
		},
		color: String,
		disabled: Boolean,
		error: Boolean,
		errorCount: {},
		errorMessages: {},
		hideDetails: [Boolean, String],
		hint: {},
		id: {},
		label: String,
		loading: Boolean,
		messages: {},
		modelValue: {},
		noAlpha: Boolean,
		persistentHint: Boolean,
		prependIcon: {},
		rules: {},
		saveText: {
			type: String,
			default: 'Save',
		},
		success: Boolean,
		successMessages: {},
		validateOnBlur: Boolean,
	},
	data () {
		return {
			menuActive: false,
			lazyValue: this.modelValue,
		};
	},
	computed: {
		hasLabel() {
			return !!(this.label);
		},
		hasValue() {
			return !!(this.value);
		},
		value() {
			return this.valueMix.value;
		},
		valueForColorPicker() {
			return this.valueMix.valueForColorPicker;
		},
		valueMix() {
			// todo
			let value = this.lazyValue;
			let noAlpha = this.noAlpha;
			let r, g, b, a;
			if (value) {
				let instance = this.parseColor(value);
				({r, g, b, a} = instance.rgba);
				if (noAlpha) {
					a = 1;
				}
				value = (a < 1
					? `rgba(${r}, ${g}, ${b}, ${a})`
					: instance.hex
				);
			} else {
				value = null;
				r = g = b = 0;
				a = 1;
			}
			let valueForColorPicker = (noAlpha
				? {r, g, b}
				: {r, g, b, a}
			);
			return {
				value,
				valueForColorPicker,
			};
		},
	},
	watch: {
		modelValue(value) {
			this.lazyValue = value;
		},
	},
	beforeCreate() {
		// todo
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
			this.$emit('update:modelValue', this.value);
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
			[h(
				'VInput',
				{
					props: {
						appendIcon: this.appendIcon,
						color: this.color,
						disabled: this.disabled,
						error: this.error,
						errorCount: this.errorCount,
						errorMessages: this.errorMessages,
						hideDetails: this.hideDetails,
						hint: this.hint,
						id: this.id,
						loading: this.loading,
						messages: this.messages,
						persistentHint: this.persistentHint,
						prependIcon: this.prependIcon,
						rules: this.rules,
						success: this.success,
						successMessages: this.successMessages,
						validateOnBlur: this.validateOnBlur,
					},
					on: {
						...((object, keys) => {
							return keys.reduce((result, key) => {
								let value = object[key];
								if (value !== undefined) {
									result[key] = value;
								}
								return result;
							}, {});
						})(this.$listeners, [
							'click:append',
							'click:prepend',
							'update:error',
						]),
					},
					scopedSlots: {
						...((object, keys) => {
							return keys.reduce((result, key) => {
								let value = object[key];
								if (value !== undefined) {
									result[key] = value;
								}
								return result;
							}, {});
						})(this.$scopedSlots, [
							'append',
							'message',
							'prepend',
						]),
					},
				},
				[h(
					'VMenu',
					{
						ref: 'menu',
						props: {
							closeOnContentClick: false,
							disabled: this.disabled,
							offsetY: true,
							returnValue: this.valueForColorPicker,
							value: this.menuActive,
						},
						on: {
							'input': (value => {
								this.menuActive = value;
							}),
							'update:return-value': this.updateValue,
						},
						scopedSlots: {
							'activator': (({
								attrs,
								on,
							}) =>
								h(
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
															background: this.value,
															height: '100%',
															width: '100%',
														},
													},
												)]
												: []
											),
										),
										...(this.$scopedSlots.label
											? this.$scopedSlots.label()
											: (this.hasLabel
												? [h(
													'div',
													{
														class: 'text--secondary',
													},
													this.label,
												)]
												: []
											)
										),
									],
								)
							),
							default: (() =>
								h(
									'VCard',
									[
										h(
											'VColorPicker',
											{
												props: {
													disabled: this.disabled,
													flat: true,
													hideInputs: true,
													value: this.valueForColorPicker,
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
																this.$refs.menu.save(this.valueForColorPicker);
															}),
														},
													},
													this.saveText,
												),
											],
										),
									],
								)
							),
						},
					},
				)],
			)],
		);
	},
};
