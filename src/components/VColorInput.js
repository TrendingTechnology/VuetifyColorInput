
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
		disabled: Boolean,
		error: Boolean,
		errorCount: {},
		errorMessages: {},
		hideDetails: [Boolean, String],
		hint: {},
		id: {},
		label: String,
		messages: {},
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
		hasInternalValue() {
			return !!(this.internalValue);
		},
		hasValidationState() {
			return !!(this.validationState);
		},
		internalValue() {
			return this.internalValueMix.internalValue;
		},
		internalValueForColorPicker() {
			return this.internalValueMix.internalValueForColorPicker;
		},
		internalValueMix() {
			// todo
			let internalValue = this.lazyValue;
			let noAlpha = this.noAlpha;
			let r, g, b, a;
			if (internalValue) {
				let instance = this.parseColor(internalValue);
				({r, g, b, a} = instance.rgba);
				if (noAlpha) {
					a = 1;
				}
				internalValue = (a < 1
					? `rgba(${r}, ${g}, ${b}, ${a})`
					: instance.hex
				);
			} else {
				internalValue = null;
				r = g = b = 0;
				a = 1;
			}
			let internalValueForColorPicker = (noAlpha
				? {r, g, b}
				: {r, g, b, a}
			);
			return {
				internalValue,
				internalValueForColorPicker,
			};
		},
		validationState() {
			if (!this.disabled) {
				if (this.error) {
					return 'error';
				}
				if (this.success) {
					return 'success';
				}
			}
		},
	},
	watch: {
		value(value) {
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
		updateInternalValue(value) {
			this.lazyValue = value;
			this.$emit('input', this.value);
		},
	},
	render(h) {
		return h(
			'VInput',
			{
				props: {
					appendIcon: this.appendIcon,
					disabled: this.disabled,
					error: this.error,
					errorCount: this.errorCount,
					errorMessages: this.errorMessages,
					hideDetails: this.hideDetails,
					hint: this.hint,
					id: this.id,
					messages: this.messages,
					persistentHint: this.persistentHint,
					prependIcon: this.prependIcon,
					rules: this.rules,
					success: this.success,
					successMessages: this.successMessages,
					validateOnBlur: this.validateOnBlur,
					value: this.internalValue,
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
						returnValue: this.internalValueForColorPicker,
						value: this.menuActive,
					},
					on: {
						'input': (value => {
							this.menuActive = value;
						}),
						'update:return-value': this.updateInternalValue,
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
										(this.hasInternalValue
											? [h(
												'div',
												{
													style: {
														background: this.internalValue,
														height: '100%',
														width: '100%',
													},
												},
											)]
											: []
										),
									),
									...(this.$scopedSlots.label
										? [h(
											'VLabel',
											{
												props: {
													color: this.validationState,
													disabled: this.disabled,
													focused: this.hasValidationState,
													//for: this.id,
												},
											},
											this.$scopedSlots.label(),
										)]
										: (this.hasLabel
											? [h(
												'VLabel',
												{
													props: {
														color: this.validationState,
														disabled: this.disabled,
														focused: this.hasValidationState,
														//for: this.id,
													},
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
												value: this.internalValueForColorPicker,
											},
											on: {
												input: this.updateInternalValue,
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
															this.$refs.menu.save(this.internalValueForColorPicker);
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
		);
	},
};
