import { GraphQLScalarType, Kind } from "graphql";
import Decimal from "decimal.js";

export const GraphQLDecimal = new GraphQLScalarType({
    name: 'Decimal',
    description: 'Decimal number',
    serialize(value: Decimal) {
        return value ? value.toString() : '0';
    },
    parseValue(value: any) {
        return value ? new Decimal(value) : 0;
    },
    parseLiteral(ast) {
        return ast.kind === Kind.STRING ||
            ast.kind === Kind.INT ||
            ast.kind === Kind.FLOAT
            ? ast.value : null;
    }
});