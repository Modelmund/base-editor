import { v4 as uuidv4 } from 'uuid';
/**
 * 生成节点 ID
 */
export function generateNodeId() {
  return uuidv4();
}

/**
 * 序列化数据
 */
export function serializeData(data: any) {
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  return data;
}
