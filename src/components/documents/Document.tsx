import React from 'react';
import { IDocument as DocumentModel } from '../../models/IDocument';
import { Paragraph } from './Paragraph';

export function Document(props: { document: DocumentModel }) {
  const { id, nodes } = props.document;
  return (
    <div id={id}>
      {nodes.map((paragraph, index) => (
        <Paragraph paragraph={paragraph} key={index} />
      ))}
    </div>
  );
}
