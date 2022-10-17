import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { In1Out1FuncNode } from '../../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../../Nodes/Templates/In2Out1FuncNode.js';
import { In3Out1FuncNode } from '../../../Nodes/Templates/In3Out1FuncNode.js';
import { ValueType } from '../../../Values/ValueType.js';
import { VecCreate } from '../Logic/VecCreate.js';
import { VecElements } from '../Logic/VecElements.js';
import {
  Vec2,
  vec2Add,
  vec2Dot,
  vec2FromArray,
  Vec2JSON,
  vec2Length,
  vec2Mix,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Scale,
  vec2Subtract,
  vec2ToArray
} from './Vec2.js';

export const Vec2Value = new ValueType(
  'vec2',
  () => new Vec2(),
  (value: string | Vec2JSON) =>
    typeof value === 'string' ? vec2Parse(value) : new Vec2(value.x, value.y),
  (value) => ({ x: value.x, y: value.y } as Vec2JSON)
);

export const Vec2Nodes: { [key: string]: NodeDescription } = {
  Constant: new NodeDescription(
    'math/vec2',
    'Logic',
    'Constant',
    (description, graph) =>
      new In1Out1FuncNode<Vec2, Vec2>(
        description,
        graph,
        'vec2',
        'vec2',
        (a) => a
      )
  ),

  Create: new NodeDescription(
    'math/create/vec2',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecCreate<Vec2>(
        description,
        graph,
        'vec2',
        ['x', 'y', 'z'],
        (elements: number[]) => vec2FromArray(elements)
      )
  ),
  Elements: new NodeDescription(
    'math/elements/vec2',
    'Logic',
    'CREATE',
    (description, graph) =>
      new VecElements<Vec2>(
        description,
        graph,
        'vec2',
        ['x', 'y', 'z'],
        vec2ToArray
      )
  ),

  Add: new NodeDescription(
    'math/add/vec2',
    'Logic',
    '+',
    (description, graph) =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        description,
        graph,
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Add(a, b)
      )
  ),
  Subtract: new NodeDescription(
    'math/subtract/vec2',
    'Logic',
    '-',
    (description, graph) =>
      new In2Out1FuncNode<Vec2, Vec2, Vec2>(
        description,
        graph,
        'vec2',
        'vec2',
        'vec2',
        (a, b) => vec2Subtract(a, b)
      )
  ),
  Negate: new NodeDescription(
    'math/negate/vec2',
    'Logic',
    '-',
    (description, graph) =>
      new In1Out1FuncNode<Vec2, Vec2>(description, graph, 'vec2', 'vec2', (a) =>
        vec2Negate(a)
      )
  ),

  Scale: new NodeDescription(
    'math/scale/vec2',
    'Logic',
    '×',
    (description, graph) =>
      new In2Out1FuncNode<Vec2, number, Vec2>(
        description,
        graph,
        'vec2',
        'float',
        'vec2',
        (a, b) => vec2Scale(a, b)
      )
  ),
  Length: new NodeDescription(
    'math/length/vec2',
    'Logic',
    'LENGTH',
    (description, graph) =>
      new In1Out1FuncNode<Vec2, number>(
        description,
        graph,
        'vec2',
        'float',
        (a) => vec2Length(a)
      )
  ),
  Normalize: new NodeDescription(
    'math/normalize/vec2',
    'Logic',
    'NORMALIZE',
    (description, graph) =>
      new In1Out1FuncNode<Vec2, Vec2>(description, graph, 'vec2', 'vec2', (a) =>
        vec2Normalize(a)
      )
  ),
  Dot: new NodeDescription(
    'math/dot/vec2',
    'Logic',
    'DOT',
    (description, graph) =>
      new In2Out1FuncNode<Vec2, Vec2, number>(
        description,
        graph,
        'vec2',
        'vec2',
        'float',
        (a, b) => vec2Dot(a, b)
      )
  ),

  Mix: new NodeDescription(
    'math/mix/vec2',
    'Logic',
    '÷',
    (description, graph) =>
      new In3Out1FuncNode<Vec2, Vec2, number, Vec2>(
        description,
        graph,
        'vec2',
        'vec2',
        'float',
        'vec2',
        (a, b, t) => vec2Mix(a, b, t),
        ['a', 'b', 't']
      )
  )
};
