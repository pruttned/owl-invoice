import { repoService } from './repo-service';
export const repoResolver = {
    Mutation: {
        pullRepo(root: any, args: any): Promise<any> {
            return repoService.pull();
        }
    }
}