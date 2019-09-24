import { User } from './user';

export class Story {
    constructor(public postId, public content: string, public numLikes: number, public userEmail: User) {
    }
}
