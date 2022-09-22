import Socket from '../../../Sockets/Socket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import IdSocket from '../../../Sockets/Typed/VariableSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class VariableChanged extends Node {
  constructor(name:string, public valueTypeName: string, socketFactory: (socketName:string) => Socket) {
    super(
      'State',
      name,
      [new IdSocket('variable')],
      [new FlowSocket(), socketFactory('value')],
      (context:NodeEvalContext) => {
        const variableId = context.readInput('variable');
        const variable = context.getVariable(variableId);
        if (this.valueTypeName !== variable.valueTypeName) {
          throw new Error(`type mismatch between VariableGet ${this.valueTypeName} and variable ${variable.valueTypeName}`);
        }

        const onValueChanged = () => {
          context.writeOutput('value', variable.get());
          context.commit('flow');
        };
        variable.onChanged.addListener(onValueChanged);

        context.onAsyncCancelled.addListener(() => {
          variable.onChanged.removeListener(onValueChanged);
        });
      },
    );

    this.async = true;
    this.interruptibleAsync = true;
    this.evaluateOnStartup = true;
  }
}
