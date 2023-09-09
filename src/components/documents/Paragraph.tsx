import React from 'react';
import { IParagraph as ParagraphModel } from '../../models/IParagraph';
import { Segment } from './Segment';
export function Paragraph(props: { paragraph: ParagraphModel }) {
  const { id, style, segments } = props.paragraph;
  return (
    <div id={id} style={style}>
      {segments.map((segment, index) => (
        <Segment segment={segment} key={index} />
      ))}
    </div>
  );
}
