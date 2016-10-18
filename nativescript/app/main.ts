// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { registerElement } from 'nativescript-angular/element-registry';

import { CardView } from 'nativescript-cardview';

import { AppModule } from './app.module';

// register nativescript plugins to use them with angular.
registerElement('CardView', () => CardView);
registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab);

platformNativeScriptDynamic().bootstrapModule(AppModule);
