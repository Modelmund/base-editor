import React from 'react';
import {
  BoldOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
export function EditorToolbar() {
  return (
    <div id="editor-toolbar">
      <button>
        <UndoOutlined />
      </button>
      <button>
        <RedoOutlined />
      </button>
      <button>
        <BoldOutlined />
      </button>
      <button>
        <ItalicOutlined />
      </button>
      <button>
        <UnderlineOutlined />
      </button>
      <button>
        <StrikethroughOutlined />
      </button>
      <button>
        <FontColorsOutlined />
      </button>
      <button>
        <FontSizeOutlined />
      </button>
      <button>
        <OrderedListOutlined />
      </button>
      <button>
        <UnorderedListOutlined />
      </button>
    </div>
  );
}
