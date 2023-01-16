## FileSystem
this is a file Handler. you can control all the files. like create, read, update, delete
```ts

import FileSystem from 'naxos-core/FileSystem'


```




## Uploader
this is a simple uploader wrapper with dropzone
```tsx
import Uploader, {UploaderProps} from 'naxos-code/FileSystem/Uploader'
<Uploader
   {...UploaderProps}
/>

```


## UploaderBox
this is a simple uploader with card design
```tsx
import UploaderBox, {UploaderBoxProps} from 'naxos-code/FileSystem/UploaderBox'
<UploaderBox
   {...UploaderBoxProps}
/>

```


## ProgressList
this will view all the panding upload files with progress
```tsx
import ProgressList, {ProgressListProps} from 'naxos-code/FileSystem/ProgressList'
<ProgressList
   {...ProgressListProps}
/>

```


## UploadingPanel
this will view all the panding upload files in a dropdown
```tsx
import UploadingPanel, {UploadingPanelProps} from 'naxos-code/FileSystem/UploadingPanel'
<UploadingPanel
   {...UploadingPanelProps}
/>

```

## FileGrid
this will show all the file with the bucketId
```tsx
import FileGrid, {FileGridProps} from 'naxos-code/FileSystem/FileGrid'
<FileGrid
   {...FileGridProps}
/>

```
