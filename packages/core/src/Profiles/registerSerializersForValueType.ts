import { makeInNOutFunctionDesc } from '../Nodes/FunctionNode.js';
import { toCamelCase } from '../toCamelCase.js';
import { ValueTypeMap } from '../Values/ValueTypeMap.js';

/** TODO: Verify
 * Creates a pair of conversions to and from string values
 * @param param0 
 * @returns 
 */
export function getStringConversionsForValueType({
  values,
  valueTypeName
}: {
  values: ValueTypeMap;
  valueTypeName: string;
}) {
  const camelCaseValueTypeName = toCamelCase(valueTypeName);
  return [
    makeInNOutFunctionDesc({
      name: `math/to${camelCaseValueTypeName}/string`,
      label: `To ${camelCaseValueTypeName}`,
      in: ['string'],
      out: valueTypeName,
      // When exec is executed, it will take the type provided at that point to then turn it into the value type desired
      exec: (a: string) => values[valueTypeName]?.deserialize(a)
    }),
    makeInNOutFunctionDesc({
      name: `math/toString/${valueTypeName}`,
      label: 'To String',
      in: [valueTypeName],
      out: 'string',
      exec: (a: any) => `${values[valueTypeName]?.serialize(a)}`
    })
  ];
}
