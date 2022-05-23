import { ReactElement } from 'react';
import { Store } from 'state-range';
import { DropdownArrayType } from './types';
import { PopperProps } from './types';

class NaxOSCoreDropdown extends Store {
    anchorAttrName = 'data-dropdown-opened';

    show(anchor: HTMLElement, content: ReactElement | DropdownArrayType[], props?: PopperProps) {
        this.delete({ active: false });
        const has: any = anchor.hasAttribute(this.anchorAttrName);
        if (has) {
            this.delete(has);
            anchor.removeAttribute(this.anchorAttrName);
        }

        const all = this.findAll();
        const parent: any = all.length ? all[all.length - 1] : false;
        const inserted: any = this.insert({
            anchor,
            content,
            props,
            active: true,
            parent: parent ? parent._id : false
        });
        anchor.setAttribute(this.anchorAttrName, inserted._id);
    }

    showContextMenu(event: MouseEvent, content: ReactElement | DropdownArrayType[], props?: PopperProps) {
        const ctxmenu = document.getElementById('ctx-menu');
        event.preventDefault();
        if (ctxmenu) {
            ctxmenu.style.left = `${event.pageX}px`;
            ctxmenu.style.top = `${event.pageY}px`;
            this.show(ctxmenu, content, {
                placement: 'right-start',
                ...props
            });
        }
    }

    isShow(): boolean {
        return this.findFirst({ active: true }) ? true : false;
    }

    hide() {
        this.update({ active: false }, { active: true });
        const Dropdowns = this.findAll();

        Dropdowns.forEach((Dropdown: any) => {
            Dropdown.anchor.removeAttribute(this.anchorAttrName);
        });
    }

    hideChild(parent: string) {
        this.update({ active: false }, { active: true, parent });
        const childs = this.find({ parent });
        childs.forEach((item: any) => {
            this.hideChild(item._id);
            item.anchor.removeAttribute(this.anchorAttrName);
        });
    }
}

const handler = new NaxOSCoreDropdown();

export default handler;

interface DropdownPublicHandlerTypes {
    show: (anchor: HTMLElement, content: ReactElement | DropdownArrayType[], props?: PopperProps) => void;
    showContextMenu: (event: MouseEvent, content: ReactElement | DropdownArrayType[], props?: PopperProps) => void;
    isShow: () => boolean;
    hide: () => void;
}

export const DropdownPublicHandler: DropdownPublicHandlerTypes = {
    showContextMenu: handler.showContextMenu.bind(handler),
    show: handler.show.bind(handler),
    isShow: handler.isShow.bind(handler),
    hide: handler.hide.bind(handler)
};
