import { Story } from './story';
import { User } from './user';

export class Comment {
    constructor(public commentId, public content: string, public numLikes: number, public story: Story, public user: User) {
    }
}
