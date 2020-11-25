(function() {

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data: function() {
			return {
				//errorCount: {},
				//errorMessages: {},
				hint: null,
				//messages: {},
				//rules: {},
				//successMessages: {},
				//validateOnBlur: Boolean,
				appendIcon: 'mdi-minus',
				clearable: false,
				color: undefined,
				disabled: false,
				drawer: true,
				error: false,
				hideDetails: false,
				label: 'color',
				loading: false,
				noAlpha: false,
				persistentHint: false,
				prependIcon: 'mdi-plus',
				readonly: false,
				success: false,
				value: '#fff',
			};
		},
		computed: {
			dark: {
				get: function() {
					return this.$vuetify.theme.dark;
				},
				set: function(value) {
					this.$vuetify.theme.dark = value;
				},
			},
			rtl: {
				get: function() {
					return this.$vuetify.rtl;
				},
				set: function(value) {
					this.$vuetify.rtl = value;
				},
			},
		},
	});

})();
