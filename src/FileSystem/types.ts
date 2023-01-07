import { Row } from 'state-range';
import { DropdownArrayType } from '../Dropdown/types';

export type BucketId = string

export interface FileProps {
    bucketId: BucketId;
    file: File | null;
    progress: number;
    selected: boolean;
    uploading: boolean;
    error: string | null;
    name: string;
    size: number;
    url: string | null;
    date: string | null;
    rejected: boolean;
    signal: AbortController | null;
}

export type FileRowProps = Row<FileProps>;



export interface FileGridProps {
    bucketId?: BucketId;
    onContextMenu?: (file: FileRowProps) => DropdownArrayType[];
    onClick?: (file: FileRowProps) => void;
    fileWidth?: number;
    fileHeight?: number;
    fileNameLength?: number;
}
