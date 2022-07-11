import * as React from 'react';
import { Store } from 'state-range';
import Layer from '../Layer';
import WidgetView from './views';
import { WidgetOption, WidgetStoreOption, WidgetStoreMeta } from './types';
import { LayerOptionProps } from '../Layer/types';

class Widget extends Store<WidgetStoreOption, WidgetStoreMeta> {
    create(opt: WidgetOption) {
        if (!this.findFirst(opt.id)) {
            this.insert(opt);
        } else {
            console.error(`${opt.id} id already exists`);
        }
    }

    remove(id: string) {
        this.delete({ id });
    }

    getWidgets() {
        const searchtext = this.getMeta('searchText');
        if (searchtext) {
            return this.find(`@where title like ${searchtext}`);
        }
        return this.findAll();
    }

    // OPEN DRAWER
    open(opt?: LayerOptionProps) {
        Layer.open('widget_drawer', <WidgetView />, opt);
    }
    close() {
        Layer.close('widget_drawer');
    }
}

export default new Widget();
