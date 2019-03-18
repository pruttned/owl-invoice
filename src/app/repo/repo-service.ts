import { db } from '../db';
import simplegit, { SimpleGit, PullResult as SimpleGitPullResult } from 'simple-git/promise';

class RepoService {
    private repo: SimpleGit | null = null;
    private isRepo = false;
    async pull(): Promise<PullResult | undefined> {
        await this.ensureRepo();
        if (this.isRepo) {
            var res = await this.repo!.pull();
            console.log(JSON.stringify(res, null, ' '));
            return {
                files: res.files,
                changes: res.summary.changes,
                insertions: res.summary.insertions,
                deletions: res.summary.deletions,
            };
        }
    }

    private async ensureRepo() {
        if (!this.repo) {
            this.repo = simplegit(db.dir);
            this.isRepo = await this.repo.checkIsRepo();
        }
    }
}

export interface PullResult {
    files: string[];
    changes: number;
    insertions: number;
    deletions: number;
}

export const repoService = new RepoService();