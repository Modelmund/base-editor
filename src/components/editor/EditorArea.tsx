import React, { useState } from 'react';
import { IDocument as DocumentModel } from '../../models/IDocument';
import { Document } from '../documents/Document';

export function EditorArea(props: { data: any }) {
  // const document = DocumentModel.create(props.data);
  const [document, setDocument] = useState(DocumentModel.create(props.data));

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'Alt' ||
      event.key === 'Shift' ||
      event.key === 'Ctrl' ||
      event.key === 'Meta'
    ) {
      return;
    }
    event.preventDefault();
    if (event.key === 'Backspace') {
      deleteText(true);
    } else if (event.key === 'Delete') {
      deleteText(false);
    } else if (event.key === 'b' && event.metaKey) {
      toggleBold();
    } else {
      insertText(event);
    }
  };

  const insertText = (event: React.KeyboardEvent) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      return;
    }

    const range = sel.getRangeAt(0);
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const parentEl = startContainer.parentElement;
    const text = event.key;

    if (!range.collapsed) {
      return;
    }
    if (!parentEl) {
      return;
    }

    document.insertText(parentEl.id, startOffset, text);
    setDocument(DocumentModel.create(document));

    setTimeout(() => {
      range.setStart(startContainer, startOffset + text.length);
      range.setEnd(startContainer, startOffset + text.length);
      sel.addRange(range);
    });
  };

  const deleteText = (backward: boolean) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      return;
    }

    const range = sel.getRangeAt(0);
    const { startContainer, startOffset, collapsed } = range;
    const parentEl = startContainer.parentElement;
    if (!collapsed) {
      return;
    }
    if (!parentEl) {
      return;
    }
    // 对于现在的键盘来讲，实际情况是有Backspace键时按下后则会触发退格加删除两个操作，此时的Delete键的作用只对应删除这一个操作，因此Backspace键删除的都是光标之前的字符，Delete键删除的是光标之后的字符
    const start = backward ? startOffset - 1 : startOffset;
    if (start < 0) return;
    document.deleteText(parentEl.id, start, 1);
    setDocument(DocumentModel.create(document));

    setTimeout(() => {
      range.setStart(startContainer, start);
      range.setEnd(startContainer, start);
      sel.addRange(range);
    });
  };

  const toggleBold = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      return;
    }

    const range = sel.getRangeAt(0);
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const startParentEl = startContainer.parentElement;
    const endParentEl = endContainer.parentElement;

    if (range.collapsed) {
      return;
    }

    if (!startParentEl || !endParentEl) {
      return;
    }

    document.addInlineStyle(
      startParentEl.id,
      startOffset,
      endParentEl.id,
      endOffset,
      'fontWeight',
      'bold'
    );
    setDocument(DocumentModel.create(document));

    setTimeout(() => {
      range.setStart(endContainer, endOffset);
      range.setEnd(endContainer, endOffset);
      sel.addRange(range);
    });
  };

  return (
    <div
      className="editor-area"
      suppressContentEditableWarning={true}
      contentEditable="true"
      onKeyDown={onKeyDown}
    >
      <Document document={document} />
    </div>
  );
}
