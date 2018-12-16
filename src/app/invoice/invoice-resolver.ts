export const resolver = {
    Query: {
        invoices(root: any, { id }: { id: string }, context: any) {
            // const results = id ? productMocks.filter(p => p.id == id) : productMocks
            // if (results.length > 0)
            //     return results
            // else
            //     throw new Error(`Product with id ${id} does not exist.`)
        }
    }
}