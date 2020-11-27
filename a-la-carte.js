import VColorInput from './index';

import {
	VBtn,
	VCard,
	VCardActions,
	VColorPicker,
	VIcon,
	VInput,
	VLabel,
	VMenu,
	VSpacer,
} from 'vuetify/lib';

let {name} = VColorInput;

export default {
	name,
	components: {
		VBtn,
		VCard,
		VCardActions,
		VColorPicker,
		VIcon,
		VInput,
		VLabel,
		VMenu,
		VSpacer,
	},
	extends: VColorInput,
};
