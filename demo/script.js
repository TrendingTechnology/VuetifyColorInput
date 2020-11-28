(function() {

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data: function() {
			return {
				appendIcon: undefined,
				backgroundColor: undefined,
				clearable: false,
				color: undefined,
				dense: false,
				disabled: false,
				drawer: true,
				error: false,
				errorCount: {},
				errorMessages: {},
				hideDetails: false,
				hint: null,
				label: 'color',
				messages: {},
				noAlpha: false,
				persistentHint: false,
				prependIcon: undefined,
				rules: {},
				success: false,
				successMessages: {},
				validateOnBlur: false,
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
