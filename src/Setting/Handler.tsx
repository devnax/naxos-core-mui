import React from 'react';
import { noDispatch, Store } from 'state-range';
import Layer from '../Layer';
import SettingCategoryView from './views/CategoryList';
import SingleView from './views/CategoryView';
import { SettingProps, PublicHandlerInterface, ConfigProps } from './types';

class Setting extends Store {
    setConfig(conf: ConfigProps) {
        noDispatch(() => {
            this.setMeta('setting_configs', conf);
        });
    }

    getConfig(): ConfigProps {
        return this.getMeta('setting_configs', {});
    }

    open() {
        const catList = this.getCategoryList();
        if (catList.length <= 1) {
            this.viewCategory(catList[0].category);
            return;
        }

        const { blur, blurImage, blurGradient, opacity } = this.getConfig();

        Layer.open('__SETTING_CATEGORY__', <SettingCategoryView />, {
            closeButton: true,
            opacity,
            blur,
            blurGradient,
            blurImage,
            onOpen: () => {
                const isOpen = this.getMeta('setting_opened', false);
                if (!isOpen) {
                    noDispatch(() => this.setMeta('setting_opened', true));
                    const settings = this.find();
                    for (let setting of settings) {
                        if (typeof setting?.onSettingOpen === 'function') {
                            setting.onSettingOpen();
                        }
                    }
                }
            },
            onClose: () => {
                if (!Layer.isOpened('__SETTING_VIEW__')) {
                    const settings = this.find();
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
            const existsCategory = this.findFirst({ category: options.category });
            if (this.isSettingOpen()) {
                this.insert({
                    ...options,
                    // private props
                    uniqueCatName: existsCategory ? false : true,
                    preview: false
                });
            } else {
                noDispatch(() => {
                    this.insert({
                        ...options,
                        // private props
                        uniqueCatName: existsCategory ? false : true,
                        preview: false
                    });
                });
            }
        }
    }

    viewCategory(category: string) {
        const first = this.findFirst({ category });
        noDispatch(() => {
            this.update({ active: false }, { active: true });
            this.update({ preview: false }, { preview: true });
        });

        this.update({ active: true, preview: true }, first._id);
        Layer.open('__SETTING_VIEW__', <SingleView />, {
            closeButton: false
        });
    }

    preview() {
        return this.findFirst({ preview: true }) || {};
    }

    getCategorySettings() {
        const { category } = this.findFirst({ active: true });
        return this.find({ category });
    }

    getCategoryList() {
        return this.find({ uniqueCatName: true });
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

const handler = new Setting();
export default handler;

export const publicHandler: PublicHandlerInterface = {
    setConfig: handler.setConfig.bind(handler),
    getConfig: handler.getConfig.bind(handler),
    create: handler.create.bind(handler),
    open: handler.open.bind(handler),
    close: handler.close.bind(handler),
    get: handler.get.bind(handler),
    remove: handler.remove.bind(handler)
};
