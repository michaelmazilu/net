export interface LLMResponse {
  topicId: string;
  topicName: string;
  units: Unit[];
}

export interface Unit {
  unitId: number;
  unitName: string;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: number;
  lessonName: string;
  conversations: Conversation[];
}

export interface Conversation {
  messageId: number;
  text: string;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphLink {
  source: { x: number; y: number };
  target: { x: number; y: number };
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
