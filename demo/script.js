(function() {

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data: function() {
			return {
				clearable: false,
				disabled: false,
				drawer: true,
				label: 'color',
				loading: false,
				noAlpha: false,
				readonly: false,
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
