import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { FileItemProps } from '../types'
import { withStore } from 'state-range';
import Dropdown from '../../Dropdown';
import Handler from '../FileSystem';
import { FileGridProps } from './'

interface Props extends FileGridProps {
    file: FileItemProps
}

const GridItem = ({ file, ...props }: Props) => {
    const { onClick, onContextMenu, fileWidth, fileHeight, fileNameLength } = props
    const { _id, name, selected } = file
    const theme = useTheme();
    const ext = file.url?.split('.').pop() || "doc"
    const nameLength = fileNameLength || 15
    const defIconStyle: any = defaultStyles
    const width = fileWidth || 150
    const height = fileHeight || 160

    const previewExtentions = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "webp"]
    let preview = null
    if (file.url && previewExtentions.includes(ext)) {
        preview = file.url
    }

    return (
        <Stack
            spacing={1}
            justifyContent="center"
            py={1}
            bgcolor={selected ? alpha(theme.palette.primary.main, 0.1) : 'background.paper'}
            border={1}
            borderColor={selected ? 'primary.main' : 'background.paper'}
            color={selected ? '#fff' : ''}
            borderRadius={2}
            width={width}
            height={height}
            m={0.5}
            sx={{
                cursor: 'pointer',
                userSelect: "none",
                '&:hover': {
                    bgcolor: selected ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.background.paper, 0.6)
                }
            }}
            onClick={() => {
                const _file: FileItemProps = Handler.getFile(_id) as any
                onClick && onClick(_file)
            }}

            onContextMenu={(e: any) => {
                if (onContextMenu) {
                    e.preventDefault()
                    const _file: FileItemProps = Handler.getFile(_id) as any
                    Dropdown.showContextMenu(e, onContextMenu(_file))
                    return false
                }
            }}
        >
            <Stack height={height - 60} justifyContent="center" alignItems="center" >
                <Stack height={preview ? (width / 2) : width / 2} justifyContent="center" alignItems="center">
                    {
                        preview ? <img width={height - 100} src={preview} alt={file.name} /> : <FileIcon extension={ext} {...defIconStyle[ext] || {}} />
                    }
                </Stack>
            </Stack>
            <Stack spacing={0.3} alignItems="center" height={30} >
                <Typography variant="body1" fontSize={15}>
                    {name.substring(0, nameLength) + (nameLength < name.length ? ".." : "")}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default withStore(GridItem, ({ file }: Props) => {
    return [file.observe]
})
