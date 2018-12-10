import { DocumentFsReader } from './document-fs-reader';
import { DocumentCollection } from './document-collection';

// export class FsDb {
//     constructor(private dbDir: string) {
//     }

//     getAll(query: IQuery) {

//     }
// }


async function run() {
    console.log('asd');
    let fsReader = new DocumentFsReader('./example/db1');
    let db = new DocumentCollection('invoice', fsReader);

    var res = await db.getAll({ id: '2018*' });

    console.log(res);
}

console.log('hello');

run()
    .then(() => { })
    .catch(err => console.error(err));