import { FileError } from "react-dropzone";
import { Row } from 'state-range'

export interface FileProps {
   file: File | null;
   progress: number;
   selected: boolean;
   uploading: boolean;
   error: FileError | false;
   name: string;
   size: number;
   url: string | null;
   date: string | null;
}

export type FileRowProps = Row<FileProps>