import { Store } from 'state-range';
import { FileProps } from './types';


class OSFileManagerHandler extends Store<FileProps> {
    bucketId = "normal"

    constructor() {
        super();

        for (let i = 1; i < 20; i++) {
            let p: any = `https://mui.com/static/images/avatar/${i}.jpg`
            if (i > 7) {
                p = null
            }
            this.createFile({
                name: `long File name here. you can see what happen ${i}`,
                size: i * 20,
                url: p
            })
        }
    }

    createFile(props: Partial<FileProps>) {
        return this.insert({
            bucketId: this.bucketId,
            file: null,
            progress: 0,
            uploading: false,
            selected: false,
            error: null,
            name: '',
            size: 0,
            url: null,
            date: '',
            rejected: false,
            signal: null,
            ...props
        });
    }


    getFile(_id: string) {
        return this.findFirst({ _id })
    }


    getFiles(bucketId?: string) {
        return this.find({ bucketId: bucketId || this.bucketId, uploading: false })
    }

    getPandingFiles(bucketId?: string) {
        return this.find({ bucketId: bucketId || this.bucketId, uploading: true });
    }

    selectFile(_id: string) {
        this.update({ selected: true }, _id)
    }

    unSelectFile(_id: string) {
        this.update({ selected: false }, _id)
    }

    getSelectedFiles(bucketId?: string) {
        return this.find({ bucketId: bucketId || this.bucketId, selected: true })
    }

    deleteFile(_id: string) {
        this.delete(_id)
    }

    deleteAllFiles(bucketId?: string) {
        this.delete({ bucketId: bucketId || this.bucketId })
    }
}

export default new OSFileManagerHandler();
