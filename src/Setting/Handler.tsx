import React from 'react';
import { noDispatch, Store } from 'state-range';
import Layer from '../Layer';
import SettingCategoryView from './views/CategoryList';
import SingleView from './views/CategoryView';
import { SettingProps, SettingRowProps, PublicHandlerInterface, ConfigProps } from './types';

class NaxOSCoreSetting extends Store<SettingRowProps> {
    setConfig(conf: ConfigProps) {
        noDispatch(() => {
            this.setMeta('setting_configs', conf);
        });
    }

    getConfig(): ConfigProps {
        return this.getMeta('setting_configs', {});
    }

    open(configs?: ConfigProps) {
        const catList = this.getCategoryList();

        if (configs) {
            noDispatch(() => {
                this.setConfig(configs);
            });
        }

        if (catList.length && catList.length <= 1) {
            this.viewCategory(catList[0].category);
            return;
        }

        const { closeOnLayer, ...rest } = this.getConfig();

        Layer.open('__SETTING_CATEGORY__', <SettingCategoryView />, {
            closeButton: false,
            blur: 30,
            ...rest,
            onClickLayer: (e: any) => {
                if (closeOnLayer === undefined || closeOnLayer) {
                    const cats = Array.from(document.querySelectorAll('[data-category]'));
                    let isContain = false;
                    if (cats.length) {
                        for (let cat of cats) {
                            if (cat.contains(e.target)) {
                                isContain = true;
                                break;
                            }
                        }
                    }
                    if (!isContain) {
                        this.close();
                    }
                }

                if (rest.onClickLayer) {
                    rest.onClickLayer(e);
                }
            },
            onOpen: () => {
                const isOpen = this.getMeta('setting_opened', false);
                if (!isOpen) {
                    noDispatch(() => this.setMeta('setting_opened', true));
                    const settings = this.findAll();
                    for (let setting of settings) {
                        if (typeof setting?.onSettingOpen === 'function') {
                            setting.onSettingOpen();
                        }
                    }
                }
            },
            onClose: () => {
                if (!Layer.isOpened('__SETTING_VIEW__')) {
                    const settings = this.findAll();
                    for (let setting of settings) {
                        if (typeof setting?.onSettingClose === 'function') {
                            setting.onSettingClose();
                        }
                    }
                }
            }
        });
    }

    isSettingOpen() {
        return Layer.isOpened('__SETTING_CATEGORY__') || Layer.isOpened('__SETTING_VIEW__');
    }

    close() {
        Layer.close();
    }

    // create
    create(options: SettingProps) {
        const exists = this.get(options.id);
        if (!exists) {
            if (this.isSettingOpen()) {
                this.insert({
                    ...options,
                    preview: false
                });
            } else {
                noDispatch(() => {
                    this.insert({
                        ...options,
                        preview: false
                    });
                });
            }
        }
    }

    viewCategory(category: string) {
        const first = this.findFirst({ category });
        if (first) {
            this.preview(first.id);
        }
    }

    preview(id: string) {
        const item = this.get(id);
        noDispatch(() => {
            this.update({ preview: false }, { preview: true });
        });
        if (item) {
            this.update({ preview: true }, item._id);
            Layer.open('__SETTING_VIEW__', <SingleView />, {
                closeButton: false
            });
        }
    }

    getPreview() {
        return this.findFirst({ preview: true }) || {};
    }

    getCategorySettings() {
        const setting = this.findFirst({ preview: true });
        if (setting) {
            return this.find({ category: setting.category });
        }
        return [];
    }

    getCategoryList() {
        return this.find('@unique category');
    }

    get(id: string) {
        const setting = this.find({ id });
        if (setting.length) {
            return setting[0];
        }
    }

    remove(id: string) {
        this.delete({ id });
    }
}

const handler = new NaxOSCoreSetting();
export default handler;

export const publicHandler: PublicHandlerInterface = {
    setConfig: handler.setConfig.bind(handler),
    getConfig: handler.getConfig.bind(handler),
    create: handler.create.bind(handler),
    open: handler.open.bind(handler),
    close: handler.close.bind(handler),
    get: handler.get.bind(handler),
    preview: handler.preview.bind(handler),
    remove: handler.remove.bind(handler)
};
