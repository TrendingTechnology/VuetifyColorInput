
export default {
	name: 'VColorInput',
	inheritAttrs: false,
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
		dark: Boolean,
		disabled: Boolean,
		error: Boolean,
		errorCount: {},
		errorMessages: {},
		hideDetails: [Boolean, String],
		hint: {},
		id: {},
		label: String,
		light: Boolean,
		loading: Boolean,
		messages: {},
		noAlpha: Boolean,
		persistentHint: Boolean,
		prependIcon: {},
		readonly: Boolean,
		rules: {},
		saveText: {
			type: String,
			default: 'Save',
		},
		success: Boolean,
		successMessages: {},
		validateOnBlur: Boolean,
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
						readonly: this.readonly,
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
															background: this.valueAsString,
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
								)
							),
						},
					},
				)],
			)],
		);
	},
};
