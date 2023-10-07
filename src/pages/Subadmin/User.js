import React, { useState } from 'react';
import { CKEditor } from 'ckeditor4-react';

function CmsHome() {
    const [events, setEvents] = useState([]);

    const logEvent = (evt) => {
        evt.timestamp = new Intl.DateTimeFormat('en', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date());

        setEvents(events => [evt, ...events]);
    }

    return (
        <div className="App">
            <h2>Using CKEditor 4 in React</h2>
            <CKEditor
                initData="This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React."
                config={{
                    toolbar: [
                        ['Source'],
                        ['Styles', 'Format', 'Font', 'FontSize'],
                        ['Bold', 'Italic'],
                        ['Undo', 'Redo'],
                        ['EasyImageUpload'],
                        ['About']
                    ],
                    extraPlugins: 'easyimage',
                    removePlugins: 'image',

                }}
                onFocus={logEvent}
                onBlur={logEvent}
                onChange={logEvent}
                onSelectionChange={logEvent}
            />

        </div>
    );
}

export default CmsHome;


