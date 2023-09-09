import { INode } from './INode';
import { IParagraph } from './IParagraph';
import { generateNodeId } from '../utils/utils';
import { ISegment } from './ISegment';

export class IDocument extends INode {
  public static create(json: any) {
    const { id, nodes } = json;
    return new IDocument(id, nodes.map(IParagraph.create));
  }

  public nodes: IParagraph[];

  public insertText(id: string, offset: number, text: string) {
    const node = this.findNodeById(id);
    if (!node || !(node instanceof ISegment)) {
      return;
    }
    node.insertText(offset, text);
  }

  public deleteText(id: string, offset: number, length: number) {
    const node = this.findNodeById(id);
    if (!node || !(node instanceof ISegment)) {
      return;
    }
    node.deleteText(offset, length);
  }

  public addInlineStyle(
    startId: string,
    startOffset: number,
    endId: string,
    endOffset: number,
    styleKey: string,
    styleValue: string
  ) {}

  public findNodeById(id: string) {
    if (id === this.id) {
      return this;
    }
    for (const node of this.nodes) {
      if (node.id === id) {
        return node;
      }
      for (const segment of node.segments) {
        if (segment.id === id) {
          return segment;
        }
      }
    }
  }

  public findNodesByStartAndEndId(startId: string, endId: string) {
    const res = [];
    let foundStart = false;
    for (const node of this.nodes) {
      for (const segment of node.segments) {
        if (segment.id === startId) {
          res.push(segment);
          foundStart = true;
          continue;
        }
        if (segment.id === endId) {
          res.push(segment);
          return res;
        }
        // 添加起点和终点之间的 segments
        if (foundStart) {
          res.push(segment);
        }
      }
    }
  }

  constructor(id = generateNodeId(), nodes = []) {
    super(id, 'document');
    this.nodes = nodes;
  }
}
