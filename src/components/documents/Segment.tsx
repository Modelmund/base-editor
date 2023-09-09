import React from 'react';
import { ISegment as SegmentModel } from '../../models/ISegment';

export function Segment(props: { segment: SegmentModel }) {
  const { id, style, text = '&nbsp;' } = props.segment;
  return (
    <span id={id} style={style}>
      {text}
    </span>
  );
}
