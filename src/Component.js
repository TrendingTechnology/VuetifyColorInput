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
			return !!(this.valueAsString);
		},
		valueAsString() {

		},
		valueAsObject() {

		},
	},
	watch: {
		value(value) {
			this.lazyValue = value;
		},
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
