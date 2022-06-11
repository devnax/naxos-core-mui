import React from 'react';
import { Store } from 'state-range';
import Layer from '../../Layer';
import FinderView from '../views/FinderView';
import { FoundedData, FinderSettingProps } from '../types';
import Subscriber from '../handlers/Subscriber';
import CallbackStock from '../handlers/CallbackStock';

class NaxOSCoreFinderHandler extends Store {
    open(options?: FinderSettingProps) {
        if (options) {
            this.customSettings(options);
        }
        const settings = this.settings();
        Layer.open('__FINDER__', <FinderView />, {
            opacity: 0,
            stable: true,
            zIndex: 1600,
            onClickLayer: (e: any) => {
                const finderEle = document.getElementById('FINDER');
                if (finderEle && !finderEle.contains(e.target)) {
                    Layer.close();
                }
            },
            onOpen: settings.onLoad,
            onClose: () => {
                this.removeCustomSettings();
                if (settings.onClose) {
                    settings.onClose();
                }
            }
        });
    }

    close() {
        Layer.close();
    }

    settings(options?: FinderSettingProps): FinderSettingProps {
        if (options) {
            const old = this.getMeta('settings', {});
            this.setMeta('settings', { ...old, ...options });
        }
        return { ...this.getMeta('settings', {}), ...this.customSettings() };
    }

    currentPage(num?: number): number {
        if (num !== undefined) {
            this.setMeta('current_page', num);
        }
        return this.getMeta('current_page', 0);
    }

    customSettings(options?: FinderSettingProps): FinderSettingProps {
        if (options) {
            const findOnly = Subscriber.findFirst({ id: options.findOnly });
            const filterable = findOnly ? false : true;
            this.setMeta('custom_settings', { ...options, filterable });
        }
        return this.getMeta('custom_settings', {});
    }

    removeCustomSettings() {
        this.deleteMeta('custom_settings');
    }

    searchText(t?: string) {
        if (t !== undefined) {
            this.setMeta('search_text', t);
        }
        return this.getMeta('search_text');
    }

    setFoundedData(data: FoundedData[]) {
        this.setMeta('found_data', data);
    }

    getFoundedData(): FoundedData[] {
        return this.getMeta('found_data', []);
    }

    checkedAll(is?: boolean) {
        if (is !== undefined) {
            this.setMeta('all_checked', is);
        }
        return this.getMeta('all_checked', true);
    }

    startFinding() {
        const stext = this.searchText();
        if (!stext.trim()) {
            return;
        }
        const settings = this.settings();
        this.currentPage(this.currentPage() + 1);
        CallbackStock.deleteAll();
        let subscribers = Subscriber.find({ checked: true });
        const findOnly = Subscriber.findFirst({ id: settings.findOnly });
        if (findOnly) {
            subscribers = [findOnly];
        }
        for (let { id } of subscribers) {
            CallbackStock.add(this.searchText(), id);
        }
        CallbackStock.fetch();
    }
}

export default new NaxOSCoreFinderHandler();
