import React from 'react';
import { EditorArea } from './EditorArea';
import { EditorToolbar } from './EditorToolbar';
import './editor.css';

export function Editor(props: { data: any }) {
  return (
    <div id="editor">
      <EditorToolbar />
      <EditorArea data={props.data} />
    </div>
  );
}
