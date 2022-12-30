import { Row } from 'state-range';

export interface FileProps {
    typeid: string;
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
