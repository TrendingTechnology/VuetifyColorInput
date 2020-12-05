export default {
	name: 'VColorInput',
	inheritAttrs: false,
	props: {
		appendIcon: String,
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
		success: Boolean,
		successMessages: {},
		validateOnBlur: Boolean,
		value: {},
	},
	data () {
		return {
			lazyValue: this.value,
			menuActive: false,
			validationState: undefined,
		};
	},
	computed: {
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
	mounted() {
		let el = this.$refs['input'];
		this.$watch(
			() => el.validationState,
			value => {
				this.validationState = value;
			},
			{immediate: true},
		);
	},
	methods: {
		updateValue(value) {
			this.lazyValue = value;
			this.$emit('input', this.value);
		},
	},
	render(h) {
		let {
			$emit,
			$scopedSlots,
			appendIcon,
			disabled,
			error,
			errorCount,
			errorMessages,
			hideDetails,
			hint,
			id,
			internalValue: value,
			menuActive,
			messages,
			persistentHint,
			prependIcon,
			rules,
			success,
			successMessages,
			validateOnBlur,
		} = this;
		return h(
			'VInput',
			{
				props: {
					appendIcon,
					disabled,
					error,
					errorCount,
					errorMessages,
					hideDetails,
					hint,
					id,
					messages,
					persistentHint,
					prependIcon,
					rules,
					success,
					successMessages,
					validateOnBlur,
					value,
				},
				on: {
					...(keys => {
						let result = {};
						keys.forEach(key => {
							result[key] = ((...args) => {
								$emit(key, ...args);
							});
						});
						return result;
					})([
						'click:append',
						'click:prepend',
						'update:error',
					]),
				},
				scopedSlots: {
					...((object, keys) => {
						let result = {};
						keys.forEach(key => {
							let value = object[key];
							if (value !== undefined) {
								result[key] = value;
							}
						});
						return result;
					})($scopedSlots, [
						'append',
						'message',
						'prepend',
					]),
				},
				ref: 'input',
			},
			[h(
				'VMenu',
				{
					ref: 'menu',
					props: {
						closeOnContentClick: false,
						disabled,
						offsetY: true,
						value: menuActive,
					},
					on: {
						'input': (value => {
							this.menuActive = value;
						}),
					},
					scopedSlots: {
						'activator': (({
							attrs,
							on,
						}) => {
							return h(
								'div',
								{
									attrs,
									on,
								},
								[h(
									'div',
									{
										style: {
											alignItems: 'center',
											display: 'grid',
											gap: '8px',
											gridTemplateColumns: 'auto 1fr',
											pointerEvents: 'none',
											userSelect: 'none',
										},
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
											(() => {
												let {internalValue: value} = this;
												if (value)
											})(),
											(this.internalValue
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
										...(() => {
											let {$scopedSlots} = this;
											let $slot = $scopedSlots['label'];
											if (!$slot) {
												let {label} = this;
												vChildren = this.$scopedSlots['label']();
											} else
											if (this.label) {
												vChildren = this.label;
											} else {
												return [];
											}
											let {
												disabled,
												validationState,
											} = this;
											return [h(
												'div',
												[h(
													'VLabel',
													{
														props: {
															color: validationState,
															disabled: disabled,
															focused: !!validationState,
														},
													},
													$slot,
												)],
											)];
										})(),
									],
								)],
							);
						}),
						default: (() => {
							return h(
								'VCard',
								[
									h(
										'VColorPicker',
										{
											props: {
												disabled,
												flat: true,
												hideInputs: true,
												value: this.internalValueForColorPicker,
											},
											on: {
												input: (value => {
													this.internalValue = value;
												}),
											},
										},
									),
									/*h(
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
																this.$refs['menu'].save(null);
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
															this.$refs['menu'].save(this.internalValueForColorPicker);
														}),
													},
												},
												this.saveText,
											),
										],
									),*/
								],
							);
						}),
					},
				},
			)],
		);
	},
};
