// import codeMirror from 'codemirror'
// import "codemirror/lib/codemirror.css"
// import "codemirror/theme/eclipse.css"
// import "codemirror/mode/htmlmixed/htmlmixed.js"

const configs = {
    // codeMirror,
    charCounter: true,
    stickyToolbar: true,
    lineHeights: [
        { text: '1', value: 1 },
        { text: '1.15', value: 1.15 },
        { text: '1.5', value: 1.5 },
        { text: '2', value: 2 }
    ],

    placeholder: 'Write something...',
    defaultTag: 'p',

    font: ['Roboto', 'Arial', 'tahoma', 'Courier New,Courier'],
    fontSize: [10, 14, 16, 18, 24, 36, 48, 52, 60, 72],
    formats: ['p', 'blockquote', 'h1', 'h2', 'h3'],
    colorList: [
        ['#bf2d93', '#ff5e00', '#ffe400', '#abf200'],
        ['#00d8ff', '#0055ff', '#6600ff', '#ff00dd']
    ],
    videoFileInput: true,
    tabDisable: false,
    buttonList: [
        [
            'undo',
            'redo',
            'font',
            'fontSize',
            'formatBlock',
            'paragraphStyle',
            'blockquote',
            'bold',
            'underline',
            'italic',
            'strike',
            'subscript',
            'superscript',
            'fontColor',
            'hiliteColor',
            'textStyle',
            'removeFormat',
            'outdent',
            'indent',
            'align',
            'horizontalRule',
            'list',
            'lineHeight',
            'table',
            'link',
            'image',
            'video',
            'audio',
            'fullScreen',
            'showBlocks',
            'codeView'
        ]
    ]
};

export default configs;
