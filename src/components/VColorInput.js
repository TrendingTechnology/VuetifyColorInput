export default {
	name: 'VColorInput',
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
		let {value} = this;
		return {
			fallbackValue: '#000',
			format: 'string',
			lazyValue: value,
			mandatory: false,
			menuActive: false,
			validationState: undefined,
		};
	},
	computed: {
		internalValue: {
			get() {
				return this.getValue(this.format, this.mandatory);
			},
			set(value) {
				this.lazyValue = value;
			},
		},
		valueAsString() {
			return this.getValue('string', true);
		},
		valueAsObject() {
			return this.getValue('object.rgb', true);
		},
	},
	watch: {
		internalValue(value) {
			// todo
		},
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
		let {$refs} = this;
		let el = $refs['input'];
		this.$watch(
			() => el.validationState,
			value => {
				this.validationState = value;
			},
			{immediate: true},
		);
	},
	methods: {
		getValue(format, mandatory) {
			// todo
			let {lazyValue: value} = this;;
			if (!value) {
				if (!mandatory) {
					return null;
				}
				({fallbackValue: value} = this);
			}
			let {noAlpha} = this;
			let instance = this.parseColor(value);
			let {r, g, b, a} = instance.rgba;
			switch (format) {
				case 'object.rgb': {
					return (noAlpha
						? {r, g, b}
						: {r, g, b, a}
					);
				}
			}
			return (noAlpha || a === 1
				? instance.hex
				: `rgba(${r}, ${g}, ${b}, ${a})`
			);
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
			valueAsObject,
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
										/*...(() => {
											if (disabled) {
												return [h()]
											}
											if (value) {
												return [h()]
											}
											return [h()]
										})(),*/
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
											(this.valueAsString
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
										...(() => {
											let $node;
											let $slot = $scopedSlots['label'];
											if ($slot) {
												$node = $slot();
											} else {
												let {label} = this;
												if (label) {
													$node = label;
												} else {
													return [];
												}
											}
											let {validationState} = this;
											return [h(
												'div',
												[h(
													'VLabel',
													{
														props: {
															color: validationState,
															disabled,
															focused: !!validationState,
														},
													},
													$node,
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
												value: valueAsObject,
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
