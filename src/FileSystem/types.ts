import { Row } from 'state-range';

export interface FileProps {
    bucketId: string;
    file: File | null;
    progress: number;
    selected: boolean;
    uploading: boolean;
    error: string | null;
    name: string;
    size: number;
    url: string | null;
    extention?: string | null;
    date: string | null;
    rejected: boolean;
    signal: AbortController | null;
}

export type FileItemProps = Row<FileProps>;